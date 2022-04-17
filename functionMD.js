const path = require('path');
const fs = require('fs');
// const axios = require('axios').default;
const fetch = require('node-fetch');
const color = require('colors');

//Función que lee directorio y retorna los archivos.md
function filesMD(iPath) {
    const readDirectory = fs.readdirSync(iPath, 'utf8');
    let arrayFiles = readDirectory.filter((file) => {
        if (path.extname(file) === ".md") {
            return file;
        }
        // Queeee hago !? no funciona el bucle T.T ------------------------
        // (fs.lstatSync(file).isDirectory()) ? filesMD(file) : bdv
         
        // } // Hasta aqui, lo de arriba no funciona :c ---------------------
    });
    return arrayFiles;
};

//Función que extrae los link de los archivos.md
function extractLinks(pathAbsolute) {
    const arrayOfLinks = pathAbsolute.map(function (file) {
        
        //expresión regular para hacer la comparación con links
        const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;
        
        let dataFiles = fs.readFileSync(file, 'utf8');        // Obtengo la data del archivo.md
        if (regExp.test(dataFiles)) {                 // extracción de links con regExp
            console.log(color.bold.cyan('En "', file, '" sí existen links para analizar. Son'));
            dataLinks(dataFiles.match(regExp));
        } else {
            console.log(color.red('En "', file, '" no existen links para analizar.'));
        }
    });
};

const dataLinks = (links) => {
    const objs = links.map((e) =>{
        return fetch(e)
        .then((response)=>{
            return {
                href: e,
                // text: ,
                // file: ,
                status: response.status,
                ok: (response.status===200) ? 'ok' : 'fail',
            }
        })
        .catch((error)=>{
            return {
                href: e,
                // text: ,
                // file: ,
                status: (error.status==='undefined') ? 'No existe status' : error.status,
                ok: 'fail',
            }
        })
    });
    Promise.all(objs)
    .then((response)=>{
        console.log(response);
    })
}

module.exports = {
    filesMD,
    extractLinks,
};