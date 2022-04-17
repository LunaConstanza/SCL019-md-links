const path = require('path');
const fs = require('fs');
const { filesMD, extractLinks } = require('./functionMD');
const color = require('colors');
const gradient = require('gradient-string');

const [termMethod, termPath, termVal1, termVal2 ] = process.argv.slice(2);

const mdLinks = (inputPath, options) => {
  return new Promise(function(res, rej){
    if (!fs.existsSync(inputPath)){
      rej('La ruta ingresada no es valida.')
    }
    let filesAbsolute;
    if (fs.lstatSync(inputPath).isDirectory()) {      //si ruta es directorio
      console.log(color.bold('Tu ruta es un directorio.'));
      filesAbsolute = filesMD(inputPath);             //Función para analizar directorio
      console.log(gradient.cristal('Archivos para analizar:'), filesAbsolute);
    } else {
      if (path.extname(inputPath) === ".md") {        // Si ruta es archivo.md
        console.log(color.bold('Tu ruta es un archivo.md'));
        filesAbsolute = [inputPath];
        console.log(gradient.cristal('Archivo para analizar:'), filesAbsolute);
      }
      else {
        rej("La ruta ingresada no corresponde a un archivo Markdown.");   //Si ruta NO es archivo.md
      }
    };
  
    extractLinks(filesAbsolute);                      //Función para extraer links

  });
};


// Validación de parámetros por terminal
if (termMethod == 'mdLinks' && termPath && termVal1 == '--validate'){
  mdLinks(termPath, termVal1)
  .then(function(res){

  })
  .catch((rej) => {
    console.log(color.bold.red(rej));
  })
}
else if (termMethod == 'mdLinks' && termPath && termVal1 == '--stats'){
  mdLinks(termPath, termVal1);
}
// else if (termMethod == 'mdLinks' && termPath && termVal1 == '--validate' && termVal2 == '--stats'||termMethod == 'mdLinks' && termPath && termVal1 == '--stats' && termVal2 == '--validate'){
//   mdLinks(termPath, termVal1)
// }
else {
  console.log('Faltan parametros para analizar.');
}

// mdLinks(parametros[2])
//.then( (resolve) => {
  //console.log(resolve);
  //} )
  //.catch( (err) => {
    //console.log(err);
    //} );


    
    //return new Promise( ( res, rej ) => {
    //} );
    
    //UNIR RUTAS
    //console.log(path.join( __dirname, 'README.md' ));

