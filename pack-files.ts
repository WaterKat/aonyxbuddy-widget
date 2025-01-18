import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const files = {
  html: "public/index.html",
  css: "public/styles.css",
  js: "out/index.js",
  fields: "out/fields.json",
} as const;

const outDir = "dist";

const dir = join(__dirname, outDir);
if (!existsSync(dir)) {
  mkdirSync(dir);
}

for (const key of Object.keys(files)) {
  const file = join(__dirname, files[key]);
  if (existsSync(file))
    copyFileSync(file, join(__dirname, outDir, `${key}.txt`));
}
