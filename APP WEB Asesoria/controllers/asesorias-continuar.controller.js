import { DataAsesoria } from '../components/asesoria/data-asesoria'
import { ControllerUtils } from '../lib/controllerUtils'

class AsesoriasContinuarController {
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
  }

  //Metodo que nos ayuda a cargar las asesorias en la tabla
  handleDOMContentLoaded = () => {
    this.utils.validatePermissions({})
    //Llamada a la funcion que se encarga de cargar las asesorias
    this.handleAgregarAsesorias()
    //Se agregan las funciones al window para poder ser llamadas desde el html
    window.handleConsultarAsesoriasById = this.handleConsultarAsesoriasById
    window.handleContinuarAsesoriasById = this.handleContinuarAsesoriasById
  }
  //Metodo que se encarga de agregar las asesorias a la tabla
  handleAgregarAsesorias = async () => {
    const table = document.getElementById('table-body')
    const asesorias = JSON.parse(sessionStorage.getItem('asesorias-continuacion'))
    //Caso contrario se procedera a agregar las asesorias a la tabla
    asesorias.forEach(asesoria => {
      if (asesoria === null) return
      table.appendChild(this.crearRow(asesoria))
    })
  }

  //Este metodo se encarga de consultar una asesoria por su id y se procede a mostrar en un modal de los datos de la asesoria 
  //esto con el fin de que el usuario pueda ver los datos de la asesoria antes de pasar a turnar la asesoria

  handleConsultarAsesoriasById = async id => {
    try {
      const button = document.querySelector('.consulta-button')
      button.disabled = true
      //Se obtiene la asesoria por su id
      const asesoria = await this.model.getAsesoriaById(id)
      const persona = asesoria.asesoria.persona
      //Se obtiene la colonia por su id
      const domicilio = await this.model.getColoniaById(
        persona.domicilio.id_colonia
      )
      //Se procede a guardar en el sessionStorage los datos de la asesoria y la colonia
      const modal = document.querySelector('modal-asesoria')
      //Se crea un componente de asesoria con los datos de la asesoria y la colonia
      const dataAsesoria = new DataAsesoria(asesoria, domicilio)

      //Se procede a mostrar el modal con los datos de la asesoria
      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      //Se agrega el evento onClose al modal
      modal.addEventListener('onClose', handleModalClose)

      //Se procede a agregar los datos de la asesoria al modal
      const modalContent = modal.shadowRoot.getElementById('modal-content')
      //Se agrega el componente de asesoria al modal
      modalContent.appendChild(dataAsesoria)

      //Se procede a abrir el modal
      modal.title = 'Datos Asesoría'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  //Metodo que se encarga de redirigir a la pagina de continuar
  handleContinuarAsesoriasById = async id => {
    try {
      const asesorias = JSON.parse(sessionStorage.getItem('asesorias-continuacion'))
      //Se obtiene la asesoria por su id
      const asesoria = asesorias.find(asesoria => {
        if (asesoria === null) return false
        return asesoria.datos_asesoria.id_asesoria === Number(id)
      })
      //Se obtiene la colonia por su id
      const dataColonia = await this.model.getColoniaById(
        asesoria.persona.domicilio.id_colonia
      )

      //Se procede a guardar en el sessionStorage los datos de la asesoria y la colonia
      sessionStorage.setItem('asesoria-continuacion', JSON.stringify(asesoria))
      sessionStorage.setItem('colonia-continuacion', JSON.stringify(dataColonia.colonia))
      //Se redirige a la pagina de turnar
      location.href = 'continuar-asesoria.html'
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  //Metodo que se encarga de crear una fila en la tabla de asesorias
  crearRow = asesoria => {
    const row = document.createElement('tr')
    row.classList.add('bg-white', 'border-b', 'hover:bg-gray-50')
    row.innerHTML = `<td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                ${asesoria.datos_asesoria.id_asesoria}
            </td>
            <td class="px-6 py-4">
                ${asesoria.persona.nombre} ${asesoria.persona.apellido_paterno} ${asesoria.persona.apellido_materno}
            </td>
            <td class="px-6 py-4">
                ${asesoria.tipos_juicio.tipo_juicio}
            </td>
            <td class="px-6 py-4">
                ${asesoria.datos_asesoria.resumen_asesoria}
            </td>
            <td class="px-6 py-4">
                ${asesoria.datos_asesoria.usuario}
            </td>
            <td class="px-6 py-4">
            ${asesoria.datos_asesoria.estatus_asesoria}
        </td>
     
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta-button font-medium text-[#db2424] hover:underline" onclick="handleConsultarAsesoriasById(this.value)" value="${asesoria.datos_asesoria.id_asesoria}">Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="turnar-button font-medium text-[#db2424] hover:underline" onclick="handleContinuarAsesoriasById(this.value)" value="${asesoria.datos_asesoria.id_asesoria}">Cotinuar</button>
            </td>`

    return row
  }

}

export { AsesoriasContinuarController }
