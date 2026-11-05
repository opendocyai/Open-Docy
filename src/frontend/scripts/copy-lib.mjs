import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");

// docyai-model/dist
const source = path.resolve(projectRoot, "dist");

// docyai-model/lib/docyai-model
// This directory is committed to git for direct import from src/pages etc (see the
// "@docyai" alias in vite.config.ts). Re-run this script after changing rete sources in src.
const target = path.resolve(projectRoot, "lib/docyai-model");

console.log("📦 source:", source);
console.log("📁 target:", target);

if (!fs.existsSync(source)) {
  console.error("❌ dist does not exist, run build:lib first");

  process.exit(1);
}

// Slim rete entry (dist-rete/rete.js) → lib/docyai-model/rete.js,
// referenced via the "@docyai/rete" alias. Skip its own style-rete.css:
// rete component styles already live in the main page style.css.
//
// This check must run before deleting the directory: a checkout without the canvas sources has no
// src/rete-entry.ts, so dist-rete cannot be built. Deleting first would remove the committed rete.js.
const reteSource = path.resolve(projectRoot, "dist-rete");

if (!fs.existsSync(path.resolve(reteSource, "rete.js"))) {
  console.error(
    "❌ dist-rete/rete.js does not exist.\n" +
      "   This checkout has no canvas sources, so the committed rete.js cannot be rebuilt.\n" +
      "   Run pnpm build:lib:local where src/rete-entry.ts exists, then bring lib/docyai-model over.",
  );

  process.exit(1);
}

// Delete the old copy
if (fs.existsSync(target)) {
  fs.rmSync(target, {
    recursive: true,
    force: true,
  });
}

// Create directory
fs.mkdirSync(target, {
  recursive: true,
});

// Copy dist
fs.cpSync(source, target, {
  recursive: true,
});

for (const entry of fs.readdirSync(reteSource, { withFileTypes: true })) {
  if (entry.name === "style-rete.css") continue;

  fs.cpSync(
    path.resolve(reteSource, entry.name),
    path.resolve(target, entry.name),
    { recursive: true },
  );
}

// Ship licensing material alongside the bundle so redistributed copies keep it.
for (const name of ["LICENSE", "THIRD_PARTY_NOTICES.md"]) {
  const file = path.resolve(projectRoot, name);

  if (fs.existsSync(file)) {
    fs.cpSync(file, path.resolve(target, name));
  }
}

const thirdPartyDir = path.resolve(projectRoot, "third-party");

if (fs.existsSync(thirdPartyDir)) {
  fs.cpSync(thirdPartyDir, path.resolve(target, "third-party"), {
    recursive: true,
  });
}

// vite-plugin-dts scans with entryRoot: "src" and generates a 0-byte main.d.ts for the
// non-lib entry src/main.ts; empty .scss files also produce empty chunks. These empty
// files get copied into the snapshot by cpSync, then tracked by git and synced to the
// public branch -- a three-way merge never deletes them: base absent / ours present /
// theirs absent -> git treats them as "ours added, theirs untouched" and keeps them.
// So clean them up at the source to keep empty artifacts out of the snapshot.
const removeEmptyFiles = (dir) => {
  let removed = 0;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.resolve(dir, entry.name);

    if (entry.isDirectory()) {
      removed += removeEmptyFiles(entryPath);
    } else if (fs.statSync(entryPath).size === 0) {
      fs.rmSync(entryPath);
      removed++;
      console.log("  🗑  empty artifact:", path.relative(projectRoot, entryPath));
    }
  }

  return removed;
};

const emptyCount = removeEmptyFiles(target);

if (emptyCount > 0) {
  console.log(`  removed ${emptyCount} 0-byte artifacts`);
}

console.log("✅ dist copy complete →", target);
