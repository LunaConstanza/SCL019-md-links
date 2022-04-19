// FUNCIONES A TESTEAR
const {mdLinks} = require('../index');
const {routeEx, isFolder, fileExtensionMD, extractionFilesMD, extractionLinks, dataLinks} = require('../data')

// DATA A UTILIZAR
const pathErronea = './package.jn';
const pathRelative = './';
const pathAbsolute = './README.md';
const pathPrueba = './prueba1.md';
const arrayLinks = [
  {
    file: './prueba1.md',
    href: 'https://es.wikipedia.org/wiki/Markdown)'
  },
  { file: './prueba1.md', href: 'https://nodejs.org/)' },
  {
    file: './prueba1.md',
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)'
  }
];
const validateLinks = [
  {
    file: './prueba1.md',
    href: 'https://es.wikipedia.org/wiki/Markdown)',
    status: 404,
    ok: 'ok'
  },
  {
    file: './prueba1.md',
    href: 'https://nodejs.org/)',
    status: 404,
    ok: 'ok'
  },
  {
    file: './prueba1.md',
    href: 'https://user-images.githubusercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg)',
    status: 403,
    ok: 'ok'
  }
];

// INICIO DE TESTS
// TEST FUNCIÓN ROUTEEX
describe('La función routeEx verifica si la ruta existe.', () =>{
  it('Debería retornar una función', () => {
    expect(typeof routeEx).toBe('function');
  });
  it ('Deberia retornar false si la ruta no existe', () => {
    expect(routeEx(pathErronea)).toBe(false);
  })
})

// TEST FUNCIÓN ISFOLDER
describe('La función isFolder verifica si la ruta es directorio.', () =>{
  it('Debería retornar una función', () => {
    expect(typeof isFolder).toBe('function');
  });
  it ('Deberia retornar true si la ruta es directorio', () => {
    expect(isFolder(pathRelative)).toBe(true);
  })
  it ('Deberia retornar false si la ruta no es directorio', () => {
    expect(isFolder(pathAbsolute)).toBe(false);
  })
})

// TEST FUNCIÓN FILEEXTENSIONMD
describe('La función fileExtensionMD verifica si el archivo tiene la extensión .md', () =>{
  it('Debería retornar una función', () => {
    expect(typeof fileExtensionMD).toBe('function');
  });
  it ('Deberia retornar true si el archivo es .md', () => {
    expect(fileExtensionMD(pathAbsolute)).toBe(true);
  })
})

// TEST FUNCIÓN EXTRACTIONFILESMD
describe('La función extractionFilesMD extrae los archivos .md de un directorio.', () =>{
  it('Debería retornar una función', () => {
    expect(typeof extractionFilesMD).toBe('function');
  });
  it ('Deberia retornar un array con los archivos .md', () => {
    let arrayFiles = extractionFilesMD(pathRelative);
    expect(arrayFiles[0]).toEqual('prueba0.md');
    expect(arrayFiles[1]).toEqual('README.md');
  })
})

// TEST FUNCIÓN EXTRACTIONLINKS
describe('La función extractionLinks extrae los links de un archivo .md y devuelve un array con las propiedades: href y file.', () =>{
  it('Debería retornar una función', () => {
    expect(typeof extractionLinks).toBe('function');
  });
  it ('Deberia retornar un array con los archivos .md', () => {
    expect(extractionLinks(pathPrueba)).toEqual(arrayLinks);
  })
})

// TEST FUNCIÓN DATALINKS
describe('La función dataLinks valida los links en ok y fail + su status.', () =>{
  it('Debería retornar una función', () => {
    expect(typeof dataLinks).toBe('function');
  });
  it ('Deberia retornar un array con los archivos .md', () => {
    expect(dataLinks(pathPrueba)).toEqual(validateLinks);
  })
})

// TEST FUNCIÓN MDLINKS
describe('la funcion mdLinks según su 2do parametro devuelve la data/stats de los links.', () => {
  it('Debería retornar una función', () => {
    expect(typeof mdLinks).toBe('function');
  });
  it('Debería retornar los links con las propiedades href y file.', () => {
    expect(mdLinks(pathPrueba)).toEqual(arrayLinks);
  });
  it('Debería retornar los links con las propiedades href y file.', () => {
    expect(mdLinks(pathPrueba, '--stats')).toEqual('Existen 3 links en total.');
  });
  it('Debería retornar los links con las propiedades href y file.', () => {
    expect(mdLinks(pathPrueba, '--validate')).toEqual(validateLinks);
  });
});
