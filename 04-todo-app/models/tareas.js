import { Tarea } from "./tarea.js";

// Tareas {
//     _listado: {
//       '9fd589d3f7': Tarea { id: '9fd589d3f7', desc: 'Matarse', completadoEn: null }
//     }
//   }

export class Tareas {
  _listado = {};
  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }
  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }
}
