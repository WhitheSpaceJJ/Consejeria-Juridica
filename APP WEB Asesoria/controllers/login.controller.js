import { validateNonEmptyFields } from '../lib/utils.js'
import { ValidationError } from '../lib/errors.js'

class LoginController {
  constructor(model) {
    this.model = model
  }

  // Metodo que se enc arga de manejar el login
  handleLogin = async () => {
    const correo = document.getElementById('correo').value
    const password = document.getElementById('password').value
    try {
      if (!validateNonEmptyFields([correo, password])) {
        throw new ValidationError(
          'Campos obligatorios en blanco, por favor revise.'
        )
      }
      //Aqui en este caso se procedera a cambiar el assets del navbar con respecto a los permisos del usuario
      const user = await this.model.login({ correo, password })
      sessionStorage.setItem('user', JSON.stringify(user))
      location.replace('index.html')
    } catch (error) { 
      console.error(error.message)
      //Aqui se manejan los errores que se puedan presentar
      if (error instanceof ValidationError) {
        const modal = document.querySelector('modal-warning')
        modal.message = error.message
        modal.open = true
      } else {
        const modal = document.querySelector('modal-warning')
        modal.message = 'Las credenciales no son válidas, intente de nuevo.'
        modal.open = true
      }
    }
  }
}

export { LoginController }
