const { routeEx, isFolder, extractionFilesMD, fileExtensionMD, extractionLinks, dataLinks } = require('./data');
const color = require('colors');

const mdLinks = (inputPath, options) => {
  return new Promise(function (res, rej) {
    if (!routeEx(inputPath)) {
      rej('La ruta ingresada no es válida.')
    }
    // FILTRAMOS SI ES DIRECTORIO(RELATIVA) O ARCHIVO(ABSOLUTO)
    let filesAbsolute;
    //si ruta es directorio
    if (isFolder(inputPath)) {
      console.log(color.bold('Tu ruta es un directorio.'));
      //Función para analizar directorio
      filesAbsolute = extractionFilesMD(inputPath);
    }
    else {
      // Si ruta es archivo .md
      if (fileExtensionMD(inputPath)) {
        console.log(color.bold('Tu ruta es un archivo.md'));
        filesAbsolute = [inputPath];
      }
      //Si ruta NO es archivo .md
      else {
        rej(`La ruta ${inputPath} no corresponde a un archivo Markdown.`);
      }
    };

    // Ocupamos la función para extraer links sin validar según la ruta absoluta (archivos.md)
    const links = extractionLinks(filesAbsolute);

    // Ocupamos la función para extraer data de validación de todos los links
    const dataAllLinksValidate = dataLinks(links);

    if (options === undefined) {
      res(links)
    }
    else if (options === '--validate') {
      res(dataAllLinksValidate);
    }
    else if (options === '--stats'){
      res(`Existen ${links.length} links en total.`);
    }
  });
};

module.exports = {
  mdLinks,
};