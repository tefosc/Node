# Inquirer

**A partir de este punto se trabajaran con modulos ES**

**Inquirer** es una biblioteca de Node.js que facilita la creación de aplicaciones de consola interactivas. Ofrece una manera sencilla de hacer preguntas y recoger respuestas del usuario.

## Uso básico (Versión actualizada)

En la versión más reciente de Inquirer, **aunque existe una opción para crear un prompt usando `createPromptModule`**, en la mayoría de los casos no es necesario. El uso de `.prompt` es más que suficiente y simplifica el proceso.

### Ejemplo

```javascript
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      type: "input",
      name: "username",
      message: "¿Cuál es tu nombre?",
    },
  ])
  .then((answers) => {
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
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      type: "list",
      name: "color",
      message: "¿Cuál es tu color favorito?",
      choices: ["Rojo", "Azul", "Verde"],
    },
  ])
  .then((answers) => {
    console.log(`Tu color favorito es: ${answers.color}`);
  });
```

Este código muestra una lista de colores al usuario y captura la selección.

## Validación de entrada

Inquirer permite la validación de entradas para asegurar que el usuario ingrese datos válidos.

```javascript
import inquirer from "inquirer";

inquirer
  .prompt([
    {
      type: "input",
      name: "age",
      message: "¿Cuál es tu edad?",
      validate: (value) => {
        const valid = !isNaN(parseFloat(value));
        return valid || "Por favor, ingresa un número";
      },
    },
  ])
  .then((answers) => {
    console.log(`Tienes ${answers.age} años`);
  });
```

En este ejemplo, se valida que el usuario ingrese un número.

## Ejemplo de flujo de preguntas

Puedes encadenar varias preguntas para crear un flujo más complejo:

```javascript
import inquirer from "inquirer";

inquirer
  .prompt([
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
  ])
  .then((answers) => {
    console.log(`Hola, ${answers.firstName} ${answers.lastName}!`);
  });
```

Este ejemplo recoge el nombre y apellido del usuario y los muestra juntos.

## Referencias

- [Documentación oficial de Inquirer](https://github.com/SBoudrias/Inquirer.js)

## En nuestra aplicación de TODO

### En `/helpers/inquirer.js`

```javascript
import colors from "colors";
import inquirer from "inquirer";

const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log("============================".green);
  console.log("   Seleccione una opción".green);
  console.log("============================\n".green);

  // const prompt = inquirer.createPromptModule();
  const { opcion } = await inquirer.prompt(menuOpts);
  return opcion;
};

export const pausa = async () => {
  const question = [
    {
      type: "input",
      message: `Presiona ${"enter".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};
```

### En `/app.js`

```javascript
import { inquirerMenu, pausa } from "./helpers/inquirer.js";
import colors from "colors";

const main = async () => {
  let opcion = "";
  do {
    opcion = await inquirerMenu();
    console.log({ opcion });

    await pausa();
  } while (opcion !== "0");
};

main();
```

De esta manera, tendríamos una vista ordenada y amigable sin necesidad de hacerlo manualmente.
Ademas se ha agregado la funcionalidad para que tenga una pausa cada que el usuario seleccione una opción.
