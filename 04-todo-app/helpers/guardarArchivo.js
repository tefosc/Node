import { writeFileSync } from "node:fs";
const fs = writeFileSync;
export const guardarDB = (data) => {
  const archivo = "./db/data.json";
  writeFileSync(archivo, JSON.stringify(data));
};
