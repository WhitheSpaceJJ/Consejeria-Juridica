import { ControllerUtils } from '../lib/controllerUtils'
import { DataAsesoria } from '../components/asesoria/data-asesoria'

class ConsultaController {
  #pagina = 1
  #numeroPaginas

  constructor(model) {
    this.model = model
    this.utils = new ControllerUtils(model.user)
    this.CheckEventListeners()
    this.ComboBoxEventListeners()
    this.buttonsEventListeners()
  }

  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
    this.getNumeroPaginas()
    this.handleConsultarAsesorias()
    this.agregarMunicipios()
    this.agregarZonas()
    const searchButton = document.getElementById('searchButton');
     searchButton.addEventListener('click', (event) => {
         event.preventDefault();
         this.handleFiltros();
       });
   
       const deleteButton = document.getElementById('deleteButton');
       deleteButton.style.display = 'none';
       deleteButton.addEventListener('click', (event) => {
         event.preventDefault();
         this.deleteFiltros();
       });
       /*  const excel = document.getElementById('filtros-excel');
       excel.style.display = 'none';
       const dropdownbuttonexcell = document.getElementById('dropdown-button-excell');
       dropdownbuttonexcell.addEventListener('click', (event) => {
         event.preventDefault();
         this.filtrosexcel();
       });
   
      Botón de descarga del reporte
       const btnDescargarReporte = document.getElementById('btnDescargarReporte');
       btnDescargarReporte.addEventListener('click', (event) => {
         event.preventDefault();
         this.descargarReporte();
       });
       */
    window.handleConsultarAsesoriasById = this.handleConsultarAsesoriasById
  }
/* *
  // DOMContentLoaded
  handleDOMContentLoaded = () => {
    // add permissions
    this.utils.validatePermissions({})
    // const searchButton = document.getElementById('searchButton');

    /*   searchButton.addEventListener('click', (event) => {
         event.preventDefault();
         this.handleFiltros();
       });
   */
/*
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.style.display = 'none';
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.deleteFiltros();
    });

    */
    /*  const excel = document.getElementById('filtros-excel');
    excel.style.display = 'none';
    const dropdownbuttonexcell = document.getElementById('dropdown-button-excell');
    dropdownbuttonexcell.addEventListener('click', (event) => {
      event.preventDefault();
      this.filtrosexcel();
    });

   Botón de descarga del reporte
    const btnDescargarReporte = document.getElementById('btnDescargarReporte');
    btnDescargarReporte.addEventListener('click', (event) => {
      event.preventDefault();
      this.descargarReporte();
    });
    */
    
    
    /*
    this.handleFiltros();
    this.handleConsultarAsesorias()
    this.agregarMunicipios()
    this.agregarZonas()
    this.getNumeroPaginas()
    window.handleConsultarAsesoriasById = this.handleConsultarAsesoriasById
    */
  /*}
*/






  CheckEventListeners = () => {
    const checkboxAsesor = document.getElementById('check-asesor')
    const checkboxMunicipio = document.getElementById('check-municipio')
    const checkboxZona = document.getElementById('check-zona')
    const checkboxDefensor = document.getElementById('check-defensor')

    checkboxAsesor.addEventListener('change', this.handleCheckboxChange)
    checkboxMunicipio.addEventListener('change', this.handleCheckboxChange)
    checkboxZona.addEventListener('change', this.handleCheckboxChange)
    checkboxDefensor.addEventListener('change', this.handleCheckboxChange)
  }

  ComboBoxEventListeners = () => {
    const selectAsesor = document.getElementById('select-asesor')
    const selectMunicipio = document.getElementById('select-municipio')
    const selectZona = document.getElementById('select-zona')
    const selectDefensor = document.getElementById('select-defensor')

    selectAsesor.addEventListener('change', this.handleSelectChange)
    selectMunicipio.addEventListener('change', this.handleSelectChange)
    selectZona.addEventListener('change', this.handleSelectChange)
    selectDefensor.addEventListener('change', this.handleSelectChange)
  }

  buttonsEventListeners = () => {
    const prev = document.getElementById('anterior')
    const next = document.getElementById('siguiente')

    prev.addEventListener('click', this.handlePrevPage)
    next.addEventListener('click', this.handleNextPage)
  }

  /*handleButtons = () =>{
    const asesoriasResponse = this.model.getTotalAsesorias()
    const div = document.getElementById('buttons')

    for (let i = 1; i <= asesoriasResponse; i++) {
      const button = document.createElement('button')
      button.innerHTML = i
      div.appendChild(button)
    }
  }*/

  handlePrevPage = async () => {
    if (this.#pagina > 1) {
      this.#pagina--
      this.handleConsultarAsesorias()
    }
  }

  handleNextPage = async () => {
    if (this.#pagina < this.#numeroPaginas) {
      this.#pagina++
      this.handleConsultarAsesorias()
    }
  }

  getNumeroPaginas = async () => {
    const numeroAsesorias = await this.model.getTotalAsesorias()
    this.#numeroPaginas = (numeroAsesorias.totalAsesorias) / 10
  }

  handleSelectChange = () => {
    const selectAsesor = document.getElementById('select-asesor')
    const selectZona = document.getElementById('select-zona')
    const selectDefensor = document.getElementById('select-defensor')

    const checkboxDefensor = document.getElementById('check-defensor')
    const checkboxAsesor = document.getElementById('check-asesor')
    const zona = selectZona.value

    // const table = document.getElementById('table-body')
    // table.innerHTML = ''

    if (zona !== '0') {
      // Habilitar checkbox y select de defensor
      /*
      this.agregarDefensores()
      this.agregarAsesores()
      checkboxDefensor.disabled = false
      if (checkboxDefensor.checked) {
        selectDefensor.disabled = false
      } else {
        selectDefensor.disabled = true
        selectDefensor.value = 0
      }
      checkboxAsesor.disabled = false
      if (checkboxAsesor.checked) {
        selectAsesor.disabled = false
      } else {
        selectAsesor.disabled = true
        selectAsesor.value = 0
      }
      */

      checkboxDefensor.disabled = false
      if (checkboxDefensor.checked) {
        selectDefensor.disabled = false
        if (selectDefensor.value === '0') {
          this.agregarAsesores()
        }
      } else {
        selectDefensor.disabled = true
        selectDefensor.value = 0
      }
      checkboxAsesor.disabled = false
      if (checkboxAsesor.checked) {
        selectAsesor.disabled = false
        if (selectAsesor.value === '0') {
          this.agregarAsesores()
        }
      } else {
        selectAsesor.disabled = true
        selectAsesor.value = 0
      }
    } else {
      checkboxDefensor.disabled = true
      selectDefensor.value = 0
      checkboxAsesor.disabled = true
      selectAsesor.value = 0
      /*
      checkboxAsesor.disabled = true
      selectAsesor.value = 0
*/
    }
  }

  handleCheckboxChange = () => {

    const checkboxAsesor = document.getElementById('check-asesor')
    const selectAsesor = document.getElementById('select-asesor')
    const checkboxMunicipio = document.getElementById('check-municipio')
    const selectMunicipio = document.getElementById('select-municipio')
    const checkboxZona = document.getElementById('check-zona')
    const selectZona = document.getElementById('select-zona')
    const checkboxDefensor = document.getElementById('check-defensor')
    const selectDefensor = document.getElementById('select-defensor')

    if (checkboxMunicipio.checked) {
      selectMunicipio.disabled = false
    } else {
      selectMunicipio.disabled = true
      selectMunicipio.value = 0
    }

    if (checkboxZona.checked) {
      selectZona.disabled = false
    } else {
      selectZona.disabled = true
      selectZona.value = 0

      /*
        selectDefensor.disabled = true
        selectDefensor.value = 0
        selectAsesor.disabled = true
        selectAsesor.value = 0
        checkboxDefensor.checked = false
        checkboxAsesor.checked = false
        */
    }

    if (selectZona.value !== '0') {

      checkboxDefensor.disabled = false
      if (checkboxDefensor.checked) {
        selectDefensor.disabled = false
        if (selectDefensor.value === '0') {
          this.agregarDefensores()
        }
      } else {
        selectDefensor.disabled = true
        selectDefensor.value = 0
      }
      checkboxAsesor.disabled = false
      if (checkboxAsesor.checked) {
        selectAsesor.disabled = false
        if (selectAsesor.value === '0') {
          this.agregarAsesores()
        }
      } else {
        selectAsesor.disabled = true
        selectAsesor.value = 0
      }
    }




    /*
       if (selectZona.value !== '0') {
         checkboxDefensor.disabled = false
         if (checkboxDefensor.checked) {
           selectDefensor.disabled = false
         } else {
           selectDefensor.disabled = true
           selectDefensor.value = 0
         }
         checkboxAsesor.disabled = false
         if (checkboxAsesor.checked) {
           selectAsesor.disabled = false
         } else {
           selectAsesor.disabled = true
           selectAsesor.value = 0
         }
       }
       */
    const checkboxSeleccion = document.getElementById('chkSeleccion');
    const checkboxNombreEmpleado = document.getElementById('chkNombreEmpleado');
    const checkboxNombreAsesorado = document.getElementById('chkNombreAsesorado');
    const checkboxGenero = document.getElementById('chkGenero');
    const checkboxEstadoCivil = document.getElementById('chkEstadoCivil');
    const checkboxNumeroHijos = document.getElementById('chkNumeroHijos');
    const checkboxTelefono = document.getElementById('chkTelefono');
    const checkboxColonia = document.getElementById('chkColonia');
    const checkboxTrabaja = document.getElementById('chkTrabaja');
    const checkboxIngresoMensual = document.getElementById('chkIngresoMensual');
    const checkboxMotivo = document.getElementById('chkMotivo');
    const checkboxResumen = document.getElementById('chkResumen');
    const checkboxTipoJuicio = document.getElementById('chkTipoJuicio');
    const checkboxConclusion = document.getElementById('chkConclusion');
    const checkboxDocumentosRecibidos = document.getElementById('chkDocumentosRecibidos');
    const checkboxFechaRegistro = document.getElementById('chkFechaRegistro');
    const checkboxNombreUsuario = document.getElementById('chkNombreUsuario');

    if (checkboxSeleccion.checked) {
      checkboxNombreEmpleado.disabled = false
      checkboxNombreAsesorado.disabled = false
      checkboxGenero.disabled = false
      checkboxEstadoCivil.disabled = false
      checkboxNumeroHijos.disabled = false
      checkboxTelefono.disabled = false
      checkboxColonia.disabled = false
      checkboxTrabaja.disabled = false
      checkboxIngresoMensual.disabled = false
      checkboxMotivo.disabled = false
      checkboxResumen.disabled = false
      checkboxTipoJuicio.disabled = false
      checkboxConclusion.disabled = false
      checkboxDocumentosRecibidos.disabled = false
      checkboxFechaRegistro.disabled = false
      checkboxNombreUsuario.disabled = false
    } else {
      checkboxNombreEmpleado.disabled = true
      checkboxNombreAsesorado.disabled = true
      checkboxGenero.disabled = true
      checkboxEstadoCivil.disabled = true
      checkboxNumeroHijos.disabled = true
      checkboxTelefono.disabled = true
      checkboxColonia.disabled = true
      checkboxTrabaja.disabled = true
      checkboxIngresoMensual.disabled = true
      checkboxMotivo.disabled = true
      checkboxResumen.disabled = true
      checkboxTipoJuicio.disabled = true
      checkboxConclusion.disabled = true
      checkboxDocumentosRecibidos.disabled = true
      checkboxFechaRegistro.disabled = true
      checkboxNombreUsuario.disabled = true
      checkboxNombreEmpleado.checked = true
      checkboxNombreAsesorado.checked = true
      checkboxGenero.checked = true
      checkboxEstadoCivil.checked = true
      checkboxNumeroHijos.checked = true
      checkboxTelefono.checked = true
      checkboxColonia.checked = true
      checkboxTrabaja.checked = true
      checkboxIngresoMensual.checked = true
      checkboxMotivo.checked = true
      checkboxResumen.checked = true
      checkboxTipoJuicio.checked = true
      checkboxConclusion.checked = true
      checkboxDocumentosRecibidos.checked = true
      checkboxFechaRegistro.checked = true
      checkboxNombreUsuario.checked = true
    }


  }

  /*
    descargarReporte = async () => {
      const checkboxSeleccion = document.getElementById('chkSeleccion');
      const checkboxNombreEmpleado = document.getElementById('chkNombreEmpleado');
      const checkboxNombreAsesorado = document.getElementById('chkNombreAsesorado');
      const checkboxGenero = document.getElementById('chkGenero');
      const checkboxEstadoCivil = document.getElementById('chkEstadoCivil');
      const checkboxNumeroHijos = document.getElementById('chkNumeroHijos');
      const checkboxTelefono = document.getElementById('chkTelefono');
      const checkboxColonia = document.getElementById('chkColonia');
      const checkboxTrabaja = document.getElementById('chkTrabaja');
      const checkboxIngresoMensual = document.getElementById('chkIngresoMensual');
      const checkboxMotivo = document.getElementById('chkMotivo');
      const checkboxResumen = document.getElementById('chkResumen');
      const checkboxTipoJuicio = document.getElementById('chkTipoJuicio');
      const checkboxConclusion = document.getElementById('chkConclusion');
      const checkboxDocumentosRecibidos = document.getElementById('chkDocumentosRecibidos');
      const checkboxFechaRegistro = document.getElementById('chkFechaRegistro');
      const checkboxNombreUsuario = document.getElementById('chkNombreUsuario');
      if (checkboxSeleccion.checked) {
        const filtros3 = {};
        if (checkboxNombreEmpleado.checked) filtros3['nombre-empleado'] = true;
        if (checkboxNombreAsesorado.checked) filtros3['nombre-asesorado'] = true;
        if (checkboxGenero.checked) filtros3['genero'] = true;
        if (checkboxEstadoCivil.checked) filtros3['estado_civil'] = true;
        if (checkboxNumeroHijos.checked) filtros3['numero_hijos'] = true;
        if (checkboxTelefono.checked) filtros3['telefono'] = true;
        if (checkboxColonia.checked) filtros3['colonia'] = true;
        if (checkboxTrabaja.checked) filtros3['trabaja'] = true;
        if (checkboxIngresoMensual.checked) filtros3['ingreso_mensual'] = true;
        if (checkboxMotivo.checked) filtros3['motivo'] = true;
        if (checkboxResumen.checked) filtros3['resumen'] = true;
        if (checkboxTipoJuicio.checked) filtros3['tipo_juicio'] = true;
        if (checkboxConclusion.checked) filtros3['conclusion'] = true;
        if (checkboxDocumentosRecibidos.checked) filtros3['documentos-recibidos'] = true;
        if (checkboxFechaRegistro.checked) filtros3['fecha_registro'] = true;
        if (checkboxNombreUsuario.checked) filtros3['nombre-usuario'] = true;
  
  
  
        const checkboxAsesor = document.getElementById('check-asesor')
        const checkboxMunicipio = document.getElementById('check-municipio')
        const checkboxZona = document.getElementById('check-zona')
        const checkboxDefensor = document.getElementById('check-defensor')
  
        const selectAsesor = document.getElementById('select-asesor')
        const selectMunicipio = document.getElementById('select-municipio')
        const selectZona = document.getElementById('select-zona')
        const selectDefensor = document.getElementById('select-defensor')
  
        const fechaInicio = document.getElementById('fecha-inicio')
        const fechaFinal = document.getElementById('fecha-final')
  
        //const table = document.getElementById('table-body')
        //  table.innerHTML = ''
        const fechaInicioValor = fechaInicio.value;
        const fechaFinalValor = fechaFinal.value;
        const idMunicipioValor = checkboxMunicipio.checked ? selectMunicipio.value : null;
        const idZonaValor = checkboxZona.checked ? selectZona.value : null;
        const idAsesorValor = checkboxAsesor.checked ? selectAsesor.value : null;
        const idDefensorValor = checkboxDefensor.checked ? selectDefensor.value : null;
  
  
        var filtros = {};
        // Verificar si todos los valores son null
        if (fechaInicioValor === null &&
          fechaFinalValor === null &&
          idMunicipioValor === null &&
          idZonaValor === null &&
          idAsesorValor === null &&
          idDefensorValor === null) {
          filtros = null;
        }
        else {
          filtros = {
            fecha_inicio: fechaInicio.value,
            fecha_final: fechaFinal.value,
            id_municipio: checkboxMunicipio.checked ? selectMunicipio.value : null,
            id_zona: checkboxZona.checked ? selectZona.value : null,
            id_asesor: checkboxAsesor.checked ? selectAsesor.value : null,
            id_defensor: checkboxDefensor.checked ? selectDefensor.value : null,
          }
        }
        try {
          const asesoriasResponse = await this.model.getAsesoriasDescarga(filtros, filtros3)
          if (asesoriasResponse !== null) {
            const excel = document.getElementById('filtros-excel');
            excel.style.display = 'none';
            const checkboxNombreEmpleado = document.getElementById('chkNombreEmpleado');
            const checkboxNombreAsesorado = document.getElementById('chkNombreAsesorado');
            const checkboxGenero = document.getElementById('chkGenero');
            const checkboxEstadoCivil = document.getElementById('chkEstadoCivil');
            const checkboxNumeroHijos = document.getElementById('chkNumeroHijos');
            const checkboxTelefono = document.getElementById('chkTelefono');
            const checkboxColonia = document.getElementById('chkColonia');
            const checkboxTrabaja = document.getElementById('chkTrabaja');
            const checkboxIngresoMensual = document.getElementById('chkIngresoMensual');
            const checkboxMotivo = document.getElementById('chkMotivo');
            const checkboxResumen = document.getElementById('chkResumen');
            const checkboxTipoJuicio = document.getElementById('chkTipoJuicio');
            const checkboxConclusion = document.getElementById('chkConclusion');
            const checkboxDocumentosRecibidos = document.getElementById('chkDocumentosRecibidos');
            const checkboxFechaRegistro = document.getElementById('chkFechaRegistro');
            const checkboxNombreUsuario = document.getElementById('chkNombreUsuario');
            checkboxNombreEmpleado.disabled = true
            checkboxNombreAsesorado.disabled = true
            checkboxGenero.disabled = true
            checkboxEstadoCivil.disabled = true
            checkboxNumeroHijos.disabled = true
            checkboxTelefono.disabled = true
            checkboxColonia.disabled = true
            checkboxTrabaja.disabled = true
            checkboxIngresoMensual.disabled = true
            checkboxMotivo.disabled = true
            checkboxResumen.disabled = true
            checkboxTipoJuicio.disabled = true
            checkboxConclusion.disabled = true
            checkboxDocumentosRecibidos.disabled = true
            checkboxFechaRegistro.disabled = true
            checkboxNombreUsuario.disabled = true
            checkboxNombreEmpleado.checked = true
            checkboxNombreAsesorado.checked = true
            checkboxGenero.checked = true
            checkboxEstadoCivil.checked = true
            checkboxNumeroHijos.checked = true
            checkboxTelefono.checked = true
            checkboxColonia.checked = true
            checkboxTrabaja.checked = true
            checkboxIngresoMensual.checked = true
            checkboxMotivo.checked = true
            checkboxResumen.checked = true
            checkboxTipoJuicio.checked = true
            checkboxConclusion.checked = true
            checkboxDocumentosRecibidos.checked = true
            checkboxFechaRegistro.checked = true
            checkboxNombreUsuario.checked = true
          }
  
  
        } catch (error) {
          console.error('Error:', error.message)
        }
      }
      else {
        const filtros2 = {
          "nombre-empleado": true,
          "nombre-asesorado": true,
          "genero": true,
          "estado_civil": true,
          "numero_hijos": true,
          "telefono": true,
          "colonia": true,
          "trabaja": true,
          "ingreso_mensual": true,
          "motivo": true,
          "resumen": true,
          "tipo_juicio": true,
          "conclusion": true,
          "documentos-recibidos": true,
          "fecha_registro": true,
          "nombre-usuario": true
        };
  
  
  
  
        const checkboxAsesor = document.getElementById('check-asesor')
        const checkboxMunicipio = document.getElementById('check-municipio')
        const checkboxZona = document.getElementById('check-zona')
        const checkboxDefensor = document.getElementById('check-defensor')
  
        const selectAsesor = document.getElementById('select-asesor')
        const selectMunicipio = document.getElementById('select-municipio')
        const selectZona = document.getElementById('select-zona')
        const selectDefensor = document.getElementById('select-defensor')
  
        const fechaInicio = document.getElementById('fecha-inicio')
        const fechaFinal = document.getElementById('fecha-final')
  
        //const table = document.getElementById('table-body')
        //  table.innerHTML = ''
        const fechaInicioValor = fechaInicio.value;
        const fechaFinalValor = fechaFinal.value;
        const idMunicipioValor = checkboxMunicipio.checked ? selectMunicipio.value : null;
        const idZonaValor = checkboxZona.checked ? selectZona.value : null;
        const idAsesorValor = checkboxAsesor.checked ? selectAsesor.value : null;
        const idDefensorValor = checkboxDefensor.checked ? selectDefensor.value : null;
  
  
        var filtros9 = {};
        // Verificar si todos los valores son null
        if (fechaInicioValor === '' &&
          fechaFinalValor === '' &&
          idMunicipioValor === null &&
          idZonaValor === null &&
          idAsesorValor === null &&
          idDefensorValor === null) {
          filtros9 = null;
        }
        else {
          filtros9 = {
            fecha_inicio: fechaInicio.value,
            fecha_final: fechaFinal.value,
            id_municipio: checkboxMunicipio.checked ? selectMunicipio.value : null,
            id_zona: checkboxZona.checked ? selectZona.value : null,
            id_asesor: checkboxAsesor.checked ? selectAsesor.value : null,
            id_defensor: checkboxDefensor.checked ? selectDefensor.value : null,
          }
        }
        try {
          console.log(filtros9, filtros2)
          const asesoriasResponse = await this.model.getAsesoriasDescarga(filtros9, filtros2)
          if (asesoriasResponse !== null) {
            const excel = document.getElementById('filtros-excel');
            excel.style.display = 'none';
            const checkboxNombreEmpleado = document.getElementById('chkNombreEmpleado');
            const checkboxNombreAsesorado = document.getElementById('chkNombreAsesorado');
            const checkboxGenero = document.getElementById('chkGenero');
            const checkboxEstadoCivil = document.getElementById('chkEstadoCivil');
            const checkboxNumeroHijos = document.getElementById('chkNumeroHijos');
            const checkboxTelefono = document.getElementById('chkTelefono');
            const checkboxColonia = document.getElementById('chkColonia');
            const checkboxTrabaja = document.getElementById('chkTrabaja');
            const checkboxIngresoMensual = document.getElementById('chkIngresoMensual');
            const checkboxMotivo = document.getElementById('chkMotivo');
            const checkboxResumen = document.getElementById('chkResumen');
            const checkboxTipoJuicio = document.getElementById('chkTipoJuicio');
            const checkboxConclusion = document.getElementById('chkConclusion');
            const checkboxDocumentosRecibidos = document.getElementById('chkDocumentosRecibidos');
            const checkboxFechaRegistro = document.getElementById('chkFechaRegistro');
            const checkboxNombreUsuario = document.getElementById('chkNombreUsuario');
            checkboxNombreEmpleado.disabled = true
            checkboxNombreAsesorado.disabled = true
            checkboxGenero.disabled = true
            checkboxEstadoCivil.disabled = true
            checkboxNumeroHijos.disabled = true
            checkboxTelefono.disabled = true
            checkboxColonia.disabled = true
            checkboxTrabaja.disabled = true
            checkboxIngresoMensual.disabled = true
            checkboxMotivo.disabled = true
            checkboxResumen.disabled = true
            checkboxTipoJuicio.disabled = true
            checkboxConclusion.disabled = true
            checkboxDocumentosRecibidos.disabled = true
            checkboxFechaRegistro.disabled = true
            checkboxNombreUsuario.disabled = true
            checkboxNombreEmpleado.checked = true
            checkboxNombreAsesorado.checked = true
            checkboxGenero.checked = true
            checkboxEstadoCivil.checked = true
            checkboxNumeroHijos.checked = true
            checkboxTelefono.checked = true
            checkboxColonia.checked = true
            checkboxTrabaja.checked = true
            checkboxIngresoMensual.checked = true
            checkboxMotivo.checked = true
            checkboxResumen.checked = true
            checkboxTipoJuicio.checked = true
            checkboxConclusion.checked = true
            checkboxDocumentosRecibidos.checked = true
            checkboxFechaRegistro.checked = true
            checkboxNombreUsuario.checked = true
          }
  
        } catch (error) {
          console.error('Error:', error.message)
        }
  
      }
    }
  */
 /*
    filtrosexcel = () => {
      const excel = document.getElementById('filtros-excel');
      if (excel.style.display === 'block') {
        excel.style.display = 'none';
      } else {
        excel.style.display = 'block';
      }
    }
     */

  limpiarFiltros = () => {
    const checkboxAsesor = document.getElementById('check-asesor')
    const selectAsesor = document.getElementById('select-asesor')
    const checkboxMunicipio = document.getElementById('check-municipio')
    const selectMunicipio = document.getElementById('select-municipio')
    const checkboxZona = document.getElementById('check-zona')
    const selectZona = document.getElementById('select-zona')
    const checkboxDefensor = document.getElementById('check-defensor')
    const selectDefensor = document.getElementById('select-defensor')
    const fechaInicio = document.getElementById('fecha-inicio')
    const fechaFinal = document.getElementById('fecha-final')
    fechaInicio.value = ''
    fechaFinal.value = ''
    checkboxAsesor.checked = false;
    checkboxMunicipio.checked = false;
    checkboxZona.checked = false;
    checkboxDefensor.checked = false;
    selectMunicipio.value = 0;
    selectZona.value = 0;
    selectAsesor.disabled = true
    selectDefensor.disabled = true
    selectAsesor.value = 0;
    selectDefensor.value = 0;
    checkboxAsesor.disabled = true
    checkboxDefensor.disabled = true
  }

  deleteFiltros = () => {
    const deleteButton = document.getElementById('deleteButton');
    deleteButton.style.display = 'none';
    const table = document.getElementById('table-body')
    table.innerHTML = ''
    this.limpiarFiltros()
    this.handleConsultarAsesorias()
  }

  borrarAsesor = () => {
    const selectAsesor2 = document.getElementById('select-asesor')
    selectAsesor2.innerHTML = ''
    const option3 = document.createElement('option')
    option3.value = 0
    option3.text = "Selecciona una opcion"
    selectAsesor2.appendChild(option3)
  }

  borrarDefensor = () => {
    const selectdefensor2 = document.getElementById('select-defensor')
    const option2 = document.createElement('option')
    selectdefensor2.innerHTML = ''
    option2.value = 0
    option2.text = "Selecciona una opcion"
    selectdefensor2.appendChild(option2)
  }





  handleConsultarAsesorias = async () => {
    try {

      const deleteButton = document.getElementById('deleteButton');
      deleteButton.style.display = 'none';

      const asesoriasResponse = await this.model.getAsesorias(this.#pagina)
      const asesorias = asesoriasResponse.asesorias

      const table = document.getElementById('table-body')
      const rowsTable = document.getElementById('table-body').rows.length
      if (this.validateRows(rowsTable)) {
        asesorias.forEach(asesoria => {
          table.appendChild(this.crearRow(asesoria))
        })
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  validateRows = rowsTable => {
    if (rowsTable > 0) {
      this.cleanTable(rowsTable);
      return true
    } else { return true }
  }

  cleanTable = rowsTable => {
    const table = document.getElementById('table-body')
    for (let i = rowsTable - 1; i >= 0; i--) {
      table.deleteRow(i)
    }
  }

  handleConsultarAsesoriasById = async id => {
    try {
      const button = document.querySelector('.consulta-button')
      button.disabled = true
      const asesoria = await this.model.getAsesoriaById(id)
      const persona = asesoria.asesoria.persona
      const domicilio = await this.model.getColoniaById(
        persona.domicilio.id_colonia
      )
      const modal = document.querySelector('modal-asesoria')
      const dataAsesoria = new DataAsesoria(asesoria, domicilio)

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


  handleFiltros = async () => {


    const checkboxAsesor = document.getElementById('check-asesor')
    const checkboxMunicipio = document.getElementById('check-municipio')
    const checkboxZona = document.getElementById('check-zona')
    const checkboxDefensor = document.getElementById('check-defensor')

    const selectAsesor = document.getElementById('select-asesor')
    const selectMunicipio = document.getElementById('select-municipio')
    const selectZona = document.getElementById('select-zona')
    const selectDefensor = document.getElementById('select-defensor')

    const fechaInicio = document.getElementById('fecha-inicio')
    const fechaFinal = document.getElementById('fecha-final')

    const table = document.getElementById('table-body')
    table.innerHTML = ''
    const filtros = {
      fecha_inicio: fechaInicio.value,
      fecha_final: fechaFinal.value,
      id_municipio: checkboxMunicipio.checked ? selectMunicipio.value : null,
      id_zona: checkboxZona.checked ? selectZona.value : null,
      id_asesor: checkboxAsesor.checked ? selectAsesor.value : null,
      id_defensor: checkboxDefensor.checked ? selectDefensor.value : null,
    }
    try {
      console.log(filtros)
      const asesoriasResponse = await this.model.getAsesoriasByFilters(filtros)
      if (asesoriasResponse.length === 0) {
        const deleteButton = document.getElementById('deleteButton');
        deleteButton.style.display = 'none';
      }
      else {
        const deleteButton = document.getElementById('deleteButton');
        deleteButton.style.display = 'block';
      }
      asesoriasResponse.forEach(asesoria => {
        table.appendChild(this.crearRow(asesoria))
      })
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

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
            <td class="px-6 py-4 text-right">
                <button href="#" class="consulta-button font-medium text-[#db2424] hover:underline" onclick="handleConsultarAsesoriasById(this.value)" value="${asesoria.datos_asesoria.id_asesoria}">Consultar</button>
            </td>`

    return row
  }

  agregarMunicipios = async () => {
    const municipios = await this.model.getMunicipios()
    const select = document.getElementById('select-municipio')
    municipios.forEach(municipio => {
      const option = document.createElement('option')
      option.value = municipio.id_municipio
      option.text = municipio.nombre_municipio
      select.appendChild(option)
    })
  }

  agregarZonas = async () => {
    const select = document.getElementById('select-zona')
    const zonas = await this.model.getZonas()
    zonas.forEach(zona => {
      const option = document.createElement('option')
      option.value = zona.id_zona
      option.text = zona.nombre_zona
      select.appendChild(option)
    })
  }

  agregarDefensores = async () => {
    try {
      const select = document.getElementById('select-defensor')
      const id_zona = document.getElementById('select-zona').value
      console.log(id_zona)

      const defensores = await this.model.getDefensoresByZona(id_zona)

      if (defensores.length !== 0) {
        this.borrarDefensor()
      }

      defensores.forEach(defensor => {
        const option = document.createElement('option')
        option.value = defensor.id_defensor
        option.text = defensor.nombre_defensor
        select.appendChild(option)
      })
    } catch (error) {
      console.error(error.message)
    }
  }

  agregarAsesores = async () => {

    try {
      const select = document.getElementById('select-asesor')
      const id_zona = document.getElementById('select-zona').value
      const asesores = await this.model.getAsesoresByZona(id_zona)
      const option = document.createElement('option')

      if (asesores.length !== 0) {
        this.borrarAsesor()

      }

      asesores.forEach(asesor => {
        const option = document.createElement('option')
        option.value = asesor.id_asesor
        option.text = asesor.nombre_asesor
        select.appendChild(option)
      })
    } catch (error) {
      console.error(error.message)
    }
  }
}
export { ConsultaController }
