import { existsSync, mkdirSync, writeFileSync } from "node:fs";

import { configuration } from "../src/streamelements.js";
import { join } from "node:path";

const outDir = "out";
const outFile = "fields.json";

const rootDir = process.cwd();
const fullOutDir = join(rootDir, outDir);
if (!existsSync(fullOutDir)) {
  mkdirSync(fullOutDir);
}

const fullOutPath = join(fullOutDir, outFile);
writeFileSync(fullOutPath, JSON.stringify(configuration, null, 2));
