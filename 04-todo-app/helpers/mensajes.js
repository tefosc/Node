require("colors");

const mostrarMenu = async () => {
  return new Promise((resolve, reject) => {
    console.clear();
    console.log("============================".green);
    console.log("   Seleccione una opción".green);
    console.log("============================\n".green);

    console.log(`${"1.".green} Crear Tarea`);
    console.log(`${"2.".green} Listar Tareas`);
    console.log(`${"3.".green} Listar Tareas Completadas`);
    console.log(`${"4.".green} Listar Tareas Pendientes`);
    console.log(`${"5.".green} Completar Tarea(s)`);
    console.log(`${"6.".green} Borrar Tarea`);
    console.log(`${"0.".brightRed} Salir\n`);

    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question("Seleccione una opción: ", (opcion) => {
      readLine.close();
      resolve(opcion);
    });
  });
};

const pausa = () => {
  return new Promise((resolve) => {
    const readLine = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readLine.question(`\nPresione ${"ENTER".green} para continuar\n`, () => {
      readLine.close();
      resolve();
    });
  });
};

// Ejemplo saludo con node y process (stdin, stdout)
// const saludo = () => {
//   process.stdin.on("data", (data) => {
//     const nombre1 = data.toString().toLocaleUpperCase().trim();
//     console.log("Nombre recibido");
//     process.stdout.write(`Bienvenido ${nombre1}`);
//   });
// };
module.exports = {
  mostrarMenu,
  pausa,
  //   saludo,
};
