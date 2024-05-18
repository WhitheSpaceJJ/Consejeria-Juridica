import { AsesoriasContinuarController } from '../controllers/asesorias-continuar.controller'
import { APIModel } from '../models/api.model'
import { AsesoriasContinuarView } from '../views/asesorias-continuar.view'

const main = () => {
  const model = new APIModel()
  const controller = new AsesoriasContinuarController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new AsesoriasContinuarView(controller)
}

main()
