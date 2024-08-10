import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import colors from "colors";

colors.setTheme({
  explain: "brightCyan",
  error: "brightRed",
  signo: "brightMagenta",
  base: "brightYellow",
  data: "cyan",
  textEnd: "brightGreen",
});

export const argv = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: colors.explain("Es la base de la tabla de multiplicar"),
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    default: false,
    describe: colors.explain("Muestra la tabla en consola"),
  })
  .option("h", {
    alias: "hasta",
    type: "number",
    default: 10,
    describe: colors.explain("Hasta que número se multiplicará la base"),
  })
  .check((argv, options) => {
    if (isNaN(argv.base)) {
      throw colors.error("La base tiene que ser un número");
    }
    return true;
  }).argv;
