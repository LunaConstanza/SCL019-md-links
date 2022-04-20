#!/usr/bin/env node

const { mdLinks } = require('./index');
const color = require('colors');
const gradient = require('gradient-string');

const [termMethod, termPath, termVal1, termVal2] = process.argv.slice(2);

// Validación de parámetros por terminal
if (termMethod == 'mdLinks' && termPath && termVal1 == undefined) {
    mdLinks(termPath)
    .then(res => {
        console.log(res);
    })
    .catch(rej => {
        console.log(rej);
    })
}
else if (termMethod == 'mdLinks' && termPath && termVal1 == '--validate') {
    mdLinks(termPath, termVal1)
        .then(res => {
            console.log(res);
        })
        .catch(rej => {
            console.log(color.bold.red(rej));
        })
}
else if (termMethod == 'mdLinks' && termPath && termVal1 == '--stats') {
    mdLinks(termPath, termVal1)
        .then(res => {
            console.log(gradient.cristal(res));
        })
        .catch(rej => {
            console.log(color.bold.red(rej));
        })
}
// else if (termMethod == 'mdLinks' && termPath && termVal1 == '--validate' && termVal2 == '--stats'||termMethod == 'mdLinks' && termPath && termVal1 == '--stats' && termVal2 == '--validate'){
//   mdLinks(termPath, termVal1)
// }
else {
    console.log(color.bold.red('Error en los parámetros utilizados.'));
}