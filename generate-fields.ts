import { existsSync, mkdirSync, writeFileSync } from "node:fs";

import { configuration } from "./src/fields.js";
import { join } from "node:path";

const outDir = "out";
const outFile = "fields.json";

const fullOutDir = join(import.meta.dirname, outDir);
if (!existsSync(fullOutDir)) {
  mkdirSync(fullOutDir);
}

const fullOutPath = join(fullOutDir, outFile);
writeFileSync(fullOutPath, JSON.stringify(configuration, null, 2));
