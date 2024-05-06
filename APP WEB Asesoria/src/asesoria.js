import { AsesoriaController } from '../controllers/asesoria.controller'
import { APIModel } from '../models/api.model'
import { AsesoriaView } from '../views/asesoria.view'

const main = () => {
  const model = new APIModel()
  const controller = new AsesoriaController(model)
  const view = new AsesoriaView(controller)
}

main()
