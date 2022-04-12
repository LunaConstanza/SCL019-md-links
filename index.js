const path = require('path');
const fs = require('fs');

//Funcion que retorna los archivos.md de un directorio (path)
const filterMDFiles = (pathToFilter) => {
  //LEER CARPETAS
  fs.readdir(pathToFilter, (err, files) => {
    if (err) {
      console.log(err.message);
    } else {
      let mdFiles = files.filter((element) => {
        if (path.extname(element) === ".md") {
          return element;
        } //-------------------------
      });
      console.log(mdFiles);

    }
  });
};

const mdLinks = (inputPath, options) => {

  let filesDirectMD;
  if (fs.lstatSync(inputPath).isDirectory()) {
    // Si es directorio, revisamos existencias de archivos.md
    // filesExtMD = filterMDFiles(inputPath);
    console.log('BIeeeeen');
  } else {
    // Si es un archivo analizamos si es .md o no
    if (path.extname(inputPath) === ".md") {
      filesDirectMD = inputPath;
    }
    else {
      console.log("No existen archivos.md para analizar.");
    }
  };
  console.log('nombre de archivo: ', filesDirectMD);

  // Obtengo la data del archivo.md y extraigo los links
  let dataFiles = fs.readFileSync(filesDirectMD, 'utf8');
  const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

  let arrayLinks = [];
  if (regExp.test(dataFiles) == true) {
    console.log("Existen links para analizar");
    arrayLinks = dataFiles.match(regExp);
  } else {
    console.log("No existen links para analizar");
  }
  console.log('array de links: ', arrayLinks);



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

mdLinks('./README.md')
  //.then( (resolve) => {
    //console.log(resolve);
  //} )
  //.catch( (err) => {
    //console.log(err);
  //} );