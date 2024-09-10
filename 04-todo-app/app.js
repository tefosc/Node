import { inquirerMenu, pausa } from "./helpers/inquirer.js";
import colors from "colors";
//const { mostrarMenu, saludo, pausa } = require("./helpers/mensajes");

const main = async () => {
  let opcion = "";
  do {
    opcion = await inquirerMenu();
    console.log({ opcion });

    await pausa();
  } while (opcion !== "0");
};

main();
