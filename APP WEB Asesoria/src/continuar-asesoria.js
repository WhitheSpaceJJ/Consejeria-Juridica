import { AsesoriaContinuarController } from '../controllers/continuar-asesoria.controller'
import { APIModel } from '../models/api.model'
import { AsesoriaContinuacionView } from '../views/continuar-asesoria.view'

const main = () => {
  const model = new APIModel()
  const controller = new AsesoriaContinuarController(model)
  const view = new AsesoriaContinuacionView(controller)
}

main()
