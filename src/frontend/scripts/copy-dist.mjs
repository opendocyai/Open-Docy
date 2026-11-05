import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.resolve(__dirname, "..");

// docyai-model/lib/docyai-model
//
// This copies the **built library directory**, not dist:
// dist is the raw build:lib output; with rete externalized it is incomplete on its own
// — no rete.js (external leaves only the `./rete.js` reference),
// and dist/rete.d.ts points to `../lib/docyai-model/rete-entry.d.ts` (outside dist).
// lib/docyai-model is the merged dist + dist-rete output and the real public copy.
const source = path.resolve(projectRoot, "lib/docyai-model");

// ../docy-web/lib/docyai-model
const target = path.resolve(
  projectRoot,
  "../docy-web/lib/docyai-model",
);

console.log("📦 source:", source);
console.log("📁 target:", target);

if (!fs.existsSync(source)) {
  console.error(
    "❌ lib/docyai-model does not exist. Run build:lib:local first\n" +
      "   (Expected in a checkout without the canvas sources: build it where src/rete-entry.ts exists and bring it over)",
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

// Copy the built library
fs.cpSync(source, target, {
  recursive: true,
});

console.log("✅ Library copy complete");