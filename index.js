const path = require('path');
const fs = require('fs');
const funMD = require('./functionMD.js');
const color = require('colors');
const gradient = require('gradient-string');

const mdLinks = (inputPath, options) => {

  let filesAbsolute;
  if (fs.lstatSync(inputPath).isDirectory()) {      //si ruta es directorio
    console.log(color.bold('Tu ruta es un directorio.'));
    filesAbsolute = funMD.filesMD(inputPath);                             //Función para analizar directorio
  } else {
    if (path.extname(inputPath) === ".md") {        // Si ruta es archivo.md
      console.log(color.bold('Tu ruta es un archivo.md'));
      filesAbsolute = [inputPath];
    }
    else {
      console.log(color.bold.red("No existen archivos.md para analizar."));   //Si ruta NO es archivo.md
    }
  };

  console.log(gradient.cristal('Archivos para analizar:'), filesAbsolute);

  funMD.arrayLinks(filesAbsolute);                      //Función para extraer links

};


//return new Promise( ( res, rej ) => {
//} );

//UNIR RUTAS
//console.log(path.join( __dirname, 'README.md' ));

mdLinks('./')
  //.then( (resolve) => {
    //console.log(resolve);
  //} )
  //.catch( (err) => {
    //console.log(err);
  //} );