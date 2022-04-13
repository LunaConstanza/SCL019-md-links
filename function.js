const path = require('path');
const fs = require('fs');
//Función que lee directorio y retorna los archivos.md
const filesMD = (iPath) => {
    const readDirectory = fs.readdirSync(iPath, 'utf8');
    filesAbsolute = readDirectory.filter((file) => {
        if (path.extname(file) === ".md") {
            return file;
        }                                                     // podria crear bucle con iteración(?)
    });
    // readDirectory.filter((file2) => {
    //   if (fs.lstatSync(file2).isDirectory()) {
    //     filesMD(file2);
    //   }
    // });
};

//Función que extrae los link de los archivos.md
const arrayOfLinks = (pathAbsolute) => {
    pathAbsolute.map(function (file) {

        //expresión regular para hacer la comparación con links
        const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

        let dataFiles = fs.readFileSync(file, 'utf8');        // Obtengo la data del archivo.md
        let arrayLinks = [];
        if (regExp.test(dataFiles) == true) {                 // extracción de links con regExp
            arrayLinks = dataFiles.match(regExp);
            console.log('En "', file, '" sí existen links para analizar. Links:', arrayLinks);
        } else {
            console.log('En "', file, '" no existen links para analizar.');
        }
    });
};
module.exports = filesMD();
module.exports = arrayOfLinks();