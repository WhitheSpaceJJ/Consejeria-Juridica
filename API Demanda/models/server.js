// Importamos los módulos necesarios
const express = require('express')
const cors = require('cors')
const verify_jwt = require('../middlewares/verify-jwt')
const sequelize = require('../config/db')
const {
  routerOcupacion,
  routerEstadoProcesal,
  routerProcesoJudicial,
  routerJuzgado,
  routerEscolaridad,
  routerEtnia,
  routerImputado,
  routerParticipante,
  routerPromovente,
  routerPrueba,
  routerDomicilioParticipante,
  routerObservacion,
  rouiterResolucion,
  routerFamiliar
  
} = require('../routes')

// Definimos la clase Server
class Server {
  constructor() {
    // Inicializamos la aplicación Express
    this.app = express()
    // Definimos el puerto a partir de las variables de entorno
    this.port = process.env.PORT 
    // Definimos las rutas de la aplicación
    this.paths = {
      ocupacion: '/ocupacion',
      estadoProcesal: '/estado-procesal',
      procesoJudicial: '/proceso-judicial',
      juzgado: '/juzgado',
      escolaridad: '/escolaridad',
      etnia: '/etnia',
      imputado: '/imputado',
      participante: '/participante',
      promovente: '/promovente',
      routerPrueba: '/prueba',
      routerDomicilioParticipante: '/domicilio-participante',
      routerObservacion: '/observacion',
      rouiterResolucion: '/resolucion',
      routerFamiliar: '/familiar'
      
    }
    // Llamamos a los middlewares
    this.middlewares()
    // Conectamos a la base de datos
   //this.conectarBD()
    // Definimos las rutas de la aplicación
    this.routes()
  }

  // Método para conectar a la base de datos
  async conectarBD() {
    await sequelize.sync()
  }

  // Método para definir los middlewares de la aplicación
  middlewares() {
    // Middleware para parsear el cuerpo de las peticiones a JSON
    this.app.use(express.json())
    // Middleware pa ra habilitar CORS
    this.app.use(cors())
  }

  // Método para definir las rutas de la aplicación
  routes() {
    // Definimos cada ruta y le asignamos su router correspondiente
   this.app.use(this.paths.ocupacion, 
      //verify_jwt,
       routerOcupacion)
       this.app.use(this.paths.escolaridad, 
        // verify_jwt, 
         routerEscolaridad)
      this.app.use(this.paths.etnia,
        //  verify_jwt, 
          routerEtnia)
          this.app.use(this.paths.procesoJudicial, /*verify_jwt,*/ routerProcesoJudicial)
          this.app.use(this.paths.juzgado, 
            //verify_jwt,
           routerJuzgado)
      
//A comentar
    this.app.use(this.paths.estadoProcesal,
      // verify_jwt,
      routerEstadoProcesal)
    this.app.use(this.paths.imputado, 
     // verify_jwt, 
      routerImputado)
    this.app.use(this.paths.participante,
      // verify_jwt,
       routerParticipante)
    this.app.use(this.paths.promovente, 
    //  verify_jwt, 
      routerPromovente)
    this.app.use(this.paths.routerPrueba,
      // verify_jwt,
       routerPrueba)
    this.app.use(this.paths.routerDomicilioParticipante,
      // verify_jwt,
       routerDomicilioParticipante)
    this.app.use(this.paths.routerObservacion,
      // verify_jwt,
       routerObservacion)
    this.app.use(this.paths.rouiterResolucion,
      // verify_jwt,
       rouiterResolucion)
    this.app.use(this.paths.routerFamiliar,
      // verify_jwt,
       routerFamiliar)
       
  }

  // Método para iniciar el servidor
  listen() {
    // Iniciamos el servidor en el puerto definido
    this.app.listen(this.port, () => {
      console.log(`El servidor de demandas está corriendo en el puerto 3026`)
    })
  }
}

// Exportamos la clase Server
module.exports = Server
