import { ControllerUtils } from '../lib/controllerUtils'
import { DataAsesoria } from '../components/consultaProceso/data-asesoria'
import { DataPrueba } from '../components/consultaProceso/data-prueba'
import { DataDemandado } from '../components/consultaProceso/data-demandado'
import { DataPromovente } from '../components/consultaProceso/data-promovente'
import { DataEstadosProcesales } from '../components/consultaProceso/data-estados-procesales'

class ConsultaProcesoController {
 //Variables privadas
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
    this.utils.validatePermissions({})
    //this.getNumeroPaginas()
    // this.handleConsultarDemanda()
    //Se consulta los procesos judiciales
    this.consultarProcesos()
    //Se agregan los defensores al select
    this.agregarDefensores()
     
    //Se agregan los eventos a los botones
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.handleFiltros();
    });
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
 
  //Metodo para agregar los defensores
  agregarDefensores = async () => {
    const { defensores } = await this.model.getDefensores()
    this.#defensores = defensores
    const defensor_select = document.getElementById('defensor')
    defensor_select.innerHTML = '';

    // Agregar el primer hijo deseado
    const firstOption = document.createElement('option');
    firstOption.value = '0';
    firstOption.text = 'Selecciona un defensor';
    firstOption.disabled = true;
    firstOption.selected = true;
    defensor_select.appendChild(firstOption);

    this.#defensores.forEach(defensor => {
      const option = document.createElement('option');
      option.value = defensor.id_defensor;
      option.text = defensor.nombre_defensor;
      defensor_select.appendChild(option);
    });

  }

  //Metodo para consultar los procesos judiciales
  consultarProcesos = async () => {
    try {
      const procesosResponse = await this.model.getProcesosJudiciales()
      if (procesosResponse === undefined || procesosResponse===null || procesosResponse.length === 0) {
        const modal = document.querySelector('modal-warning');
        modal.message = 'No hay procesos judiciales para mostrar';
        modal.title = 'Error'
        modal.open = true
      } else {
        const table = document.getElementById('table-body')
        table.innerHTML = ''
        procesosResponse.forEach(proceso => {
          table.appendChild(this.crearRow(proceso))
        })
      }

    } catch (error) {
      console.error('Error:', error.message)
      const modal = document.querySelector('modal-warning');
      modal.message = 'No hay procesos judiciales para mostrar';
      modal.title = 'Error'
      modal.open = true
    }
  }
 
  //Metodo para consultar la asesoria por id
  handleConsultarAsesoriaById = async id => {
    try {
      const button = document.querySelector('.consulta-button')
      button.disabled = true
      const proceso = await this.model.getProcesoJudicialById(id)
      const idTurno = proceso.id_turno
      const turno = await this.model.getTurno(idTurno)
      const asesoria = await this.model.getAsesoriaById(turno.turno.asesoria.datos_asesoria.id_asesoria)

      const modal = document.querySelector('modal-asesoria')
      const dataAsesoria = new DataAsesoria(asesoria)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataAsesoria)

      modal.title = 'Datos Asesoría'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

   //Metodo para consultar el demandado
  handleConsultarDemandado = async id => {
    try {
      const button = document.querySelector('.consulta2-button')
      button.disabled = true
      const proceso = await this.model.getProcesoJudicialById(id)
      console.log(proceso.participantes[1])
      for (var i = 0; i <= ((proceso.participantes).length)-1; i++) {
        if(proceso.participantes[i].demandado!=null) {
          this.modalDemandado(proceso.participantes[i])
        }
      }
      
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
 
  //Metodo para abrir el modal del demandado
  modalDemandado = async demandado =>{
    try {
      const button = document.querySelector('.consulta2-button')
      button.disabled = true
      const modal = document.querySelector('modal-demandado')
      const dataDemandado = new DataDemandado(demandado)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataDemandado)

      modal.title = 'Datos Demandado'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  //Metodo para consultar el promovente
  handleConsultarPromovente = async id => {
    try {
      const button = document.querySelector('.consulta3-button')
      button.disabled = true
      const proceso = await this.model.getProcesoJudicialById(id)
      console.log(proceso)
      console.log((proceso.participantes).length)
      console.log(proceso.participantes[0].promovente)
      for (var i = 0; i <= ((proceso.participantes).length)-1; i++) {
        if(proceso.participantes[i].promovente!=null) {
          this.modalPromovente(proceso.participantes[i])
        }
      }
      
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  //Metodo para abrir el modal del promovente
  modalPromovente = async promovente =>{
    try {
      const button = document.querySelector('.consulta3-button')
      button.disabled = true
      console.log(promovente)
      const modal = document.querySelector('modal-promovente')
      const dataPromovente = new DataPromovente(promovente)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataPromovente)

      modal.title = 'Datos Promovente'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  //Metodo para consultar la prueba
  handleConsultarPrueba = async id => {
    try {
      const button = document.querySelector('.consulta4-button')
      button.disabled = true
      const proceso = await this.model.getProcesoJudicialById(id)
      console.log(proceso)
      this.modalPrueba(proceso)
      
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  //Metodo para abrir el modal de la prueba
  modalPrueba = async proceso =>{
    try {
      const button = document.querySelector('.consulta4-button')
      const modal = document.querySelector('modal-prueba')
      const dataProceso = new DataPrueba(proceso)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataProceso)

      modal.title = 'Datos'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  
  //Metodo para consultar los estados procesales
  handleConsultarEstadosProcesales = async id => {
    try {
      const button = document.querySelector('.consulta5-button')
      button.disabled = true
      const proceso = await this.model.getProcesoJudicialById(id)
      console.log(proceso)
      this.modalEstadosProcesales(proceso)
      
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  //Metodo para abrir el modal de los estados procesales
  modalEstadosProcesales = async proceso =>{
    try {
      const button = document.querySelector('.consulta5-button')
      const modal = document.querySelector('modal-estados-procesales')
      const dataProceso = new DataEstadosProcesales(proceso)

      const handleModalClose = () => {
        const modalContent = modal.shadowRoot.getElementById('modal-content')
        modalContent.innerHTML = ''
        button.disabled = false
      }

      modal.addEventListener('onClose', handleModalClose)

      const modalContent = modal.shadowRoot.getElementById('modal-content')
      modalContent.appendChild(dataProceso)

      modal.title = 'Estados Procesales'
      modal.open = true
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  //Metodo para manejar los filtros y las consultas respectivas
  handleFiltros = async () => {

    const defensor = document.getElementById('defensor')
    const estatus_proceso = document.getElementById('estatus_proceso')
    const botonEliminar = document.getElementById('deleteButton')


    if (defensor.disabled === false) {


      if (defensor.value === '0') {
        const modal = document.querySelector('modal-warning');
        modal.message = 'Selecciona un defensor';
        modal.title = 'Error'
        modal.open = true
      } else {
        try {
          const table = document.getElementById('table-body')
          if (estatus_proceso.value === '0') {
            await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), null).then(procesosResponse => {
              table.innerHTML = ''

              procesosResponse.forEach(proceso => {
                table.appendChild(this.crearRow(proceso))
              })
              defensor.disabled = true
              estatus_proceso.disabled = true
              botonEliminar.style.display = 'block'


            }).catch(error => {
              const modal = document.querySelector('modal-warning');
              modal.message = 'No hay procesos judiciales para el defensor seleccionado';
              modal.title = 'Error'
              modal.open = true
            })

          } else if (estatus_proceso.value === '1') {
            await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), "EN_TRAMITE")
              .then(procesosResponse => {
                table.innerHTML = ''

                procesosResponse.forEach(proceso => {
                  table.appendChild(this.crearRow(proceso))
                })
                defensor.disabled = true
                estatus_proceso.disabled = true
                botonEliminar.style.display = 'block'
              })
              .catch(error => {
                const modal = document.querySelector('modal-warning');
                modal.message = 'No hay procesos judiciales activos para el defensor seleccionado';
                modal.title = 'Error'
                modal.open = true
              })

          } else if (estatus_proceso.value === '2') {
            try {
              const procesosResponse = await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), "BAJA")
              if (procesosResponse.length === 0) {
                const modal = document.querySelector('modal-warning');
                modal.message = 'No hay procesos judiciales en baja para el defensor seleccionado';
                modal.title = 'Error'
                modal.open = true
              } else {
                table.innerHTML = ''

                procesosResponse.forEach(proceso => {
                  table.appendChild(this.crearRow(proceso))
                })
                defensor.disabled = true
                estatus_proceso.disabled = true
                botonEliminar.style.display = 'block'
              }

            } catch (error) {
              const modal = document.querySelector('modal-warning');
              modal.message = 'No hay procesos judiciales en baja para el defensor seleccionado';
              modal.title = 'Error'
              modal.open = true
            }
          } else if (estatus_proceso.value === '3') {
            try {
              const procesosResponse = await this.model.getProcesosJudicialesByDefensor(Number(defensor.value), "CONCLUIDO")
              if (procesosResponse.length === 0) {
                const modal = document.querySelector('modal-warning');
                modal.message = 'No hay procesos judiciales concluidos para el defensor seleccionado';
                modal.title = 'Error'
                modal.open = true
              } else {
                table.innerHTML = ''

                procesosResponse.forEach(proceso => {
                  table.appendChild(this.crearRow(proceso))
                })
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
      const modal = document.querySelector('modal-warning');
      modal.message = 'Ya se realizo una busqueda, para realizar otra, elimina la anterior';
      modal.title = 'Error'
      modal.open = true
    }
    //   }
  }

  //Metodo para crear las filas de la tabla
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
                <button href="#" class="consulta-button font-medium text-[#db2424] hover:underline" data-id="${proceso.id_proceso_judicial}" >Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta2-button font-medium text-[#db2424] hover:underline" data-id="${proceso.id_proceso_judicial}">Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta3-button font-medium text-[#db2424] hover:underline" data-id="${proceso.id_proceso_judicial}" >Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta4-button font-medium text-[#db2424] hover:underline" data-id="${proceso.id_proceso_judicial}" >Consultar</button>
            </td>
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta5-button font-medium text-[#db2424] hover:underline" data-id="${proceso.id_proceso_judicial}" >Consultar</button>
            </td>
            `

    const consultarButton1 = row.querySelectorAll('.consulta-button');
    consultarButton1.forEach(button => {
      button.addEventListener('click', () => {
        this.handleConsultarAsesoriaById(button.getAttribute('data-id'));
      });
    });

    const consultarButton2 = row.querySelectorAll('.consulta2-button');
    consultarButton2.forEach(button => {
      button.addEventListener('click', () => {
        this.handleConsultarDemandado(button.getAttribute('data-id'));
      });
    });

    const consultarButton3 = row.querySelectorAll('.consulta3-button');
    consultarButton3.forEach(button => {
      button.addEventListener('click', () => {
        this.handleConsultarPromovente(button.getAttribute('data-id'));
      });
    });

    const consultarButton4 = row.querySelectorAll('.consulta4-button');
    consultarButton4.forEach(button => {
      button.addEventListener('click', () => {
        this.handleConsultarPrueba(button.getAttribute('data-id'));
      });
    });

    const consultarButton5 = row.querySelectorAll('.consulta5-button');
    consultarButton5.forEach(button => {
      button.addEventListener('click', () => {
        this.handleConsultarEstadosProcesales(button.getAttribute('data-id'));
      });
    });

    return row
  }


}
export { ConsultaProcesoController }
