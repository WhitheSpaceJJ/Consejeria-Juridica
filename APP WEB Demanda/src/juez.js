import { JuezController   } from '../controllers/juez.controller'
import { APIModel } from '../models/api.model'
import { JuezView } from '../views/juez.view'

const main = () => {
  const model = new APIModel()
  const controller = new JuezController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new JuezView(controller)
}

main()
