const path = require('path');
const fs = require('fs');

const mdLinks = (inputPath, options) => {

  let filesAbsolute;
  if (fs.lstatSync(inputPath).isDirectory()) {
    // Si es directorio, revisamos existencias de archivos.md
    console.log('Es un directorio');

    //Función que lee directorio y retorna los archivos.md
    const filesMD = (input) => {
      const readDirectory = fs.readdirSync(input, 'utf8');
      filesAbsolute = readDirectory.filter((file) => {
        if (path.extname(file) === ".md") {
          return file;
        }
      });
      // readDirectory.filter((file2) => {
      //   if (fs.lstatSync(file2).isDirectory()) {
      //     filesMD(file2);
      //   }
      // });
      console.log('EXTRACCIÓN: ', filesAbsolute);
    };
    filesMD(inputPath);

  } else {
    // Si es un archivo analizamos si es .md o no
    if (path.extname(inputPath) === ".md") {
      filesAbsolute = inputPath;
    }
    else {
      console.log("No existen archivos.md para analizar.");
    }
    console.log('nombre de archivo: ', filesAbsolute);
  };





  console.log('archivos:', filesAbsolute);




  for (let i = 0; i < filesAbsolute.length; i++) {            // CAMBIAR A .MAP

    // Obtengo la data del archivo.md y extraigo los links -------------------
    let dataFiles = fs.readFileSync(filesAbsolute[i], 'utf8');

    const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;

    let arrayLinks = [];
    if (regExp.test(dataFiles) == true) {
      console.log("Existen links para analizar");
      arrayLinks = dataFiles.match(regExp);
    } else {
      console.log("No existen links para analizar");
    }
    console.log('array de links: ', arrayLinks);

  }



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