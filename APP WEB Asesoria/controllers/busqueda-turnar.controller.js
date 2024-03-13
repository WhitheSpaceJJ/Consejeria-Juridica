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

  // Methods
  handleSearch = async inputs => {
    const [nombre, apellidoPaterno, apellidoMaterno] = inputs

    try {
      if (nombre === '' && apellidoPaterno === '' && apellidoMaterno === '') {
        throw new ValidationError(
          'Es requerido escribir algun campo(Nombre,Apellido Paterno, Apellido Materno).'
        )

      }

      const { asesoria } = await this.model.getAsesoriaByFullName({
        nombre,
        apellidoPaterno,
        apellidoMaterno,
      })

      sessionStorage.setItem('asesorias', JSON.stringify(asesoria))
      location.href = 'asesorias-turnar.html'
    } catch (error) {
      if (error instanceof ValidationError) {
        const modal = document.querySelector('modal-warning')
        modal.message = error.message
        modal.open = true
      } else {
        const modal = document.querySelector('modal-warning')
        modal.message = 'Error al buscar, por favor intenta de nuevo'
        modal.open = true
      }
    }
  }
}

export { BusquedaTurnarController }
