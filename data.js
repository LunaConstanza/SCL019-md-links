const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const color = require('colors');

// FUNCIONES A UTILIZAR

// ¿ruta existe?
const routeEx = inputPath => fs.existsSync(inputPath);

// ¿es directorio?
const isFolder = inputPath => fs.lstatSync(inputPath).isDirectory();

// ¿es archivo?
const isFile = inputPath => fs.lstatSync(inputPath).isFile();

// lectura de directorio
const readFolder = directory => fs.readdirSync(directory, 'utf8');

// filtrar archivos .md por extensión
const fileExtensionMD = file => path.extname(file) === '.md';

// lectura de archivo .md
const readFile = file => fs.readFileSync(file, 'utf8');

// expresión regular para hacer la comparación y extracción de links
const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

// función que lee directorio y retorna los archivos.md
const extractionFilesMD = directory => {
    const dataDirectory = readFolder(directory);
    let arrayFiles = dataDirectory.filter((element) => {
        if (fileExtensionMD(element)) {
            return element;
        }

        // INTENTO DE RECURSIVIDAD
        // if (isFile(element)) {
        //     if (fileExtensionMD(element)){
        //         console.log('archivos md: ', element);               
        //         return element;
        //     }
        // }
        // else {
        //     let recurExFiMD = extractionFilesMD(element);
        //     return arrayFiles.push(...recurExFiMD);
        // }
    });
    return arrayFiles;
};

// función que extrae en un array con links x archivo .md 
const extractionLinks = pathAbsolute => {
    let allLinks = [];
    pathAbsolute.forEach(file => {
        const dataFiles = readFile(file);
        // extracción de links con regExp
        if (regExp.test(dataFiles)) {
            let arLinks = dataFiles.match(regExp);
            console.log(color.bold.cyan(`En ${file} existen ${arLinks.length} links para analizar.`));
            arLinks.forEach(arrayLinks => {
                allLinks.push({
                    'file': file,
                    'href': arrayLinks,
                })
            })
        } else {
            console.log(color.red(`En ${file} no existen links para analizar.`));
        }
    });
    return allLinks;
};

//Función para extraer info de links
const dataLinks = links => {
    const objs = links.map(e => {
        return fetch(e)
            .then((response) => {
                return {
                    file: e.file,
                    // text: ,
                    href: e.href,
                    status: response.status,
                    ok: 'ok',
                }
            })
            .catch((error) => {
                return {
                    file: e.file,
                    // text: ,
                    href: e.href,
                    status: error.status === undefined ? 'No existe status' : error.status,
                    ok: 'fail',
                }
            })
    });
    return Promise.all(objs)
        // .then((response) => {
        //     console.log(response);
        // })
}

// const basicStats = (allLinks) => {
//     const totalLinks = allLinks.length;
//     const fileLinks = allLinks.file;
//     console.log(`Total: ${totalLinks}\nFile: ${fileLinks}`);
// }

module.exports = {
    routeEx,
    isFolder,
    extractionFilesMD,
    fileExtensionMD,
    extractionLinks,
    dataLinks,
    // basicStats,
};