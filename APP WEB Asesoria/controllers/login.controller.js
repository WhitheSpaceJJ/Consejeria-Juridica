import { ValidationError } from '../lib/errors'
import { validateNonEmptyFields } from '../lib/utils'

class LoginController {
  constructor(model) {
    this.model = model
  }

  // Methods
  handleLogin = async () => {
    const correo = document.getElementById('correo').value
    const password = document.getElementById('password').value
    try {
      if (!validateNonEmptyFields([correo, password])) {
        throw new ValidationError(
          'Campos obligatorios en blanco, por favor revise.'
        )
      }

      const user = await this.model.login({ correo, password })
      sessionStorage.setItem('user', JSON.stringify(user))
      location.replace('index.html')
    } catch (error) {
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
