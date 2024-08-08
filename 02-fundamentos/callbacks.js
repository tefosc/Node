// setTimeout(()=>{
//     console.log('Hola mundo');
// },1000);

const getUsuarioByID = (id, cb) => {
  const usuario = {
    id, //id = id,
    nombre: "Alejandro",
  };
  setTimeout(() => {
    cb(usuario, id);
  }, 1500);
};

getUsuarioByID(10, (usuario, id) => {
  console.log("Hola mundo!!! ", usuario.nombre.toUpperCase(), "tu ID es:", id);
});

//Callback para ingresar 2 numeros, y luego ejecutar una operación + - * /

const calculate = (number1, number2, cb) => {
  return cb(number1, number2);
};

console.log(calculate(5, 6, (n1, n2) => n1 * n2));

console.log(calculate(5, 6, (n1, n2) => n1 + n2));

//Callback con filtro de arreglo
let array = [1, 3, 4, 5, 7, 10, 12];
const filterArray = (arr, cb) => cb(arr);
console.log(filterArray(array, (arr) => arr.filter((el) => el % 2 === 0)));

console.log(filterArray(array, (arr) => arr.filter((el) => el % 2 === 1)));

//Callback que acepte un arreglo y un callback, debe retornar un arreglo con los resultados de aplicar el callback a cada elemento del arreglo original

let array2 = ["Ana", "Juana", "Julisa", "Karla"];

const mapArray = (arr, cb) => arr.map(cb);

console.log(mapArray(array2, (el) => `Buenod días ${el}`));
console.log(
  mapArray(array2, (el, index) => `Buenod días ${el} tú posición es: ${index}`)
);

//Escribe una función processString que acepte una cadena de texto y un callback. El callback debe realizar alguna manipulación en la cadena (por ejemplo, convertirla a mayúsculas, invertirla, etc.) y retornar el resultado.

const processString = (str, cb) => cb(str);

console.log(
  processString("cadena en Mayuscula", (cadena) => cadena.toUpperCase())
);

console.log(
  processString("cadena en reversa", (cadena) =>
    cadena.split("").reverse().join("")
  )
);

console.log(
  processString("CADENa en Minuscula", (cadena) => cadena.toLowerCase())
);
