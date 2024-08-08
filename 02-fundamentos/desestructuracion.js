const deadpoll = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getnombre(){
        return `${this.nombre}${this.apellido}${this.poder}`
    }
}

// console.log(deadpoll.getnombre());

// const nombre = deadpoll.nombre;
// const apellido = deadpoll.apellido;
// const poder = deadpoll.poder;


function imprimeHeroe({nombre, apellido, poder,edad = 34}){

    console.log(nombre,apellido,poder, edad);
}

// imprimeHeroe(deadpoll);


const heroes = ['Deadpool','Superman','Batman'];

// const h1 = heroes[0];


const [h1,h2,h3] = heroes
console.log(h1,h2,h3);