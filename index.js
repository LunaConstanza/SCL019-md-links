const path = require('path');
const fs = require('fs');
const { routeEx, isFolder, extractionFilesMD, fileExtensionMD, extractionLinks, dataLinks } = require('./data');
const color = require('colors');
const gradient = require('gradient-string');

const [termMethod, termPath, termVal1, termVal2] = process.argv.slice(2);

const mdLinks = (inputPath, options) => {
  return new Promise(function (res, rej) {
    if (!routeEx(inputPath)) {
      rej('La ruta ingresada no es válida.')
    }
    let filesAbsolute;
    //si ruta es directorio
    if (isFolder(inputPath)) {
      console.log(color.bold('Tu ruta es un directorio.'));
      //Función para analizar directorio
      filesAbsolute = extractionFilesMD(inputPath);
      console.log(gradient.cristal('Archivos para analizar:'), filesAbsolute);
    }
    else {
      // Si ruta es archivo .md
      if (fileExtensionMD(inputPath)) {
        console.log(color.bold('Tu ruta es un archivo.md'));
        filesAbsolute = [inputPath];
        console.log(gradient.cristal('Archivo para analizar:'), filesAbsolute);
      }
      //Si ruta NO es archivo .md
      else {
        rej(`La ruta ${inputPath} no corresponde a un archivo Markdown.`);
      }
    };
    // Ocupamos la función para extraer links
    let links = extractionLinks(filesAbsolute);
    // Ocupamos la función para extraer data de los links
    let infoLinks = dataLinks(links);
  });
};


// Validación de parámetros por terminal
if (termMethod == 'mdLinks' && termPath && termVal1 == '--validate') {
  mdLinks(termPath, termVal1)
    .then(function (res) {

    })
    .catch((rej) => {
      console.log(color.bold.red(rej));
    })
}
else if (termMethod == 'mdLinks' && termPath && termVal1 == '--stats') {
  mdLinks(termPath, termVal1);
}
// else if (termMethod == 'mdLinks' && termPath && termVal1 == '--validate' && termVal2 == '--stats'||termMethod == 'mdLinks' && termPath && termVal1 == '--stats' && termVal2 == '--validate'){
//   mdLinks(termPath, termVal1)
// }
else {
  console.log('Faltan parametros para analizar.');
}