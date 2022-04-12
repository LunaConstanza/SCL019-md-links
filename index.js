const path = require('path');
const fs = require('fs');
const { arrayBuffer } = require('stream/consumers');

//Funcion que retorna un array solo con lo archivos .md de un directorio (path)
const filterMDFiles = (pathToFilter) => {
  //LEER CARPETAS
  //const entries = fs.readdir(pathToFilter, { withFileTypes: true });

  fs.readdir(pathToFilter, (err, files) => {

    if (err) {
      console.log(err.message);
    } else {

      let mdFiles = files.filter((element) => {
        if (path.extname(element) === ".md") {
          return element;
        }
      });

      console.log(mdFiles);

      //const recursiveFind = ( routePath) => {
      //const foldercito = fs.readdirSync(routePath);
      //foldercito.reduce( (prev, curr) => {
      ////console.log(curr, fs.statSync(curr).isDirectory());
      //const route = path.join(routePath, curr);
      //if( fs.statSync(route).isDirectory() ) {
      //console.log(route);
      //console.log(prev) ;
      //}
      //} );
      //files.forEach((elem) => {
      //const route = path.join(routePath, elem);
      //console.log(route, fs.statSync(route).isDirectory());
      //if (fs.statSync(route).isDirectory()) {

      //}
      //})
      //};

      //recursiveFind(pathToFilter);

      //let folders = files.filter((file) => {
      //fs.lstat(file, (err, stats) => {
      //if(err){
      //console.log(err.message);
      //};

      //if( stats.isDirectory() ){
      //console.log(file);
      //return file;
      //};
      //})
      //});
      //console.log('FOLDERS:', folders);


      //BUENISIMAAA ------------------
      //-------------------------------------------------------------------------------------------------------
      const getAllFiles = (dir) =>
        fs.readdirSync(dir).reduce((files, file) => {
          const name = path.join(dir, file);
          const isDirectory = fs.statSync(name).isDirectory();
          console.log('fileeees ', [...files])
          return isDirectory ? [...files, ...getAllFiles(name)] : [...files, file];
        }, []);

      const filtraditos = getAllFiles(pathToFilter);

      let mdRecursivos = filtraditos.filter((element) => {
        if (path.extname(element) === ".md") {
          return element;
        }
      });

      console.log(mdRecursivos);
      //-------------------------------------------------------------------------------------------------------

      //const getAllFiles = ( dir ) => 
      //fs.readdirSync(dir).reduce((files, file) => {
      //const name = path.join(dir, file);
      //let holaa = [];
      //if( fs.statSync(name).isDirectory() ){
      //holaa = [...files, ...getAllFiles(name)];
      //} else {
      //holaa = [...files, file];
      //}

      //holaa = holaa.map( (e) => {
      //if ( path.extname(e) === ".md" ) {
      //return element;
      //}
      //} );
      ////console.log(holaa);
      //return holaa;
      //}, []);

      //console.log('Archivos: ', getAllFiles(pathToFilter));
      //BUENISIMAAA ------------------
    }
  });
};

const mdLinks = (inputPath, options) => {

  let filesExtMD;
  if (fs.lstatSync(inputPath).isDirectory()) {
    // Si es directorio, revisamos existencias de archivos.md
    // filesExtMD = filterMDFiles(inputPath);
    console.log('BIeeeeen');
  } else {
    // Si es un archivo analizamos si es .md o no
    if (path.extname(inputPath) === ".md") {
      filesExtMD = inputPath;
    }
    else {
      console.log("No existen archivos.md para analizar.");
    }
  };
  console.log('nombre de archivo: ', filesExtMD);

  // Obtengo la data del archivo md y extraigo los links
  let dataFiles = fs.readFileSync(filesExtMD, 'utf8');
  const regExp = /(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi;
  let arrayLinks = [];
  if (regExp.test(dataFiles) == true){
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