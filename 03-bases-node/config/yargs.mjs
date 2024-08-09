import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const argv = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Es la base de la tabla de multiplicar",
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    default: false,
    describe: "Muestra la tabla en consola",
  })
  .check((argv, options) => {
    if (isNaN(argv.base)) {
      throw "La base tiene que ser un número";
    }
    return true;
  }).argv;
