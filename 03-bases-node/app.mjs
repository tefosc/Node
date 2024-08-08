// const { createFile } = require("./helpers/multiply");

import { createFile } from "./helpers/multiply.mjs";

console.clear();

const [, , baseConsola = 5] = process.argv;

const base = baseConsola.split("=")[1];
console.log(base);

createFile(base)
  .then((fileName) => console.log(fileName, "creado"))
  .catch((err) => console.log(err));
