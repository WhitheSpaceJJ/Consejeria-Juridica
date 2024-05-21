// Importamos los módulos necesarios
const express = require('express')
const cors = require('cors')
const verify_jwt = require('../middlewares/verify-jwt')
const sequelize = require('../config/db')
const {
  routerOcupacion,
  routerEstadoProcesal,
   routerProcesoJudicial, 
   routerJuzgado, routerEscolaridad,
    routerEtnia,
 
     routerPrueba, 
routerObservacion,   rouiterResolucion, routerFamiliar 
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

      procesoJudicial: '/proceso-judicial', juzgado: '/juzgado', 
      escolaridad: '/escolaridad',etnia: '/etnia', ocupacion: '/ocupacion', 
     routerPrueba: 
       '/prueba',     estadoProcesal: '/estado-procesal', 
       routerObservacion: '/observacion',routerResolucion: '/resolucion',
       routerFamiliar: '/familiar'
    }
    // Llamamos a los middlewares
    this.middlewares()
    // Conectamos a la base de datos de MySQL, si se requiere cambios en el modelo descomentar la linea siguiente
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
          this.app.use(this.paths.procesoJudicial, 
            /*verify_jwt,*/
             routerProcesoJudicial)
          this.app.use(this.paths.juzgado, 
            //verify_jwt,
           routerJuzgado)
      
//A comentar ya que no se usan
    this.app.use(this.paths.estadoProcesal,
      // verify_jwt,
      routerEstadoProcesal)

    this.app.use(this.paths.routerPrueba,
      // verify_jwt,
       routerPrueba)

    this.app.use(this.paths.routerObservacion,
      // verify_jwt,
       routerObservacion)
    this.app.use(this.paths.routerResolucion,
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
      console.log(`El servidor de demandas está corriendo en el puerto ` + this.port)
    })
  }
}

// Exportamos la clase Server
module.exports = Server
