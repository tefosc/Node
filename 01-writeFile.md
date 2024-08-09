# Conversión de Código de CommonJS a ES6 Modules

## Introducción

Node.js ha utilizado tradicionalmente el sistema de módulos CommonJS (`require` y `module.exports`) para la modularización del código. Con la llegada de ES6, se introdujo un nuevo estándar para la importación y exportación de módulos (`import` y `export`). Esta guía proporciona una visión general de por qué y cómo migrar de CommonJS a ES6 Modules, así como las ventajas de hacerlo.

## ¿Por Qué Hacer Estos Cambios?

1. **Estandarización**:

   - **CommonJS** es específico de Node.js y no es reconocido por el estándar de JavaScript.
   - **ES6 Modules** forman parte del estándar de JavaScript (ECMAScript 2015) y son compatibles con el ecosistema moderno de JavaScript, incluyendo navegadores y herramientas de desarrollo.

2. **Compatibilidad**:

   - **CommonJS** no es compatible con los módulos ES6 sin una transformación previa (usando herramientas como Babel).
   - **ES6 Modules** permiten un código más limpio y son compatibles con la mayoría de las herramientas y frameworks modernos.

3. **Optimización**:

   - **ES6 Modules** permiten a los motores de JavaScript realizar optimizaciones más avanzadas, como tree shaking, para eliminar el código no utilizado.
   - **CommonJS** tiene limitaciones en cuanto a la optimización debido a su naturaleza dinámica.

4. **Sintaxis Moderna**:
   - **ES6 Modules** utilizan una sintaxis más moderna y clara, que es más consistente con otras características de ES6 y versiones posteriores de JavaScript.

## Código Original usando CommonJS

### Archivo `helpers/multiply.js`

```javascript
const fs = require("node:fs");

const createFile = (base = 5) => {
  console.log("======================");
  console.log("Tabla del: ", base);
  console.log("======================");

  let data = "";

  for (let i = 1; i <= 12; i++) {
    data += `\n ${base} x ${i} = ${base * i} `;
  }

  console.log(data);

  fs.writeFileSync(`table-${base}.txt`, data);

  console.log(`tabla-${base}.txt creado`);
};

module.exports = {
  createFile,
};
```

### Archivo Principal `index.js`

```javascript
const { createFile } = require("./helpers/multiply");

console.clear();

const base = 7;

createFile(base);
```

## Código Convertido usando ES6 Modules

### Archivo `helpers/multiply.mjs`

```javascript
import { writeFileSync } from "node:fs";

export const createFile = (base = 5) => {
  console.log("======================");
  console.log("Tabla del: ", base);
  console.log("======================");

  let data = "";

  for (let i = 1; i <= 12; i++) {
    data += `\n ${base} x ${i} = ${base * i} `;
  }

  console.log(data);

  writeFileSync(`table-${base}.txt`, data);

  console.log(`tabla-${base}.txt creado`);
};
```

### Archivo principal `index.mjs`

```javascript
import { createFile } from "./helpers/multiply.mjs";

console.clear();

const base = 7;

createFile(base);
```

## Configuración Alternativa usando package.json

### Archivo `package.json`

```javascript
{
  "type": "module"
}

```

### Archivo `helpers/multiply.js`

```javascript
import { writeFileSync } from "node:fs";

export const createFile = (base = 5) => {
  console.log("======================");
  console.log("Tabla del: ", base);
  console.log("======================");

  let data = "";

  for (let i = 1; i <= 12; i++) {
    data += `\n ${base} x ${i} = ${base * i} `;
  }

  console.log(data);

  writeFileSync(`table-${base}.txt`, data);

  console.log(`tabla-${base}.txt creado`);
};
```

### Archivo Principal `index.js`

```javascript
import { createFile } from "./helpers/multiply.js";

console.clear();

const base = 7;

createFile(base);
```

Este resumen te muestra cómo convertir tu código original que usa CommonJS a la sintaxis de módulos ES6, incluyendo una alternativa que usa un archivo `package.json` con `"type": "module"`.

## Conclusión

### ¿Cuál Deberías Usar?

- **CommonJS**: Aunque sigue siendo ampliamente utilizado y es la opción por defecto en muchos proyectos Node.js existentes, no es el estándar oficial y tiene limitaciones en términos de optimización y compatibilidad con herramientas modernas.
- **ES6 Modules**: Es la opción recomendada para proyectos nuevos o cuando se actualizan proyectos existentes. Ofrece varias ventajas, como una sintaxis más clara, compatibilidad con el estándar de JavaScript, y mejores capacidades de optimización.

### Estado de Deprecación

- **CommonJS**: No está deprecado y continuará siendo soportado en Node.js, pero su uso está siendo gradualmente reemplazado por ES6 Modules en nuevos desarrollos.
- **ES6 Modules**: Es el estándar moderno y la dirección futura del desarrollo en JavaScript. Es compatible tanto en Node.js como en navegadores, lo que lo hace ideal para aplicaciones universales.

Al migrar a ES6 Modules, tu código será más compatible con el ecosistema JavaScript actual y futuro, aprovechando las mejoras y optimizaciones que vienen con los estándares modernos.

# Transformar esa misma función en una promesa y una función asincrona

## Promesa

### En el archivo `multiply.mjs`

```javascript
import { writeFileSync } from "node:fs";

import { writeFileSync } from "node:fs";

export const createFile = (base = 5) => {
  return new Promise((resolve, reject) => {
    console.log("======================");
    console.log("Tabla del: ", base);
    console.log("======================");

    let data = "";

    for (let i = 1; i <= 12; i++) {
      data += `\n ${base} x ${i} = ${base * i} `;
    }

    console.log(data);

    writeFileSync(`table-${base}.txt`, data);

    resolve(`tabla-${base}.txt`);
  });
};
```

### En el archivo principal `app.mjs`

```javascript
import { createFile } from "./helpers/multiply.mjs";

console.clear();

const base = 14;

createFile(base)
  .then((fileName) => console.log(fileName, "creado"))
  .catch((err) => console.log(err));
```

## Función asincrona

### En el archivo `multiply.mjs`

```javascript
import { writeFileSync } from "node:fs";

export const createFile = async (base = 5) => {
  try {
    console.log("======================");
    console.log("Tabla del: ", base);
    console.log("======================");

    let data = "";

    for (let i = 1; i <= 12; i++) {
      data += `\n ${base} x ${i} = ${base * i} `;
    }

    console.log(data);

    writeFileSync(`table-${base}.txt`, data);

    return `tabla-${base}.txt`;
  } catch (e) {
    throw e;
  }
};
```

### En el archivo principal `app.mjs`

```javascript
import { createFile } from "./helpers/multiply.mjs";

console.clear();

const base = 14;

createFile(base)
  .then((fileName) => console.log(fileName, "creado"))
  .catch((err) => console.log(err));
```

## Conclusiones sobre Promesas y Funciones Asincrónicas

### Uso de Promesas

- **Flexibilidad en Manejo de Errores**: Al utilizar promesas, puedes manejar errores con el método `.catch()`, lo que facilita el control de excepciones y proporciona una manera clara de gestionar problemas durante la ejecución asincrónica.

- **Encadenamiento de Operaciones**: Las promesas permiten encadenar múltiples operaciones asincrónicas mediante el uso de `.then()`. Esto puede ser útil cuando necesitas realizar varias acciones en secuencia, basadas en los resultados de operaciones previas.

- **Estructura de Código**: El uso de promesas puede llevar a un código más estructurado, pero también puede resultar en "callback hell" si se encadenan demasiadas promesas sin una adecuada estructura.

### Uso de Funciones Asincrónicas (`async/await`)

- **Sintaxis Más Clara y Legible**: Las funciones asincrónicas (`async/await`) proporcionan una sintaxis que es más fácil de leer y entender en comparación con el encadenamiento de promesas. El código parece más síncrono, lo que puede facilitar el seguimiento del flujo lógico.

- **Manejo de Errores Simplificado**: Usar `try/catch` dentro de una función asincrónica para el manejo de errores proporciona un enfoque más familiar para la captura de excepciones, similar a lo que se usa en el código síncrono.

- **Simplificación del Código Asincrónico**: El uso de `await` reduce la complejidad del código al evitar el anidamiento profundo de callbacks o promesas, haciendo que el flujo del código sea más lineal y menos propenso a errores.

### Comparación General

- **Promesas**: Son útiles y ampliamente soportadas en JavaScript, pero pueden llevar a un código más complejo cuando se manejan muchas operaciones asincrónicas en secuencia. Su uso es adecuado si ya estás familiarizado con el manejo de promesas y necesitas una forma flexible de encadenar operaciones.

- **`async/await`**: Es el método moderno recomendado para manejar operaciones asincrónicas debido a su sintaxis más limpia y su capacidad para simplificar el manejo de errores. Es ideal para nuevos desarrollos o para actualizar código existente, haciendo que el código asincrónico sea más fácil de mantener y entender.

En resumen, mientras que las promesas siguen siendo una opción válida y ampliamente utilizada, las funciones asincrónicas ofrecen una manera más intuitiva y manejable de trabajar con operaciones asincrónicas, facilitando la escritura y el mantenimiento del código.
