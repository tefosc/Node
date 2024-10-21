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

## Instalación de `nanoid`

`nanoid` es una biblioteca de JavaScript que se utiliza para generar identificadores únicos y aleatorios. Estos identificadores suelen ser cortos y están diseñados para ser únicos en el contexto de una aplicación. A diferencia de otros generadores de identificadores, `nanoid` es eficiente en términos de tamaño y velocidad.

### Conceptos clave:

- **Tamaño Personalizable:** Permite generar identificadores de longitud personalizada, lo que es útil para ajustarse a requisitos específicos de tu aplicación.

- **Alta Entropía:** Los identificadores generados son criptográficamente seguros, lo que reduce significativamente la probabilidad de colisiones (es decir, dos identificadores iguales).

- **Uso Común:** Ideal para asignar identificadores únicos a objetos en aplicaciones web, bases de datos, y más.

- [Documentación oficial de nanoid](https://github.com/ai/nanoid)

### Ejemplo básico usando `nanoid`

```javascript
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 10);
const id = nanoid(); // Genera un identificador único de 10 caracteres

console.log(id); // Ejemplo de salida: 'V1StTt8tM6'
```

En este ejemplo, `nanoid` genera un identificador único de **10 caracteres** utilizando el conjunto de caracteres `1234567890abcdef`.

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
  .then((answersL) => {
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

## Instalación de `nanoid`

`nanoid` es una biblioteca de JavaScript que se utiliza para generar identificadores únicos y aleatorios. Estos identificadores suelen ser cortos y están diseñados para ser únicos en el contexto de una aplicación. A diferencia de otros generadores de identificadores, `nanoid` es eficiente en términos de tamaño y velocidad.

### Conceptos clave:

- **Tamaño Personalizable:** Permite generar identificadores de longitud personalizada, lo que es útil para ajustarse a requisitos específicos de tu aplicación.

- **Alta Entropía:** Los identificadores generados son criptográficamente seguros, lo que reduce significativamente la probabilidad de colisiones (es decir, dos identificadores iguales).

- **Uso Común:** Ideal para asignar identificadores únicos a objetos en aplicaciones web, bases de datos, y más.

- [Documentación oficial de nanoid](https://github.com/ai/nanoid)

### Ejemplo básico usando `nanoid`

```javascript
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890abcdef", 10);
const id = nanoid(); // Genera un identificador único de 10 caracteres

console.log(id); // Ejemplo de salida: 'V1StTt8tM6'
```

En este ejemplo, `nanoid` genera un identificador único de **10 caracteres** utilizando el conjunto de caracteres `1234567890abcdef`.

## Leer el input que un usuario ingresa por consola con inquirer

```javascript
export const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return `${"Debe ingresar un valor".brightRed}`;
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};
```

Haremos uso del prompt de tipo `question` en este caso, se hará una validación para que el usuario ingrese un valor, ya que será el valor que se añado a un TODO.
luego de esto simplemento hacemos una desestructuración para que nos retorne el `{desc}`

const id = nanoid(); // Genera un identificador único de 10 caracteres

console.log(id); // Ejemplo de salida: 'V1StTt8tM6'

````

En este ejemplo, `nanoid` genera un identificador único de **10 caracteres** utilizando el conjunto de caracteres `1234567890abcdef`.

## Leer el input que un usuario ingresa por consola con inquirer

```javascript
export const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return `${"Debe ingresar un valor".brightRed}`;
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};
````

Haremos uso del prompt de tipo `question` en este caso, se hará una validación para que el usuario ingrese un valor, ya que será el valor que se añado a un TODO.
luego de esto simplemento hacemos una desestructuración para que nos retorne el `{desc}`

## Creamos un modelo de tarea en la clase Tarea

```javascript
export class Tarea {
  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    this.id = nanoid();
    this.desc = desc;
    this.completadoEn = null;
  }
}
```

const id = nanoid(); // Genera un identificador único de 10 caracteres

console.log(id); // Ejemplo de salida: 'V1StTt8tM6'

En esteC ejemplo, `nanoid` genera un identificador único de **10 caracteres** utilizando el conjunto de caracteres `1234567890abcdef`.

# Actualizado `inquirer` TODO opt 1 y 2

## Leer el input que un usuario ingresa por consola con inquirer

```javascript
export const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return `${"Debe ingresar un valor".brightRed}`;
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};
```

Haremos uso del prompt de tipo `question` en este caso, se hará una validación para que el usuario ingrese un valor, ya que será el valor que se añado a un TODO.
luego de esto simplemento hacemos una desestructuración para que nos retorne el `{desc}`

const id = nanoid(); // Genera un identificador único de 10 caracteres

console.log(id); // Ejemplo de salida: 'V1StTt8tM6'

En este ejemplo, `nanoid` genera un identificador único de **10 caracteres** utilizando el conjunto de caracteres `1234567890abcdef`.

## Leer el input que un usuario ingresa por consola con `inquirer`

```javascript
export const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return `${"Debe ingresar un valor".brightRed}`;
        }
        return true;
      },
    },
  ];

  const { desc } = await inquirer.prompt(question);
  return desc;
};
```

Haremos uso del prompt de tipo `input` en este caso, se hará una validación para que el usuario ingrese un valor, ya que será el valor que se añado a un TODO. Luego de esto, simplemento hacemos una desestructuración para que nos retorne el `{desc}`

## Creamos un modelo de tarea en la clase Tarea

```javascript
export class Tarea {
  id = "";
  desc = "";
  completadoEn = null;

  constructor(desc) {
    this.id = nanoid();
    this.desc = desc;
    this.completadoEn = null;
  }
}
```

## Creamos el metodo `creaTarea` en Tareas

```javascript
export class Tareas {
  _listado = {};
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
}
```

- En este codigo vemos que primero tenemos una propiedad `_listado` que es una convención para indicar que es privada, luego de esto usamos `get` para transformar el `objeto` en un `array` con la propiedad `Object.keys` extraemos todas las llaves de `this._listado` luego con un `foreach` hacemos `push` de estas tareas a nuestro `listado` que es un array!

- Luego tenemos el metodo `crearTarea` que recibe una descripción, luego de guardar el valor de `Tarea` en una constante `tarea` almacenamos `tarea` en `_listado[tarea.id]`

## Utilización de switch para el caso de las opciones 1 y 2, crear y listar tareas

```javascript
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

    await pausa();
  } while (opcion !== "0");
};

main();
```

- Estamos usando un switch para las opciones 1 y 2. En la opcion 1 usamos `leerInput` que retorna la descripción que el usuario está ingresando, esta decripcion la guardamos en una constante llamada `desc`. Luego, usaremos el metodo `crearTarea` la que recibe una descripcion para poder crear la tarea.

- En la opción 2 simplemente mostramos al usuario las tareas creadas en formato de array, gracias al geter `listadoArr`

## Uso de `writeFileSync` para guardar datos en un archivo .txt.

Creamos una función con `writeFileSync` para guardar el archivo en la carpeta deseada y llamamos esta función luego del switch inicial:

1. Función para guardar la `"data"` en un archivo llamado `"data.txt"`

**Nota:** Tenemos que transformar la data a un string para que funcione, ya que no acepta arrays. Llamada de la función para guardar la data en formato de `"array"`

```javascript
import { writeFileSync } from "node:fs";

export const guardarDB = (data) => {
  const archivo = "./db/data.json";  <== //podriamos cambiar el formato a .json
  writeFileSync(archivo, JSON.stringify(data)); <===//acá
};
```

```javascript
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
    guardarDB(tareas.listadoArr);   <=== //ESTO

    await pausa();
  } while (opcion !== "0");
};

main();

```

**Si cerramos la app y la volvemos a ejectutar**
