
console.log('Inicio de programa');  //1

setTimeout(() => {
    console.log('Primer Timeout')  //3
}, 3000);

setTimeout(() => {
    console.log('Segundo Timeout') //2
}, 0);

setTimeout(() => {
    console.log('Tercer Timeout') //2
}, 0);

console.log('Fin de programa');  //1
