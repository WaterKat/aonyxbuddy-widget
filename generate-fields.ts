import { existsSync, mkdirSync, writeFileSync } from "node:fs";

import { configuration } from "./src/fields.js";
import { join } from "node:path";

const outDir = "out";
const outFile = "fields.json";

const fullOutDir = join(import.meta.url, outDir);
if (!existsSync(fullOutDir)) {
  mkdirSync(outDir);
}

const fullOutPath = join(outDir, outFile);
writeFileSync(fullOutPath, JSON.stringify(configuration, null, 2));
