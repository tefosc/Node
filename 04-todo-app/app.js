import colors from "colors";
import { inquirerMenu, pausa, leerInput } from "./helpers/inquirer.js";
import { Tareas } from "./models/tareas.js";
import { guardarDB } from "./helpers/guardarArchivo.js";

const main = async () => {
  let opcion = "";
  const tareas = new Tareas();

  do {
    opcion = await inquirerMenu();

    switch (opcion) {
      case "1":
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        console.log(tareas.listadoArr);
        break;
    }
    // guardarDB(tareas.listadoArr);

    await pausa();
  } while (opcion !== "0");
};

main();
