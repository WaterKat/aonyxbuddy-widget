import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const files = {
  html: "public/index.html",
  css: "public/styles.css",
  js: "out/index.js",
  fields: "out/fields.json",
} as const;

const outDir = "dist";

const fullRootDir = process.cwd();
const fullOutDir = join(fullRootDir, outDir);
if (!existsSync(fullOutDir)) {
  mkdirSync(fullOutDir);
}

for (const key of Object.keys(files)) {
  const file = join(fullRootDir, files[key]);
  if (existsSync(file)) copyFileSync(file, join(fullOutDir, `${key}.txt`));
}
