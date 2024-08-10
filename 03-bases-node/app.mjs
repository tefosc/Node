import { createFile } from "./helpers/multiply.mjs";
import { argv } from "./config/yargs.mjs";
import colors from "colors";
console.clear();

colors.setTheme({
  explain: "brightCyan",
  error: "brightRed",
  signo: "brightMagenta",
  base: "brightYellow",
  data: "cyan",
  textEnd: "brightGreen",
});

createFile(argv.b, argv.l, argv.h)
  .then((fileName) => console.log(colors.textEnd(fileName, "creado")))
  .catch((err) => console.log(colors.explain(err)));

// const [, , baseConsola = 5] = process.argv;
// const base = baseConsola.split("=")[1];
