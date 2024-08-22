Primero crearemos el archivo `package.json` lo haremos de una manera rápida usando el comando `npm init -y` lo cual nos creará el archivo `package.json` de manera rápida
**Nunca olvidar el archivo `".gitignore"`** para omitir los modulos de node en nuestro repositorio.

Para este proyecto usaremos los módulos de `"CommonJS"`que es el sistema tradicional de `"Node.js"`

Para esto usamos simplemente `require("colors");`

# TODO APP

## Exportando funciones con `"CommonJS"`

Para exportar funciones con `"CommonJS"` lo haremos de la siguiente forma:

```javascript
require("colors");

const mostrarMenu = () => {
  console.clear();
  console.log("============================".green);
  console.log("   Seleccione una opción".green);
  console.log("============================".green);
};

module.exports = {
  mostrarMenu,
};
```

Y la importación sería de la siguiente manera:

```javascript
const { mostrarMenu } = require("./helpers/mensajes");

require("colors");

const main = async () => {
  console.clear();
  console.log("Hello World".green);
  mostrarMenu();
};

main();
```

## stdin - stdout

**NodeJS** proporciona `stdin` (entrada estandar) y `stadout` (salida estándar) como flujos de lectura y escritura que permiten interactuar con el usuario a través de la consola.

```javascript
require("colors");

const mostrarMenu = () => {
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
};
// Crear una interfaz de lectura para entrada y salida estándar
const readLine = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Solicitar una opción al usuario
readLine.question("Seleccione una opción: ", (opcion) => {
  console.log({ opcion });
  readLine.close();
});

module.exports = {
  mostrarMenu,
};
```

- `readLine`:
  - Crea una interfaz de lectura para interactuar con el usuario mediante `stdin` y `stdout`

* `readLine.question`
  - Solicita una entrada al usuario y procesa la respuesta

### ¿Cómo Se Utilizan `input` y `output`?

Aunque no se usan directamente en el código mencionado, la interfaz `readline` los utiliza para realizar su funcionalidad:

- **`input`**: La interfaz `readline` lee automáticamente los datos de este flujo. No necesitas usar `input` explícitamente porque `readline` maneja la lectura de datos para ti.

- **`output`**: La interfaz `readline` escribe mensajes y preguntas a este flujo. Nuevamente, no necesitas usar `output` explícitamente porque `readline` maneja la escritura de datos para ti.

#### Métodos y Eventos

Los métodos como `question`, `on`, y `close` utilizan internamente los flujos definidos en `input` y `output`:

- **`rl.question(query, callback)`**: Muestra `query` en el flujo de salida (`process.stdout`), y luego espera la entrada del usuario desde el flujo de entrada (`process.stdin`).

- **`rl.on("line", callback)`**: Escucha las líneas de entrada desde el flujo de entrada (`process.stdin`) y ejecuta el `callback` con cada línea que el usuario escribe.

- **`rl.close()`**: Cierra la interfaz `readline`, liberando los recursos y finalizando la lectura del flujo de entrada.
