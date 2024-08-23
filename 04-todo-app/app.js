require("colors");
const { mostrarMenu, saludo, pausa } = require("./helpers/mensajes");

const main = async () => {
  let opcion = "";
  do {
    opcion = await mostrarMenu();
    console.log({ opcion });
    if (opcion !== "0") await pausa();
  } while (opcion !== "0");

  //   pausa();
  //   saludo();
};

main();
