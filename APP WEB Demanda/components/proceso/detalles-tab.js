import { ValidationError } from '../../lib/errors.js'
import { validateNonEmptyFields } from '../../lib/utils.js'
import { APIModel } from '../../models/api.model.js'
//import '../codigo-postal/codigo-postal.js'

const template = document.createElement('template')

const html = await (
    await fetch('./components/proceso/detalles-tab.html')
).text()
template.innerHTML = html

export class DetallesTab extends HTMLElement {
    #api

    #registroTab
    #promoventeTab
    #procesoTab
    #imputadoTab


    #nombreDefensor
    #tipoJuicio
    #fechaInicio
    #numeroExpediente
    #ci
    #estadosProcesales
    #pruebas
    #resoluciones
    #observaciones
    #familiares

    #nombrePromovente
    #edadPromovente
    #sexoPromovente
    #telefonoPromovente
    #etniaPromovente
    #escolaridadPromovente
    #ocupacionPromovente
    #españolPromovente
    #callePromovente
    #numeroExteriorPromovente
    #numeroInteriorPromovente
    #codigoPostalPromovente
    #estadoPromovente
    #municipioPromovente
    #ciudadPromovente
    #coloniaPromovente

    #nombreImputado
    #edadImputado
    #sexoImputado
    #telefonoImputado
    #etniaImputado
    #escolaridadImputado
    #ocupacionImputado
    #españolImputado
    #calleImputado
    #numeroExteriorImputado
    #numeroInteriorImputado
    #codigoPostalImputado
    #estadoImputado
    #municipioImputado
    #ciudadImputado
    #coloniaImputado





    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })
        shadow.appendChild(template.content.cloneNode(true))
        this.id = 'detalles'
        this.style.display = 'none'
        this.#registroTab = document.querySelector('registro-full-tab')
        this.#promoventeTab = document.querySelector('promovente-full-tab')
        this.#imputadoTab = document.querySelector('imputado-full-tab')
        this.#procesoTab = document.querySelector('proceso-full-tab')
    }
    async init() {
        this.#api = new APIModel()


        this.manageFormFields()
        this.fillInputs()
     

    }
 
    manageFormFields() {

        this.#nombreDefensor = this.shadowRoot.getElementById('nombre-defensor')
        this.#tipoJuicio = this.shadowRoot.getElementById('tipo-juicio')
        this.#fechaInicio = this.shadowRoot.getElementById('fecha-inicio')
        this.#numeroExpediente = this.shadowRoot.getElementById('numero-expediente')
        this.#ci = this.shadowRoot.getElementById('ci')
        this.#estadosProcesales = this.shadowRoot.getElementById('estados-procesales')
        this.#pruebas = this.shadowRoot.getElementById('pruebas')
        this.#resoluciones = this.shadowRoot.getElementById('resoluciones')
        this.#observaciones = this.shadowRoot.getElementById('observaciones')
        this.#familiares = this.shadowRoot.getElementById('familiares')

        this.#nombrePromovente = this.shadowRoot.getElementById('nombre-promovente')
        this.#edadPromovente = this.shadowRoot.getElementById('edad-promovente')
        this.#sexoPromovente = this.shadowRoot.getElementById('sexo-promovente')
        this.#telefonoPromovente = this.shadowRoot.getElementById('telefono-promovente')
        this.#etniaPromovente = this.shadowRoot.getElementById('etnia-promovente')
        this.#escolaridadPromovente = this.shadowRoot.getElementById('escolaridad-promovente')
        this.#ocupacionPromovente = this.shadowRoot.getElementById('ocupacion-promovente')
        this.#españolPromovente = this.shadowRoot.getElementById('español-promovente')
        this.#callePromovente = this.shadowRoot.getElementById('calle-promovente')
        this.#numeroExteriorPromovente = this.shadowRoot.getElementById('numero-exterior-promovente')

        this.#numeroInteriorPromovente = this.shadowRoot.getElementById('numero-interior-promovente')
        this.#codigoPostalPromovente = this.shadowRoot.getElementById('codigo-postal-promovente')
        this.#estadoPromovente = this.shadowRoot.getElementById('estado-promovente')
        this.#municipioPromovente = this.shadowRoot.getElementById('municipio-promovente')
        this.#ciudadPromovente = this.shadowRoot.getElementById('ciudad-promovente')
        this.#coloniaPromovente = this.shadowRoot.getElementById('colonia-promovente')

        this.#nombreImputado = this.shadowRoot.getElementById('nombre-imputado')
        this.#edadImputado = this.shadowRoot.getElementById('edad-imputado')
        this.#sexoImputado = this.shadowRoot.getElementById('sexo-imputado')
        this.#telefonoImputado = this.shadowRoot.getElementById('telefono-imputado')
   //     this.#etniaImputado = this.shadowRoot.getElementById('etnia-imputado')
   //     this.#escolaridadImputado = this.shadowRoot.getElementById('escolaridad-imputado')
   //     this.#ocupacionImputado = this.shadowRoot.getElementById('ocupacion-imputado')
       // this.#españolImputado = this.shadowRoot.getElementById('español-imputado')
        this.#calleImputado = this.shadowRoot.getElementById('calle-imputado')
        this.#numeroExteriorImputado = this.shadowRoot.getElementById('numero-exterior-imputado')
        this.#numeroInteriorImputado = this.shadowRoot.getElementById('numero-interior-imputado')

        this.#codigoPostalImputado = this.shadowRoot.getElementById('codigo-postal-imputado')
        this.#estadoImputado = this.shadowRoot.getElementById('estado-imputado')
        this.#municipioImputado = this.shadowRoot.getElementById('municipio-imputado')
        this.#ciudadImputado = this.shadowRoot.getElementById('ciudad-imputado')
        this.#coloniaImputado = this.shadowRoot.getElementById('colonia-imputado')

    }

    fillInputs() {
     
        const { turno } = this.#registroTab.data
        const { promovente } = this.#promoventeTab.data
        const { imputado } = this.#imputadoTab.data
        const { proceso } = this.#procesoTab.data

        this.#nombreDefensor.textContent = proceso.defensor
        this.#tipoJuicio.textContent = proceso.tipo_juicio
        this.#fechaInicio.textContent = proceso.fecha_inicio
        this.#numeroExpediente.textContent = proceso.numero_expediente
        this.#ci.textContent = proceso.control_interno



        this.#estadosProcesales.textContent = proceso.estadosProcesales.map((estado, index) =>
            `${index + 1}. Estado Procesal: ${estado.descripcion_estado_procesal} Fecha: ${estado.fecha_estado_procesal}`).join(', ')


        this.#pruebas.textContent = proceso.pruebas.map((prueba, index) => `${index + 1}. Prueba: ${prueba.descripcion_prueba}`).join(', ')


        this.#resoluciones.textContent = proceso.resoluciones.map((resolucion, index) => `${index + 1}. Resolucion: ${resolucion.resolucion}
        Fecha: ${resolucion.fecha_resolucion}`).join(', ')


        this.#observaciones.textContent = proceso.observaciones.map((observacion, index) => `${index + 1}. Observacion: ${observacion.observacion}`).join(', ')

        this.#familiares.textContent = proceso.familiares.map((familiar, index) => `${index + 1}. Nombre: ${familiar.nombre} Nacionalidad: ${familiar.nacionalidad}
    Parentesco: ${familiar.parentesco} Pertenece a la comunidad LGBT: ${familiar.perteneceComunidadLGBT===true?'Si':'No'} Adulto Mayor: ${familiar.adultaMayor===true? 'Si': 'No'} Salud Precaria: ${familiar.saludPrecaria===true?'Si': 'No'} Pobreza Extrema: ${familiar.pobrezaExtrema ===true?'Si': 'No'}`).join(', ')



        this.#nombrePromovente.textContent = promovente.nombre + ' ' + promovente.apellido_paterno + ' ' + promovente.apellido_materno
        this.#edadPromovente.textContent = promovente.edad
        this.#sexoPromovente.textContent = promovente.sexo
        this.#telefonoPromovente.textContent = promovente.telefono
        this.#etniaPromovente.textContent = promovente.etnia
        this.#escolaridadPromovente.textContent = promovente.escolaridad
        this.#ocupacionPromovente.textContent = promovente.ocupacion
        this.#españolPromovente.textContent = promovente.español === true ? 'Si' : 'No'
        this.#callePromovente.textContent = promovente.domicilio.calle_domicilio
        this.#numeroExteriorPromovente.textContent = promovente.domicilio.numero_exterior_domicilio
        this.#numeroInteriorPromovente.textContent = promovente.domicilio.numero_interior_domicilio
        this.#codigoPostalPromovente.textContent = promovente.domicilio.cp
        this.#estadoPromovente.textContent = promovente.domicilio.estado
        this.#municipioPromovente.textContent = promovente.domicilio.municipio
        this.#ciudadPromovente.textContent = promovente.domicilio.ciudad
        this.#coloniaPromovente.textContent = promovente.domicilio.colonia

        this.#nombreImputado.textContent = imputado.nombre  + ' ' + imputado.apellido_paterno + ' ' + imputado.apellido_materno
        this.#edadImputado.textContent = imputado.edad
        this.#sexoImputado.textContent = imputado.sexo
        this.#telefonoImputado.textContent = imputado.telefono
      //  this.#etniaImputado.textContent = imputado.id_etnia
      //  this.#escolaridadImputado.textContent = imputado.id_escolaridad
       // this.#ocupacionImputado.textContent = imputado.id_ocupacion
        //this.#españolImputado.textContent = imputado.español
        this.#calleImputado.textContent = imputado.domicilio.calle_domicilio
        this.#numeroExteriorImputado.textContent = imputado.domicilio.numero_exterior_domicilio
        this.#numeroInteriorImputado.textContent = imputado.domicilio.numero_interior_domicilio
        this.#codigoPostalImputado.textContent = imputado.domicilio.cp
        this.#estadoImputado.textContent = imputado.domicilio.estado
        this.#municipioImputado.textContent = imputado.domicilio.municipio
        this.#ciudadImputado.textContent = imputado.domicilio.ciudad
        this.#coloniaImputado.textContent = imputado.domicilio.colonia



    }

    connectedCallback() {
        this.btnCrearAsesoria = this.shadowRoot.getElementById('btn-crear-proceso')

        this.btnCrearAsesoria.addEventListener('click', async () => {
            try {
                const { turno } = this.#registroTab.data
                const { promovente } = this.#promoventeTab.data
                const { imputado } = this.#imputadoTab.data
                const { proceso } = this.#procesoTab.data
                const procesoJudicial = {
                    turno,
                    promovente,
                    imputado,
                    proceso
                }

                await this.#api.postProcesoJudicial(procesoJudicial)
                  
                //actualizar turno
                 const turnoActualizado = {
                    id_turno: turno.id_turno,
                    fecha_turno: turno.fecha_turno,
                    hora_turno: turno.hora_turno,
                    id_asesoria: turno.asesoria.datos_asesoria.id_asesoria,
                    id_defensor: turno.defensor.id_defensor,
                    estatus_general: 'EN_SEGUIMIENTO'
                 }
                    await this.#api.putTurno(turno.id_turno,turnoActualizado)
                this.#showModal(
                    'El proceso judicial se ha creado correctamente',
                    'Proceso Judicial creado',
                    () => {
                        location.href = '/'
                    }
                )
            } catch (error) {
                console.error(error)
                this.#showModal(
                    'Ocurrió un error al registrar el proceso judicial',
                    'Error al registrar el proceso judicial'
                )
            }
        })

        document.addEventListener('tab-change', event => {
            const tabId = event.detail.tabId
            if (tabId !== 'detalles') {
                return
            }
            this.init()
        })
    }

    #showModal(message, title, onCloseCallback) {
        const modal = document.querySelector('modal-warning')
        modal.message = message
        modal.title = title
        modal.open = true
        modal.setOnCloseCallback(onCloseCallback)
    }

}

customElements.define('detalles-full-tab', DetallesTab)
