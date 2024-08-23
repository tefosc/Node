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

## Repetir menú infinitamente

Tenemos el siguiente código en `"./helpers/mensajes.js"`

```javascript
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

module.exports = {
  mostrarMenu,
  pausa,
};
```

Y el siguiente codigo en `/app.js`

```javascript
require("colors");
const { mostrarMenu, saludo, pausa } = require("./helpers/mensajes");

const main = async () => {
  let opcion = "";
  do {
    opcion = await mostrarMenu();
    console.log({ opcion });
    if (opcion !== "0") await pausa();
  } while (opcion !== "0");

  mostrarMenu();
};

main();
```

### Flujo del Programa

1. **Mostrar Menú (`mostrarMenu()`)**:

   - Limpia la consola con `console.clear()`.
   - Imprime el menú con opciones numeradas en la consola.
   - Espera la entrada del usuario mediante la interfaz `readline`.

2. **Entrada del Usuario**:

   - El usuario selecciona una opción del menú y presiona Enter.
   - La opción seleccionada se devuelve desde la función `mostrarMenu()`.

3. **Mostrar Opción Seleccionada**:

   - La opción seleccionada se imprime en la consola usando `console.log({ opcion })`.

4. **Esperar con Pausa (`pausa()`)**:

   - Muestra un mensaje que indica al usuario que presione Enter para continuar.
   - El programa se detiene hasta que el usuario presiona Enter.

5. **Repetir el Menú**:

   - Después de que el usuario presiona Enter, el flujo del programa vuelve a ejecutar `mostrarMenu()`.
   - El menú se muestra nuevamente, y el proceso se repite hasta que el usuario selecciona la opción `"0"` para salir.

6. **Condición de Salida**:
   - El bucle `do-while` continúa hasta que el usuario elige `"0"`.
   - Una vez seleccionada la opción `"0"`, el bucle termina y el programa finaliza.

### Diagrama del Flujo

```yaml
Inicio
|
v
Mostrar Menú
|
v
Esperar Entrada del Usuario
|
v
Mostrar Opción Seleccionada
|
v
Esperar con Pausa
|
v
Repetir (si la opción no es "0")
|
v
Mostrar Menú (de nuevo)
|
..
|
v
Fin (si la opción es "0")
```

El programa presentará un menú al usuario, y mientras no seleccione `"0"` el programa seguirá ejecutandose.

### Uso de Promesas

Las promesas se utilizan en el código proporcionado para manejar operaciones asincrónicas de manera eficiente y ordenada. A continuación, se describen las razones clave para el uso de promesas en este contexto.

#### Razones para Usar Promesas

1. **Manejo de Operaciones Asíncronas**:

   - **Entrada del Usuario**: La función `mostrarMenu` espera la entrada del usuario, lo que es una operación asincrónica. Las promesas permiten manejar esta espera sin bloquear el flujo del programa.
   - **Pausa**: La función `pausa` también utiliza la entrada del usuario para continuar. Las promesas permiten pausar la ejecución del código hasta que el usuario presiona Enter.

2. **Control de Flujo Asíncrono**:

   - **Encadenamiento de Operaciones**: Las promesas permiten encadenar operaciones asincrónicas de manera clara. En este caso, `mostrarMenu` y `pausa` se utilizan en secuencia dentro de un bucle `do-while`, lo que facilita el control del flujo del programa.
   - **Lectura Secuencial**: Con `async/await`, el código que maneja estas promesas se lee como si fuera síncrono, simplificando la comprensión y el mantenimiento del flujo de ejecución.

3. **Manejo Eficiente de Errores**:

   - **Captura de Errores**: Aunque no se muestra en el código proporcionado, las promesas permiten capturar errores de manera centralizada usando el método `.catch()` o mediante bloques `try/catch` en el contexto de `async/await`, lo que facilita el manejo de errores.

4. **Mejora de la Legibilidad**:
   - **Código Claro y Estructurado**: Utilizar promesas y `async/await` mejora la legibilidad del código al evitar el uso de callbacks anidados, lo que puede resultar en "callback hell". El flujo del programa se vuelve más claro y fácil de seguir.

#### Ejemplo de Uso de Promesas

- **`mostrarMenu`**:

  - Muestra el menú y espera la entrada del usuario.
  - Devuelve una promesa que se resuelve con la opción seleccionada.

- **`pausa`**:
  - Muestra un mensaje para que el usuario presione Enter.
  - Devuelve una promesa que se resuelve cuando el usuario presiona Enter.

#### Flujo de Ejecución en una Promesa Asíncrona

1. **Ejecución del Código**:

   - Cuando se llama a una función asíncrona que devuelve una promesa, todo el código dentro de esa función se ejecuta.
   - Esto incluye cualquier lógica que esté antes de la resolución de la promesa, como la impresión en la consola o la configuración de interfaces.

2. **Esperar la Resolución de la Promesa**:

   - Mientras el código dentro de la función se ejecuta, la función puede llegar a un punto donde debe esperar a que algo suceda, como recibir una entrada del usuario, una respuesta de una API, o realizar una operación de I/O.
   - En este punto, el código puede incluir una declaración `await` para pausar la ejecución hasta que la promesa se resuelva.

3. **Resolución de la Promesa**:

   - La promesa se resuelve cuando la operación asíncrona se completa. La promesa puede resolverse con un valor (usualmente con `resolve(value)`) o ser rechazada con un error (usualmente con `reject(error)`).
   - Una vez que la promesa se resuelve, el flujo de ejecución del código que está esperando con `await` continúa.

4. **Continuar con el Código**:
   - Después de que la promesa se ha resuelto, el valor retornado (si la promesa se resolvió exitosamente) o el error (si la promesa fue rechazada) se utiliza en el resto del código.
   - El código que sigue después del `await` en la función asíncrona se ejecuta una vez que la promesa ha sido resuelta.

#### Conclusión

Las promesas en el código proporcionado permiten manejar operaciones asincrónicas de manera ordenada, facilitan el control del flujo del programa, mejoran la legibilidad del código y ofrecen un manejo más eficiente de errores. Usar promesas y `async/await` simplifica el desarrollo y mantenimiento de aplicaciones que requieren interacción del usuario y espera de eventos asincrónicos.
