import { ConsultaDemandaController } from '../controllers/consulta-demanda.controller'
import { APIModel } from '../models/api.model'
import { ConsultaDemandaView } from '../views/consulta-demanda.view'

const main = () => {
  const model = new APIModel()
  const controller = new ConsultaDemandaController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new ConsultaDemandaView(controller)
}

main()
