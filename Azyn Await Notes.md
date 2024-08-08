# async await

Hace que la función donde coloquemos `"async"` retorne una promesa.

```javascript
const getInfoUsuario = async () => {
  return "Hola mundo";
};

getInfoUsuario().then((msg) => console.log(msg));
```

En este caso, toda la función dentro de `"async"` retorna una promesa.Al llamar la función podemos usar las palabras reservadas `"then"`, `"catch"` y `"finally"` para manejar la promesa

**La palabra reservada `"await"` solo es válida dentro de una función asíncrona**

**Ejemplo**
Tenemos un array de empleados con diferentes nombres y la siguiente función:

```javascript
const getEmpleadoByID = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;
    empleado ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
  });
};
```

Esta función es una promesa que me retorna el nombre del empleado si la promesa se cumple y un mensaje de error si esta no se cumple.

Podemos hacer uso de la función asíncrona para llamar a esa promesa. En este caso le decimos a `"getInfoUsuario"` es una promesa asíncrona. Dentro de esta función tenemos la constante `"empleado"` para guardar la resolución de `"getEmpleadoById"`, luego retornamos esta variable `"empleado"`.Al llamar a la función asíncrona `"getInfoUsuario"` hacemos uso del `"then"` y el `"catch"` para manejar la promesa.

```javascript
const getInfoUsuario = async (id) => {
  const empleado = await getEmpleadoByID(id);
  return empleado;
};

getInfoUsuario(id)
  .then((msg) => console.log(msg))
  .catch((e) => console.log(e));
```

**Ejemplo completo**

Tenemos estas 2 funciones que usan promesas para resolver el nombre del empleado y el salario:

_Empleado:_

```javascript
const getEmpleadoByID = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;

    empleado ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
  });
};
```

_Salario:_

```javascript
const getSalarioByID = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;

    salario
      ? resolve(salario)
      : reject(`No existe salario para el empleado con el id ${id}`);
  });
};
```

Luego, los pasamos por una función asíncrona donde guardaremos los valores en `"empleado"` y `"salario"`, y posteiormente usaremos el `".then"` y el `".catch"` para las correspondientes validaciones.

```javascript
const getInfoUsuario = async (id) => {
  try {
    const empleado = await getEmpleadoByID(id);
    const salario = await getSalarioByID(id);

    return `El empleado ${empleado} tiene un salario de ${salario}`;
  } catch (e) {
    return e;
  }
};

getInfoUsuario(id)
  .then((msg) => console.log(msg))
  .catch((e) => console.log(e));
```

**Conclusiones**

1. **Transformación de funciones en promesas**: La palabra reservada `async` transforma cualquier función en una que retorna una promesa. Esto facilita el manejo de operaciones asincrónicas y permite utilizar `then`, `catch` y `finally` para manejar los resultados y errores de estas funciones.

2. **Uso de `await` dentro de funciones asincrónicas**: `await` solo puede ser utilizado dentro de funciones marcadas con `async`, permitiendo pausar la ejecución de la función hasta que la promesa sea resuelta o rechazada. Esto simplifica el trabajo con operaciones asincrónicas, haciéndolo más intuitivo y similar a la programación síncrona.

3. **Manejo de errores simplificado**: Utilizar `try` y `catch` dentro de funciones `async` permite manejar errores de manera más clara y estructurada. Al final, solo se necesita un bloque `then` y `catch` para manejar la resolución y el rechazo de la promesa, reduciendo la cantidad de código necesario en comparación con el uso exclusivo de promesas.

4. **Aplicación en casos prácticos**: Los ejemplos presentados muestran cómo `async` y `await` pueden ser utilizados para manejar operaciones que dependen de datos asincrónicos, como buscar información de empleados y sus salarios. Esto demuestra la flexibilidad y utilidad de estas herramientas en situaciones del mundo real.

5. **Reducción de código**: El uso de `async` y `await` reduce la verbosidad del código al eliminar la necesidad de encadenar múltiples `then` y `catch`. Esto no solo hace que el código sea más corto, sino también más fácil de leer y mantener.
