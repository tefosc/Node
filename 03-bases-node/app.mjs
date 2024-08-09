// const { createFile } = require("./helpers/multiply");

import { createFile } from "./helpers/multiply.mjs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;

console.clear();

console.log(process.argv);
console.log(argv);

console.log("base: yargs", argv.base);

// const [, , baseConsola = 5] = process.argv;
// const base = baseConsola.split("=")[1];

// createFile(base)
//   .then((fileName) => console.log(fileName, "creado"))
//   .catch((err) => console.log(err));
