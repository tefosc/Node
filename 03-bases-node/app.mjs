import { createFile } from "./helpers/multiply.mjs";
import { argv } from "./config/yargs.mjs";

console.clear();

createFile(argv.b, argv.l)
  .then((fileName) => console.log(fileName, "creado"))
  .catch((err) => console.log(err));

// const [, , baseConsola = 5] = process.argv;
// const base = baseConsola.split("=")[1];
