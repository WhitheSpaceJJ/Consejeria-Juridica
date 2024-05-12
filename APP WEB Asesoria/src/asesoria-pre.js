import { AsesoriaPreController } from '../controllers/asesoria-pre.controller'
import { APIModel } from '../models/api.model'
import { AsesoriaPreView } from '../views/asesoria-pre.view'

const main = () => {
  const model = new APIModel()
  const controller = new AsesoriaPreController(model)
  const view = new AsesoriaPreView(controller)
}

main()
