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

const getEmpleadoByID = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;

    empleado ? resolve(empleado) : reject(`No existe empleado con id ${id}`);
  });
};

const getSalarioByID = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;

    salario
      ? resolve(salario)
      : reject(`No existe salario para el empleado con el id ${id}`);
  });
};

const getInfoUsuario = async (id) => {
  try {
    const empleado = await getEmpleadoByID(id);
    const salario = await getSalarioByID(id);

    return `El empleado ${empleado} tiene un salario de ${salario}`;
  } catch (e) {
    throw e;
  }
};

getInfoUsuario(id)
  .then((msg) => console.log(msg))
  .catch((e) => console.log(e));
