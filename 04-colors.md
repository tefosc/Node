Para usar colors con paquetas de ESM, primero instalamos el packete `"npm"` con `npm install colors` luego importamos la biblioteca `import colors from "colors";`.

Hay diferentes formas de usarlo según la documentación, yo opté por hacerla de la siguiente manera:

```javascript
import colors from "colors";

colors.setTheme({
  explain: "brightCyan",
  error: "brightRed",
  signo: "brightMagenta",
  base: "brightYellow",
  data: "cyan",
  textEnd: "brightGreen",
});
```

- Después de import `"colors"` lo que hacemos es setear el tema con un `"json"` y colocar nuestras variables con los diferentes colores, luego los podemos usar así:

```javascript
console.log(colors.rainbow("======================"));
console.log(colors.explain("Tabla del: "), colors.base(base));
console.log(colors.rainbow("======================"));
console.log(colors.data(data));
```

\*\*Se tuvo un error, y es que cuando colocamos colores en la data resultante esta no puede ser leida, por lo que se planteó la siguiente solución:

```javascript
import { writeFileSync } from "node:fs";
import colors from "colors";

colors.setTheme({
  explain: "brightCyan",
  error: "brightRed",
  signo: "brightMagenta",
  rainbow: "rainbow",
  base: "brightYellow",
  data: "cyan",
  textEnd: "brightGreen",
});

export const createFile = async (base = 5, listar = false, limite = 10) => {
  try {
    let data = "";
    let consola = "";

    for (let i = 1; i <= limite; i++) {
      data += `\n ${base} x ${i} = ${base * i} `;
      consola += `\n ${base} ${colors.signo("x ")}${i} ${"=".signo} ${
        base * i
      } `;
    }

    if (listar) {
      console.log(colors.rainbow("======================"));
      console.log(colors.explain("Tabla del: "), colors.base(base));
      console.log(colors.rainbow("======================"));
      console.log(colors.data(consola));
    }

    writeFileSync(`tabla-${base}.txt`, data, "utf-8");

    return `tabla-${base}.txt`;
  } catch (e) {
    throw colors.error(e);
  }
};
```

Creamos una variable nueva llamado `"consola"` y esta es a la que le vamos a aplicar los colores, luego en `"data"` dejamos los valores normales y este es con el que haremos nuestra seteo de datos en `".txt"`
