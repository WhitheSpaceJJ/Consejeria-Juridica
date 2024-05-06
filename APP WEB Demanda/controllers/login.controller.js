import { ValidationError } from '../lib/errors'
import { validateNonEmptyFields } from '../lib/utils'

class LoginController {
  //Constructor de la clase
  constructor(model) {
    this.model = model
  }

  // Metodo que se encarga de hacer el login
  handleLogin = async () => {
    //Obtenemos el correo y la contraseña del usuario
    const correo = document.getElementById('correo').value
    const password = document.getElementById('password').value
    try {
      //Validamos que los campos no estén vacíos  
      if (!validateNonEmptyFields([correo, password])) {
        throw new ValidationError(
          'Campos obligatorios en blanco, por favor revise.'
        )
      }

      //Llamamos a la función login del modelo
      const user = await this.model.login({ correo, password })
      //En caso de que el login sea exitoso, almacenamos el usuario en el sessionStorage
      sessionStorage.setItem('user', JSON.stringify(user))
      location.replace('index.html')
    } catch (error) {
      //Muestra un mensaje de error en caso de que el login no sea exitoso
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
