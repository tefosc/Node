import { writeFileSync } from "node:fs";
import colors from "colors";

colors.setTheme({
  explain: "brightCyan",
  error: "brightRed",
  signo: "brightMagenta",
  rainbow: "rainbow",
  base: "brightYellow",
  data: "cyan",
  textEnd: "brightGreen",
});

export const createFile = async (base = 5, listar = false, limite = 10) => {
  try {
    let data = "";
    let consola = "";

    for (let i = 1; i <= limite; i++) {
      data += `\n ${base} x ${i} = ${base * i} `;
      consola += `\n ${base} ${colors.signo("x ")}${i} ${"=".signo} ${
        base * i
      } `;
    }

    if (listar) {
      console.log(colors.rainbow("======================"));
      console.log(colors.explain("Tabla del: "), colors.base(base));
      console.log(colors.rainbow("======================"));
      console.log(colors.data(consola));
    }

    writeFileSync(`./salida/tabla-${base}.txt`, data);

    return `tabla-${base}.txt`;
  } catch (e) {
    throw colors.error(e);
  }
};
