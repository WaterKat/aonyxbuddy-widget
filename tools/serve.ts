import express from "express";
import { join } from "node:path";

const localTestingDir = "tools/testing";
const outputDir = "dist";

const app = express();
const port = 3000;

app.use(express.static(join(process.cwd(), localTestingDir)));

const fileMap = {
  "se-index.html": "html.txt",
  "se-styles.css": "css.txt",
  "se-index.js": "js.txt",
  "se-fields.json": "fields.txt",
};

app.use((req, res, next) => {
  const file = req.url.split("/").pop();
  if (fileMap[file]) {
    res.redirect(301, `/${fileMap[file]}`);
    return;
  }
  next();
});
app.use(express.static(join(process.cwd(), outputDir)));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
