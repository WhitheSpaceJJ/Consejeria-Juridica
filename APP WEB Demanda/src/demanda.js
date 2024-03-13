import { DemandaController   } from '../controllers/demanda.controller'
import { APIModel } from '../models/api.model'
import { DemandaView } from '../views/demanda.view'

const main = () => {
  const model = new APIModel()
  const controller = new DemandaController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new DemandaView(controller)
}

main()
