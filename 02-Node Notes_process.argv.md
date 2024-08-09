# process.argv

La propiedad `process.argv` devuelve un array que contiene los argumentos de línea de comandos pasados cuando se lanzó el proceso de Node.js.

El primer elemento del array es la ruta absoluta del ejecutable de Node.js, y el segundo elemento es la ruta del archivo JavaScript que se está ejecutando.

Cualquier elemento adicional en el array son los argumentos de línea de comandos pasados al script.

Esta propiedad es útil para acceder a los argumentos de línea de comandos dentro de una aplicación de Node.js.

Te permite recuperar y procesar los argumentos pasados a tu script desde la línea de comandos.

**Ejemplo de uso:**

```javascript
// script.js
console.log(process.argv);
```

- Al ejecutar el script anterior con el comando `node script.js arg1 arg2`, la salida será:

```javascript
[
  "C:\\Program Files\\nodejs\\node.exe",
  "A:\\Personal\\Udemy\\Node\\03-bases-node\\app.mjs",
  "arg1",
  "arg2",
];
```

Entonces sabemos que con este comando `process.argc` podemos escribir elementos en un `"array"` gracias a esto, podemos recuperar este valor para de esta manera poder mandar la base de nuestra tabla de multiplicar directamente desde la consola

**Ejemplo**
En la consola ejecutamos el comando ` node .\app.mjs --base=11`, esto imprimirá el siguiente resultado en consola:

```javascript
[
  "C:\\Program Files\\nodejs\\node.exe",
  "A:\\Personal\\Udemy\\Node\\03-bases-node\\app.mjs",
  "--base=11",
];
```

Entonces vemos que es un `"array"` es decir que podemos usar `"desestructuracion"` para poder usar el elemento que queremos, en este caso el tercero **`const [, , baseConsola = 5] = process.argv;`**

Lo que estamos haciendo es crear una constante llamada `"baseConsola"` que tendrá un valor por defecto de `"5"` y esto lo igualamos al tercer valor de `process.argv`

Entonces cuando mandamos un `--base=10` el valor de nuestra variable `"baseConsola"` será `"10"` pero si no mandamos ninguna base, esta será `"5"`

**Despues de esto extraemos el valor de la base**

Para extraer unicamente el valor numerico de la base hacemos lo siguiente: `const base = baseConsola.split("=")[1];`

Lo que hace este codigo es que separa este string `"--base=10"` despues del signo `"="` esto hace que tengamos 2 elementos en un array `"--base="` y `"10"`. Lo que resta sería extraer el valor que queremos, y este esta en la posición `"[1]"`

# Creación de package.json

`npm init`

```javascript
 kirak on Annie at …\03-bases-node npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (03-bases-node)
version: (1.0.0) 0.0.1
description: Tabla de multiplicar que genera un archivo .txt
entry point: (index.js) app.mjs
test command:
git repository:
keywords:
author: Stefano Solis
license: (ISC) MIT
About to write to A:\Personal\Udemy\Node\03-bases-node\package.json:

{
  "name": "03-bases-node",
  "version": "0.0.1",
  "description": "Tabla de multiplicar que genera un archivo .txt",
  "main": "app.mjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Stefano Solis",
  "license": "MIT"
}


Is this OK? (yes)
```

# Agregamos un comando para ejecutar de diferentes manera desde consola

En el `"package.json"` agregamos en la parte de `"script"` la linea que se muestra, de esta manera en la consola solo ejecutariamos `"npm run base 5"`

```javascript
{
  "name": "03-bases-node",
  "version": "0.0.1",
  "description": "Tabla de multiplicar que genera un archivo .txt",
  "main": "app.mjs",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "base5": "node app.mjs --base=5"
  },
  "author": "Stefano Solis",
  "license": "MIT",
  "dependencies": {
    "npm": "^10.8.2"
  }
}
```

## Intalando packetes

`npm install colors`
Cuando instalamos cualquiera paquete de `"npm"` esto se va a las dependencias:

```javascript
 "dependencies": {
    "colors": "^1.4.0",
    "npm": "^10.8.2"
  }
```

En este caso hemos instalado el paquete `"npm"` de `"colors"` y se nos crea la dependencia

## Desinstalar packetes

`npm uninstall colors`

## Instalar una versión especifica

`npm install colors@1.0.0`

## Actualizar dependencias

`npm update`

# yargs

- "yargs" es una biblioteca de Node.js que facilita el análisis de argumentos de línea de comandos. Proporciona una forma sencilla de definir y analizar los argumentos pasados a través de la línea de comandos en una aplicación Node.js. Con "yargs", puedes crear interfaces de línea de comandos más robustas y flexibles para tus programas.

En el ejempli usaremos `"yargs"` de la siguiente manera:

```javascript
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;

console.clear();

console.log(process.argv);
console.log(argv);
```

- `"hideBin"` es una utilidad que ayuda a quitar la parte inicial de los argumentos (node y el archivo que estás ejecutando), dejando solo los argumentos que realmente deseas procesar.

Tendríamos el siguiente resultado en consola:

```javascript
[
  'C:\\Program Files\\nodejs\\node.exe',
  'A:\\Personal\\Udemy\\Node\\03-bases-node\\app.mjs',
  '--base=12'
]
{ _: [], base: 12, '$0': 'app.mjs' }
```

## Ventajas de `"yargs"`

- Con `"yargs"`, podemos mandar esto por consola: `"node .\app.mjs --base 12 --listar"` y esto funcionará sin errores de nomenclatura. Si usáramos solo `"process.argv"`, esto generaría un resultado menos intuitivo, donde los argumentos estarían separados:

```javascript
[
  'C:\\Program Files\\nodejs\\node.exe',
  'A:\\Personal\\Udemy\\Node\\03-bases-node\\app.mjs',
  '--base',
  '12',
  '--listar'
]
{ _: [], base: 12, listar: true, '$0': 'app.mjs' }
base: yargs 12
```

- Como vemos el primer resultado tiene un error de nomenclatura, ya que me crea `"--base"` y en otra instancia `"12"` y luego `"--listar"`**Pero con `"yargs"` nos crea la `base : 12` y como no le pasamos un valor a listar nos lo inicializa en true `"listar: true"`**

## Conclusión

- `"yargs"` es una herramienta poderosa que simplifica el manejo de argumentos de línea de comandos, evitando errores comunes y proporcionando una sintaxis clara y manejable para nuestras aplicaciones en Node.js.
