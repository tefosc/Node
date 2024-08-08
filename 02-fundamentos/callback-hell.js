const empleados = [
  {
    id: 1,
    nombre: "Alejandro",
  },
  {
    id: 2,
    nombre: "Katherine",
  },
  {
    id: 3,
    nombre: "Karla",
  },
];
const salarios = [
  {
    id: 1,
    salario: 1000,
  },
  {
    id: 2,
    salario: 3000,
  },
];

const id = 31;

const getEmpleadoByID = (id, cb) => {
  const empleado = empleados.find((e) => e.id === id)?.nombre; //extraer el .nombre si se cumple.
  if (empleado) {
    cb(null, empleado);
  } else {
    cb(`El empleado con el ID: ${id} no existe!!!`);
  }
};

const getSalarioByID = (id, cb) => {
  const salario = salarios.find((e) => e.id === id)?.salario; //extraer el .salario si se cumple.
  if (salario) {
    cb(null, salario);
  } else {
    cb(`No existe salario para el empleado con ID: ${id} `);
  }
};

getEmpleadoByID(id, (err, empleado) => {
  if (err) {
    return console.log(err);
  }
  getSalarioByID(id, (err, salario) => {
    if (err) {
      return console.log(err);
    }
    console.log(`El empleado ${empleado} tiene un salario de ${salario}`);
  });
});

//Another callback

//Crea una función getProductoByID que reciba un id de producto y un callback cb. La función debe buscar el producto en una lista de productos y llamar al callback con diferentes números de parámetros según el caso:

// 1. Si el producto con el id existe, llama al callback con tres parámetros:

// null (para indicar que no hubo error),
// el nombre del producto,
// y el precio del producto.

// 2. Si el producto no tiene un precio (es decir, el precio es undefined), llama al callback con dos parámetros:

// null (para indicar que no hubo error),
// el nombre del producto.

// 3 Si el producto con el id no existe en la lista, llama al callback con un solo parámetro:

const productos = [
  { id: 1, nombre: "Laptop", precio: 1200 },
  { id: 2, nombre: "Teléfono", precio: 800 },
  { id: 3, nombre: "Ratón" }, // Sin precio
];

const getProductoByID = (id, cb) => {
  const product = productos.find((prod) => prod.id === id);
  if (product) {
    if (product.precio !== undefined) {
      cb(null, product.nombre, product.precio);
    } else {
      cb(null, product.nombre);
    }
  } else {
    cb(`El producto con el id ${id} no existe.`);
  }
};

getProductoByID(3, (err, nombre, precio) => {
  if (err) {
    console.log(err);
  } else if (precio === undefined) {
    console.log(`El producto ${nombre} no tiene precio.`);
  } else {
    console.log(
      `El producto con el nombre ${nombre} tiene un precio de: ${precio}`
    );
  }
});
