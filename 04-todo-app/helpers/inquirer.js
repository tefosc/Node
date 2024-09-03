import colors from "colors";
import inquirer from "inquirer";

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: ["opt1", "opt2", "opt3"],
  },
];

export const inquirerMenu = async () => {
  //   console.clear();
  console.log("============================".green);
  console.log("   Seleccione una opción".green);
  console.log("============================\n".green);

  const prompt = inquirer.createPromptModule();
  const opt = await prompt(menuOpts);
  return opt;
};
