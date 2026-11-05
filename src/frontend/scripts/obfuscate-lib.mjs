import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

// OBFUSCATE=0 -> skip (for debugging/troubleshooting)
// OBFUSCATE_PRESET=low|medium, default low
// OBFUSCATE_MAX_KB: skip chunks larger than this (default 300).
//   javascript-obfuscator is superlinear on large files (~0.2s for 40KB, 100s+ for 1MB),
//   large chunks are already minified to single-letter identifiers by rolldown; skipping only drops the string-encryption layer.
//   Pass directory args to override default targets, for verification only: node scripts/obfuscate-lib.mjs /tmp/obf-test
const enabled = process.env.OBFUSCATE !== "0";
const preset = process.env.OBFUSCATE_PRESET ?? "low";
const maxKb = Number(process.env.OBFUSCATE_MAX_KB ?? 300);

// Third-party minified bundles carry no proprietary IP; skip them to save time (dayjs.min / RTFJS.bundle etc).
// For full obfuscation: OBFUSCATE_VENDOR=1
const includeVendor = process.env.OBFUSCATE_VENDOR === "1";
const skipPatterns = includeVendor
  ? []
  : [/\.min\.js$/, /\.bundle\.js$/, /rolldown-runtime.*\.js$/];

const targets =
  process.argv.slice(2).filter((a) => !a.startsWith("-")).map((d) => path.resolve(d)).length > 0
    ? process.argv.slice(2).filter((a) => !a.startsWith("-")).map((d) => path.resolve(d))
    : [path.resolve(projectRoot, "dist"), path.resolve(projectRoot, "dist-rete")];

/**
 * Low preset: only string extraction + hexadecimal identifiers; never touch cross-chunk export names,
 * never touch object keys (Vue props / API field names must stay), no self-defense/anti-debug
 *(enabling it crashes the host bundle and makes stacks untraceable).
 */
const baseOptions = {
  compact: true,
  debugProtection: false,
  disableConsoleOutput: false,
  identifierNamesGenerator: "hexadecimal",
  renameGlobals: false,
  selfDefending: false,
  simplify: true,
  splitStrings: false,
  stringArray: true,
  stringArrayCallsTransform: false,
  stringArrayEncoding: ["base64"],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayThreshold: 0.5,
  transformObjectKeys: false,
  unicodeEscapeSequence: false,
};

const presetOptions =
  preset === "medium"
    ? {
        ...baseOptions,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.5,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.2,
        stringArrayThreshold: 0.75,
      }
    : {
        ...baseOptions,
        controlFlowFlattening: false,
        deadCodeInjection: false,
      };

function collectJsFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...collectJsFiles(full));
    } else if (entry.name.endsWith(".js")) {
      if (skipPatterns.some((re) => re.test(entry.name))) continue;
      out.push(full);
    }
  }
  return out;
}

async function main() {
  if (process.argv.includes("--help") || process.argv.includes("-h")) {
    console.log("Usage: node scripts/obfuscate-lib.mjs [dir...]");
    console.log("Env vars: OBFUSCATE=0 skips | OBFUSCATE_PRESET=low|medium (default low) | OBFUSCATE_MAX_KB=300 oversize skip threshold | OBFUSCATE_VENDOR=1 also obfuscate third-party/vendor");
    return;
  }

  const { default: JavaScriptObfuscator } = await import("javascript-obfuscator");

  if (!enabled) {
    console.log("🔓 OBFUSCATE=0, skipping obfuscation");
    return;
  }

  const files = targets.flatMap((dir) => {
    if (!fs.existsSync(dir)) {
      console.warn(`⚠️  Directory does not exist, skipping: ${dir}`);
      return [];
    }
    return collectJsFiles(dir);
  });

  if (files.length === 0) {
    console.error("❌ No obfuscatable JS found, run vite build first");
    process.exit(1);
  }

  console.log(`🔒 Obfuscation preset: ${preset}, files: ${files.length} (skip >${maxKb}KB)`);
  const started = Date.now();
  const concurrency = Math.max(2, Math.min(8, os.cpus().length - 1));
  let done = 0;
  let failed = 0;
  let skipped = 0;
  let obfuscated = 0;

  for (let i = 0; i < files.length; i += concurrency) {
    const batch = files.slice(i, i + concurrency);
    await Promise.all(
      batch.map(async (file) => {
        try {
          const stat = fs.statSync(file);
          if (stat.size > maxKb * 1024) {
            skipped += 1;
            console.log(`⏭️  Skipping oversized file (${(stat.size / 1024).toFixed(0)}KB): ${path.relative(projectRoot, file)}`);
            return;
          }
          const code = fs.readFileSync(file, "utf8");
          const result = JavaScriptObfuscator.obfuscate(code, {
            ...presetOptions,
            sourceMap: false,
          });
          fs.writeFileSync(file, result.getObfuscatedCode(), "utf8");
          obfuscated += 1;
        } catch (err) {
          failed += 1;
          console.error(`❌ Obfuscation failed ${path.relative(projectRoot, file)}: ${err.message}`);
        } finally {
          done += 1;
          if (done % 50 === 0 || done === files.length) {
            console.log(`   Progress ${done}/${files.length}`);
          }
        }
      }),
    );
  }

  console.log(`✅ Obfuscation complete: ${obfuscated} succeeded, ${failed} failed, ${skipped} oversized skipped, took ${((Date.now() - started) / 1000).toFixed(1)}s`);
  if (failed > 0) process.exit(1);
}

main();
