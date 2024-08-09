import { createFile } from "./helpers/multiply.mjs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    default: false,
  })
  .check((argv, options) => {
    if (isNaN(argv.base)) {
      throw "La base tiene que ser un número";
    }
    return true;
  }).argv;

console.clear();

console.log(argv);

createFile(argv.b, argv.l)
  .then((fileName) => console.log(fileName, "creado"))
  .catch((err) => console.log(err));

// const [, , baseConsola = 5] = process.argv;
// const base = baseConsola.split("=")[1];
