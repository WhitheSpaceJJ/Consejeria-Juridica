import { ControllerUtils } from '../lib/controllerUtils'
import { DataDemanda } from '../components/consultaProceso/data-proceso'

class ConsultaProcesoController {
  //Variables de la clase
  #pagina = 1
  #numeroPaginas
  #busquedaExitosa = false
  #defensores

  //Constructor de la clase
  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
    // this.buttonsEventListeners()
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    //Metodo que se encarga de validar los permisos del usuario
    this.utils.validatePermissions({})
    //this.getNumeroPaginas()
    // this.handleConsultarDemanda()

    //Llamada a la funcion para consultar los procesos
    this.consultarProcesos()
    //Metodo que se encarga de agregar los defensores
    this.agregarDefensores()

    //Establecer los eventos de busqueda
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.handleFiltros();
    });

    //Establecer los eventos de eliminacion de busqueda
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const defensor = document.getElementById('defensor')
      const estatus_proceso = document.getElementById('estatus_proceso')
      defensor.disabled = false
      estatus_proceso.disabled = false
      deleteButton.style.display = 'none'
      defensor.value = '0'
      estatus_proceso.value = '0'
      this.consultarProcesos()

    });
  }

  //Metodo que se encarga de agregar los defensores
  agregarDefensores = async () => {
    //Obtenemos los defensores
    const { defensores } = await this.model.getDefensores()
    this.#defensores = defensores

     //Obtenemos el select de defensores
    const defensor_select = document.getElementById('defensor')
    defensor_select.innerHTML = '';

    // Agregar el primer hijo deseado
    const firstOption = document.createElement('option');
    firstOption.value = '0';
    firstOption.text = 'Selecciona un defensor';
    firstOption.disabled = true;
    firstOption.selected = true;
    defensor_select.appendChild(firstOption);

    // Agregar los defensores al select
    this.#defensores.forEach(defensor => {
      const option = document.createElement('option');
      option.value = defensor.id_defensor;
      option.text = defensor.nombre_defensor;
      defensor_select.appendChild(option);
    });

  }

  //Metodo que se encarga de consultar los procesos
  consultarProcesos = async () => {
    try {
      //Llamada a la funcion para obtener los procesos
      const procesosResponse = await this.model.getProcesosJudiciales()
      //Validamos si hay procesos
      if (procesosResponse.length === 0 || procesosResponse === undefined) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'No hay procesos judiciales para mostrar';
        modal.title = 'Error'
        modal.open = true
      } else {
        //Obtenemos la tabla
        const table = document.getElementById('table-body')
        table.innerHTML = ''
        //Recorremos los procesos y los agregamos a la tabla
        procesosResponse.forEach(proceso => {
          table.appendChild(this.crearRow(proceso))
        })
      }

    } catch (error) {
      //Mostramos un mensaje de error
      console.error('Error:', error.message)
      const modal = document.querySelector('modal-warning');
      modal.message = 'No hay procesos judiciales para mostrar';
      modal.title = 'Error'
      modal.open = true
    }
  }

  handleFiltros = async () => {
     //Obtenemos los elementos
    const defensor = document.getElementById('defensor')
    const estatus_proceso = document.getElementById('estatus_proceso')
    const botonEliminar = document.getElementById('deleteButton')

     //Validamos si el defensor esta deshabilitado
    if (defensor.disabled === false) {

      //Validamos si el defensor es 0
      if (defensor.value === '0') {
        //Mostramos un mensaje de error
        const modal = document.querySelector('modal-warning');
        modal.message = 'Selecciona un defensor';
        modal.title = 'Error'
        modal.open = true
      } else {
        try {
          //Obtenemos la tabla 
          const table = document.getElementById('table-body')
          //Validamos si el estatus del proceso es 0
          if (estatus_proceso.value === '0') {
            //Llamada a la funcion para obtener los procesos por defensor
            await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), null).then(procesosResponse => {
              //Limpiamos la tabla
              table.innerHTML = ''
           
              //Recorremos los procesos y los agregamos a la tabla
              procesosResponse.forEach(proceso => {
                table.appendChild(this.crearRow(proceso))
              })
              //Deshabilitamos el defensor y el estatus del proceso
              defensor.disabled = true
              estatus_proceso.disabled = true
              botonEliminar.style.display = 'block'


            }).catch(error => {
              //Mostramos un mensaje de error
              const modal = document.querySelector('modal-warning');
              modal.message = 'No hay procesos judiciales para el defensor seleccionado';
              modal.title = 'Error'
              modal.open = true
            })

          } else 
          //Validamos si el estatus del proceso es 1
            
          if (estatus_proceso.value === '1') {
            //Llamada a la funcion para obtener los procesos por defensor y estatus
            await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), "EN_TRAMITE")
              .then(procesosResponse => {
                //Limpiamos la tabla
                table.innerHTML = ''
                //Recorremos los procesos y los agregamos a la tabla
                procesosResponse.forEach(proceso => {
                  table.appendChild(this.crearRow(proceso))
                })
                //Deshabilitamos el defensor y el estatus del proceso
                defensor.disabled = true
                estatus_proceso.disabled = true
                botonEliminar.style.display = 'block'
              })
              .catch(error => {
                //Mostramos un mensaje de error
                const modal = document.querySelector('modal-warning');
                modal.message = 'No hay procesos judiciales activos para el defensor seleccionado';
                modal.title = 'Error'
                modal.open = true
              })

          } else 
          
            //Validamos si el estatus del proceso es 2
          if (estatus_proceso.value === '2') {
            try {
              //Llamada a la funcion para obtener los procesos por defensor y estatus
              const procesosResponse = await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), "BAJA")
              //Validamos si hay procesos
              if (procesosResponse.length === 0) {
                //Mostramos un mensaje de error
                const modal = document.querySelector('modal-warning');
                modal.message = 'No hay procesos judiciales en baja para el defensor seleccionado';
                modal.title = 'Error'
                modal.open = true
              } else {
                //Limpiamos la tabla
                table.innerHTML = ''
                //Recorremos los procesos y los agregamos a la tabla
                procesosResponse.forEach(proceso => {
                  table.appendChild(this.crearRow(proceso))
                })
                //Deshabilitamos el defensor y el estatus del proceso
                defensor.disabled = true
                estatus_proceso.disabled = true
                botonEliminar.style.display = 'block'
              }

            } catch (error) {
              //Mostramos un mensaje de error
              const modal = document.querySelector('modal-warning');
              modal.message = 'No hay procesos judiciales en baja para el defensor seleccionado';
              modal.title = 'Error'
              modal.open = true
            }
          } else
           //Validamos si el estatus del proceso es 3
          if (estatus_proceso.value === '3') {
            try {
              //Llamada a la funcion para obtener los procesos por defensor y estatus
              const procesosResponse = await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), "CONCLUIDO")
              //Validamos si hay procesos
              if (procesosResponse.length === 0) {
                //Mostramos un mensaje de error
                const modal = document.querySelector('modal-warning');
                modal.message = 'No hay procesos judiciales concluidos para el defensor seleccionado';
                modal.title = 'Error'
                modal.open = true
              } else {
                //Limpiamos la tabla
                table.innerHTML = ''

                //Recorremos los procesos y los agregamos a la tabla
                procesosResponse.forEach(proceso => {
                  table.appendChild(this.crearRow(proceso))
                })
                //Deshabilitamos el defensor y el estatus del proceso
                defensor.disabled = true
                estatus_proceso.disabled = true
                botonEliminar.style.display = 'block'
              }

            } catch (error) {
              const modal = document.querySelector('modal-warning');
              modal.message = 'No hay procesos judiciales concluidos para el defensor seleccionado';
              modal.title = 'Error'
              modal.open = true
            }
          }


        }
        catch (error) {
          console.error('Error:', error.message)
        }
      }
    }
    else {
      //Mostramos un mensaje de error
      const modal = document.querySelector('modal-warning');
      modal.message = 'Ya se realizo una busqueda, para realizar otra, elimina la anterior';
      modal.title = 'Error'
      modal.open = true
    }
    //   }
  }
  
  //Metodo que se encarga de crear una fila en la tabla
  crearRow = proceso => {
    const row = document.createElement('tr')
    row.classList.add('bg-white', 'border-b', 'hover:bg-gray-50')
    const nombre_defensor = this.#defensores.find(defensor => defensor.id_defensor === proceso.id_defensor)
    row.innerHTML = `<td scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                ${proceso.id_proceso_judicial}
            </td>
            <td class="px-6 py-4">
                ${proceso.fecha_inicio}
            </td>
            <td class="px-6 py-4">
                ${proceso.control_interno}
            </td>
            <td class="px-6 py-4">
                ${proceso.numero_expediente}
            </td>
            <td class="px-6 py-4">
                ${proceso.fecha_estatus === null ? '' : proceso.fecha_estatus}
            </td>
            <td class="px-6 py-4">
                ${proceso.estatus_proceso}
            </td>
            <td class="px-6 py-4">
                ${nombre_defensor.nombre_defensor}
            </td>

          
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta-button font-medium text-[#db2424] hover:underline" data-id="" title="Se realizara de manera similar, al sistema de asesorias">Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta2-button font-medium text-[#db2424] hover:underline" value="" title="Se realizara de manera similar, al sistema de asesorias">Consultar</button>
            </td>`
    return row
  }


}
export { ConsultaProcesoController }
