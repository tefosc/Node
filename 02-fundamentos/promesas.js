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
const id = 3;

const getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((empleado) => empleado.id === id)?.nombre;

    empleado
      ? resolve(empleado)
      : reject(`El empleadop con el id: ${id} no existe`);
  });
};

//GetSalario
const getSalario = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((sal) => sal.id === id)?.salario;

    salario
      ? resolve(salario)
      : reject(`El salario con el id : ${id} no existe`);
  });
};

let nombre;
//Promesas en cadena
getEmpleado(id)
  .then((empleado) => {
    nombre = empleado;
    return getSalario(id);
  })
  .then((salario) =>
    console.log(`El empleado ${nombre} tiene un salario de: ${salario}`)
  )
  .catch((err) => console.log(err));
