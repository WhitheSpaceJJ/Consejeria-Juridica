import { ControllerUtils } from '../lib/controllerUtils.js'
import { ValidationError } from '../lib/errors.js'
import { validateNonEmptyFields } from '../lib/utils.js'

class BusquedaTurnarController {
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
  }

  // Metodo que nos ayuda a buscar todas las asesorias relacionadas con respecto a el nombre, apellido paterno y apellido materno
  handleSearch = async inputs => {
    const [nombre, apellidoPaterno, apellidoMaterno] = inputs

    try {
      //Manejo de errores en caso de que los campos esten vacios
      if (nombre === '' && apellidoPaterno === '' && apellidoMaterno === '') {
        throw new ValidationError(
          'Es requerido escribir algun campo(Nombre,Apellido Paterno, Apellido Materno).'
        )

      }

      //Busqueda de asesorias con respecto a los datos proporcionados
      const { asesorias } = await this.model.getAsesoriaByFullName({
        nombre,
        apellidoPaterno,
        apellidoMaterno,
      })

      //Si el resultado es cero se mostrara un modal con el mensaje de que no se encontraron resultados
      if (asesorias === undefined || asesorias === null || asesorias.length === 0) {
        throw new ValidationError(
          'No se encontraron resultados con los datos proporcionados'
        )
      } else {
        if (asesorias.length <= 1) {
          const asesoriaEnviar = asesorias[0];
          const dataColonia = await this.model.getColoniaById(
            asesoriaEnviar.persona.domicilio.id_colonia
          )
          sessionStorage.setItem('asesoria', JSON.stringify(asesoriaEnviar))
          sessionStorage.setItem('colonia', JSON.stringify(dataColonia.colonia))
          location.href = 'turnar.html'
        } else {
          //En caso de que se encuentren resultados se procedera a guardar en el sessionStorage y redirigir a la pagina de asesorias-turnar
          sessionStorage.setItem('asesorias', JSON.stringify(asesorias))
          location.href = 'asesorias-turnar.html'
        }
      }
    } catch (error) {
      //Muestra de modales en caso de errores
      if (error instanceof ValidationError) {
        const modal = document.querySelector('modal-warning')
        modal.message = error.message
        modal.open = true
      } else {
        const modal = document.querySelector('modal-warning')
        modal.message = 'Error al buscar o cero coincidencias, por favor intenta de nuevo'
        modal.open = true
      }
    }
  }
}

export { BusquedaTurnarController }
