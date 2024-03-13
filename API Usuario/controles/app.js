
/*
const bcrypt = require('bcrypt');

// Función para generar el hash usando Bcrypt
const generarHash = async (cadena) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(cadena, saltRounds);
    return hash;
  } catch (error) {
    console.error('Error al generar el hash:', error);
  }
};

// Arreglo de cadenas
const cadenas = Array.from({ length: 12 }, (_, i) => `defensoria${i + 1}`);

// Generar hashes para cada cadena
Promise.all(cadenas.map(cadena => generarHash(cadena)))
  .then(hashes => {
    cadenas.forEach((cadena, index) => {
      console.log(`Hash para "${cadena}": ${hashes[index]}`);
    });
  });
  */
  const bcrypt = require('bcrypt');

  // Cadena original
  const cadenaOriginal = 'defensoria7';
  
  // Hash previamente generado (sustituye esto con el hash real)
  const hashGuardado = '$2b$10$oUdUm3X/OdCaJiArEeI3BexTSF0ZkeKPY0u3dnUhMWPfrvyLspVzC';
  
  // Comprobar el hash
  bcrypt.compare(cadenaOriginal, hashGuardado)
    .then(esCorrecto => {
      if (esCorrecto) {
        console.log('La cadena es correcta.');
      } else {
        console.log('La cadena no coincide.');
      }
    })
    .catch(error => {
      console.error('Error al comparar el hash:', error);
    });