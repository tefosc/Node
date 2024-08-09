import { writeFileSync } from "node:fs";

export const createFile = async (base = 5, listar = false) => {
  try {
    let data = "";

    for (let i = 1; i <= 12; i++) {
      data += `\n ${base} x ${i} = ${base * i} `;
    }

    if (listar) {
      console.log("======================");
      console.log("Tabla del: ", base);
      console.log("======================");
      console.log(data);
    }

    writeFileSync(`tabla-${base}.txt`, data);

    return `tabla-${base}.txt`;
  } catch (e) {
    throw e;
  }
};
