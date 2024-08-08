// const fs = require("node:fs");
import { writeFileSync } from "node:fs";

export const createFile = async (base = 5) => {
  try {
    console.log("======================");
    console.log("Tabla del: ", base);
    console.log("======================");

    let data = "";

    for (let i = 1; i <= 12; i++) {
      data += `\n ${base} x ${i} = ${base * i} `;
    }

    console.log(data);

    writeFileSync(`tabla-${base}.txt`, data);

    return `tabla-${base}.txt`;
  } catch (e) {
    throw e;
  }
};

// module.exports = {
//   createFile,
// };
