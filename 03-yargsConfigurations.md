# Configuraciones de yargs

## Agregando alias y typo

- Lo que haremos es que usando `"option"` de `"yargs"` vamos a darle una abreviatura a nuestra `"base"`, ahora la haremos llamar `"b"` de la siguiente manera:

```javascript
const argv = yargs(hideBin(process.argv)).option("b", {
  alias: "base",
  type: "number",
}).argv;
```

Lo que veriamos en consola es lo siguiente:

```javascript
 kirak on Annie at …\03-bases-node via  master   node .\app.mjs --help
Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -b, --base
```

Como vemos se nos está creando un nuevo comando `-b, --base` ambos podriamos usarlo de la misma manera

Usando el comando creado:

```javascript
{ _: [], b: 14, base: 14, '$0': 'app.mjs' }
base: yargs 14
 kirak on Annie at …\03-bases-node via  master    node .\app.mjs --b 14
```

Como `"yargs"` sabe que `"base"` y `"b"` son iguales, entonces almacena este valor en ambos

## Agregando opción para que el valor sea obligatorio

```javascript
const argv = yargs(hideBin(process.argv)).option("b", {
  alias: "base",
  type: "number",
  demandOption: true,
}).argv;
```

Si no mandamos ninguna base tendriamos:

```javascript
 kirak on Annie at …\03-bases-node via  master    node .\app.mjs
Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -b, --base                                                 [number] [required]

Missing required argument: b
```

## Agregando chequeo de tipo de dato

```javascript
const argv = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
  })
  .check((argv, options) => {
    if (isNaN(argv.base)) {
      throw "La base tiene que ser un número";
    }
    return true;
  }).argv;
```

Con esto nos aseguramos de que el usuario tenga que ingresar un número y si no lo ingresa, que la aplicación se detenga y nos muestre el error

```javascript
 kirak on Annie at …\03-bases-node via  master    node .\app.mjs --b asc
Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -b, --base                                                 [number] [required]

La base tiene que ser un número
```

**Además si no hay errores, retornamos `"true"` es decir que el código siga funcionando**

## **Ejercicio**

Con esta teoria tenemos que hacer que la aplicación reciba un nuevo parametro `"l"` o `"listar"` que cuando nos lo manden por consola con un valor de `"true"` o `"false"` la tabla del número dado se muestre o no, esta opción no será requerida, o sea que la podemos mandar o no, si no la mandamos no nos mostrará nada, pero si la mandamos y usamos `"true"` si nos la mostrará.

- Solución:
  **En `"multiply.mjs"` donde está la lógica de nuestro programa, es sencillo, unicamente agregaremos otro argumento a recibir en la función y la daremos un valor por defecto de false `listar = false`. Después usaremos un if para mostrar tanto el encabezado como la data si `"listar=true"`**

```javascript
//multiply.mjs
import { writeFileSync } from "node:fs";

export const createFile = async (base = 5, listar = false) => {
  try {
    let data = "";

    for (let i = 1; i <= 12; i++) {
      data += `\n ${base} x ${i} = ${base * i} `;
    }

    if (listar) {
      console.log("======================");
      console.log("Tabla del: ", base);
      console.log("======================");
      console.log(data);
    }

    writeFileSync(`tabla-${base}.txt`, data);

    return `tabla-${base}.txt`;
  } catch (e) {
    throw e;
  }
};
```

**Lo que haremos será hacer uso de option para agregar una nueva opción a nuestra aplicación, en este caso sera `"l"` o `"listar"` ademas que `default = false` lo que quiere decir el valor por defecto de esta bandera es de `"false"`**

```javascript
//app.mjs
import { createFile } from "./helpers/multiply.mjs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    default: false,
  })
  .check((argv, options) => {
    if (isNaN(argv.base)) {
      throw "La base tiene que ser un número";
    }
    return true;
  }).argv;

console.clear();

console.log(argv);

createFile(argv.b, argv.l)
  .then((fileName) => console.log(fileName, "creado"))
  .catch((err) => console.log(err));
```

**El programa funcionaria correctamente teniendo las siguiente salidas por consola:**

`node .\app.mjs --b 12`

```javascript
{ _: [], b: 12, base: 12, l: false, listar: false, '$0': 'app.mjs' }
tabla-12.txt creado
```

`node .\app.mjs --b 11 -l true`

```javascript
{ _: [], b: 11, base: 11, l: true, listar: true, '$0': 'app.mjs' }
======================
Tabla del:  11
======================

 11 x 1 = 11
 11 x 2 = 22
 11 x 3 = 33
 11 x 4 = 44
 11 x 5 = 55
 11 x 6 = 66
 11 x 7 = 77
 11 x 8 = 88
 11 x 9 = 99
 11 x 10 = 110
 11 x 11 = 121
 11 x 12 = 132
tabla-11.txt creado
```

Vemos que en ambos caso funciona correctamente, y como el campo no es requerido no nos dará error si no mandamos la bándera -l

## Separando lógica

Colocamos una nueva bandera en `"package.json"` con `"type": "module",` para poder usa `import` y `export`

Esta configuración se hace para configurar el proyecto de Node.js para que use modulos ES, podemos hacerlo de 2 manera, colocando el `"type": "module",` o agregando `.mjs` a los archivos

### Comparación de métodos

- Con `"type": "module"`: Todos los archivos `.js` en el proyecto serán tratados como módulos ES. Es conveniente si prefieres mantener la extensión `.js` para todos tus archivos.

- Con `.mjs`: Solo los archivos con la extensión `.mjs` se tratarán como módulos ES. Es útil si deseas tener un proyecto mixto con archivos `.js` (para CommonJS) y `.mjs` (para ESM).

**Para esta carpeta únicamente usaremos `.mjs`**

**Nota**

- CommonJS(CJS): Usa `require` para importar módulos y `module.exports` o `exports` para exportar.

- ECMAScript Modules(ESM): Usa `import` para importar módulos y `export` para exportar.

## Agregando descripciones para el --help de nuestra app

```javascript
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export const argv = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Es la base de la tabla de multiplicar",
  })
  .option("l", {
    alias: "listar",
    type: "boolean",
    default: false,
    describe: "Muestra la tabla en consola",
  })
  .check((argv, options) => {
    if (isNaN(argv.base)) {
      throw "La base tiene que ser un número";
    }
    return true;
  }).argv;
```

Cada vez que el usuario haga ` node .\app.mjs --help` en nuestra app le mostrará esto:

```javascript
 kirak on Annie at …\03-bases-node via  master   node .\app.mjs --help
Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -b, --base     Es la base de la tabla de multiplicar       [number] [required]
  -l, --listar   Muestra la tabla en consola          [boolean] [default: false]
```

**Se mostrará una pequeña descripción de que hace cada comando 😺**
