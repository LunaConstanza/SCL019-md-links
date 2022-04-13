const path = require('path');
const fs = require('fs');
const fun = require('./function.js');

const mdLinks = (inputPath, options) => {

  let filesAbsolute;
  if (fs.lstatSync(inputPath).isDirectory()) {      //si ruta es directorio
    console.log('Tu ruta es un directorio.');
    fun.filesMD(inputPath);                             //Función para analizar directorio
  } else {
    if (path.extname(inputPath) === ".md") {        // Si ruta es archivo.md
      filesAbsolute = [inputPath];
    }
    else {
      console.log("No existen archivos.md para analizar.");   //Si ruta NO es archivo.md
    }
  };

  console.log('Archivos para analizar:', filesAbsolute);

  fun.arrayOfLinks(filesAbsolute);                      //Función para extraer links

  console.log(arrayOfLinks);
};


//return new Promise( ( res, rej ) => {
//} );

//EXTENSION ARCHIVO
//console.log(path.extname("README.js"));

//LEER CARPETAS
//fs.readdir(inputPath, ( err, files ) => {
//if(err){
//console.log(err.message);
//} else {
//console.log(files);
//}
//});

//UNIR RUTAS
//console.log(path.join( __dirname, 'README.md' ));

mdLinks('./')
  //.then( (resolve) => {
    //console.log(resolve);
  //} )
  //.catch( (err) => {
    //console.log(err);
  //} );