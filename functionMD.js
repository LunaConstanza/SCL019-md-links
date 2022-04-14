const path = require('path');
const fs = require('fs');
const color = require('colors');

//Función que lee directorio y retorna los archivos.md
function filesMD(iPath) {
    const readDirectory = fs.readdirSync(iPath, 'utf8');
    const arrayFiles = readDirectory.filter((file) => {
        if (path.extname(file) === ".md") {
            return file;
        }                                                     // podria crear bucle con iteración(?)
        // else if (path.extname(file) === "") {
        //     if (fs.lstatSync(file).isDirectory()) {
        //         return filesMD(file);
        //     }
        // }
    });
    return arrayFiles;
};

//Función que extrae los link de los archivos.md
function arrayOfLinks(pathAbsolute) {
    pathAbsolute.map(function (file) {

        //expresión regular para hacer la comparación con links
        const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

        let dataFiles = fs.readFileSync(file, 'utf8');        // Obtengo la data del archivo.md
        let arrayLinks = [];
        if (regExp.test(dataFiles) == true) {                 // extracción de links con regExp
            arrayLinks = dataFiles.match(regExp);
            console.log(color.bold.cyan('En "', file, '" sí existen links para analizar.'));
            return arrayLinks;
        } else {
            console.log(color.red('En "', file, '" no existen links para analizar.'));
        }
    });
};

exports.filesMD = filesMD;
exports.arrayLinks = arrayOfLinks;