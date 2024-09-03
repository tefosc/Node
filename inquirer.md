# Inquirer

**A partir de este punto se trabajaran con modulos ES**

**Inquirer** es una biblioteca de Node.js que facilita la creación de aplicaciones de consola interactivas. Ofrece una manera sencilla de hacer preguntas y recoger respuestas del usuario.

## Uso básico (Versión actualizada)

En la versión más reciente de Inquirer, ya no podemos usar `.prompt` directamente. En su lugar, debemos crear el prompt utilizando `createPromptModule`.

### Ejemplo

```javascript
import inquirer from "inquirer";
const prompt = inquirer.createPromptModule();

prompt([
  {
    type: "input",
    name: "username",
    message: "¿Cuál es tu nombre?",
  },
]).then((answers) => {
  console.log(`Hola, ${answers.username}!`);
});
```

En este ejemplo, `createPromptModule()` se utiliza para crear un módulo de prompt, que luego se usa para hacer preguntas al usuario.

## Tipos de preguntas

Inquirer soporta varios tipos de preguntas, como:

- **input**: Entrada de texto simple.
- **confirm**: Pregunta de sí/no.
- **list**: Lista de opciones donde el usuario selecciona una.
- **checkbox**: Lista de opciones múltiples donde el usuario puede seleccionar varias.
- **password**: Entrada de texto oculta para contraseñas.

### Ejemplo de una lista

```javascript
const prompt = inquirer.createPromptModule();

prompt([
  {
    type: "list",
    name: "color",
    message: "¿Cuál es tu color favorito?",
    choices: ["Rojo", "Azul", "Verde"],
  },
]).then((answers) => {
  console.log(`Tu color favorito es: ${answers.color}`);
});
```

Este código muestra una lista de colores al usuario y captura la selección.

## Validación de entrada

Inquirer permite la validación de entradas para asegurar que el usuario ingrese datos válidos.

```javascript
const prompt = inquirer.createPromptModule();

prompt([
  {
    type: "input",
    name: "age",
    message: "¿Cuál es tu edad?",
    validate: (value) => {
      const valid = !isNaN(parseFloat(value));
      return valid || "Por favor, ingresa un número";
    },
  },
]).then((answers) => {
  console.log(`Tienes ${answers.age} años`);
});
```

En este ejemplo, se valida que el usuario ingrese un número.

## Ejemplo de flujo de preguntas

Puedes encadenar varias preguntas para crear un flujo más complejo:

```javascript
const prompt = inquirer.createPromptModule();

prompt([
  {
    type: "input",
    name: "firstName",
    message: "¿Cuál es tu nombre?",
  },
  {
    type: "input",
    name: "lastName",
    message: "¿Cuál es tu apellido?",
  },
]).then((answers) => {
  console.log(`Hola, ${answers.firstName} ${answers.lastName}!`);
});
```

Este ejemplo recoge el nombre y apellido del usuario y los muestra juntos.

## Referencias

- [Documentación oficial de Inquirer](https://github.com/SBoudrias/Inquirer.js)

## En nuestra aplicación de TODO

### En `/helpers/inquirer.js`

```javascript
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
```

### En `/app.js`

```javascript
import { inquirerMenu } from "./helpers/inquirer.js";
import colors from "colors";
//const { mostrarMenu, saludo, pausa } = require("./helpers/mensajes");

const main = async () => {
  let opcion = "";
  do {
    opcion = await inquirerMenu();
    console.log({ opcion });
  } while (opcion !== "0");
};

main();
```

De esta manera, tendríamos una vista ordenada y amigable sin necesidad de hacerlo manualmente.
