import { BusquedaAsesoriaController } from '../controllers/busqueda-asesoria.controller.js'
import { APIModel } from '../models/api.model'
import { BusquedaAsesoriaView } from '../views/busqueda-asesoria.view.js'

const main = () => {
  const model = new APIModel()
  const controller = new BusquedaAsesoriaController(model)
  // eslint-disable-next-line no-unused-vars
  const view = new BusquedaAsesoriaView(controller)
}

main()
