class APIModel {
  API_URL = 'http://200.58.127.244'
  USERS_API_URL = `${this.API_URL}:3002`
  ASESORIAS_API_URL = `${this.API_URL}:3009`
  CP_API_URL = `${this.API_URL}:3012`
  user = JSON.parse(sessionStorage.getItem('user'))
  DEMANDAS_API_URL = `${this.API_URL}:3026`

  // eslint-disable-next-line no-useless-constructor
  constructor() {}

  // GET methods
 //--------------------- DEMANDAS ------------------------

 async getTotalDemandas(){
  const url = `${this.DEMANDAS_API_URL}/proceso-judicial`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.token}`,
    },
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    throw new Error('Error en la petición')
  }
}

async getDemandaById(id){
  const url = `${this.DEMANDAS_API_URL}/proceso-judicial/${id}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.token}`,
    },
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    throw new Error('Error en la petición')
  }
}


// --------------------Turno------------------------
async getTurno(id){
  const url = `${this.ASESORIAS_API_URL}/turnos/${id}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.token}`,
    },
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    throw new Error('Error en la petición')
  }
}
  async login({ correo, password }) {
    const url = `${this.USERS_API_URL}/usuarios/usuario?correo=${correo}&password=${password}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async signUp(userObject) {
    const url = `${this.USERS_API_URL}/usuarios`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: ` ${this.user.token}`,
      },
      body: JSON.stringify(userObject),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async recover(correo) {
    const url = `${this.USERS_API_URL}/usuarios/recuperacion?correo=${correo}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getAsesorias(pagina) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/paginacion?pagina=${pagina}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getTotalAsesorias(){
    const url = `${this.ASESORIAS_API_URL}/asesorias/total-asesorias`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getAsesoriaByFullName({ nombre, apellidoMaterno, apellidoPaterno }) {
    const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/buscar`)
    const params = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
    }
    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      return await response.json()
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getAsesoriaById(id) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/${id}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }
  // ---------------------- CP ----------------------
  async getColoniaById(idColonia) {
    const url = `${this.CP_API_URL}/colonias/${idColonia}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getAsesores() {
    const url = `${this.ASESORIAS_API_URL}/asesores`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getDefensores() {
    const url = `${this.ASESORIAS_API_URL}/defensores`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getGeneros() {
    const url = `${this.ASESORIAS_API_URL}/generos`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }
  // ---------------------- CP ----------------------
  async getDomicilioByCP(cp) {
    const url = `${this.CP_API_URL}/codigospostales/cp/${cp}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getMotivos() {
    const url = `${this.ASESORIAS_API_URL}/motivos`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getEstadosCiviles() {
    const url = `${this.ASESORIAS_API_URL}/estados-civiles`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getTiposJuicio() {
    const url = `${this.ASESORIAS_API_URL}/tipos-de-juicio`

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async putAsesoria({ id, data }) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async postAsesoria(data) {
    const url = `${this.ASESORIAS_API_URL}/asesorias`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
      body: JSON.stringify(data),
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getMunicipios() {
    const url = `${this.CP_API_URL}/estados/26`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      let data = await response.json()
      data = data.estado.municipios
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getZonas() {
    const url = `${this.ASESORIAS_API_URL}/zonas`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      data = data.zonas
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getDefensoresByZona(id) {
    const url = `${this.ASESORIAS_API_URL}/defensores/zona/${id}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      data = data.defensor
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getAsesoresByZona(id) {
    const url = `${this.ASESORIAS_API_URL}/asesores/zona/${id}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      data = data.asesores
      console.log(data)
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getAsesoriasByFilters(filtros) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/filtro?filtros={"fecha-inicio":"${filtros.fecha_inicio}","fecha-final":"${filtros.fecha_final}","id_municipio":${filtros.id_municipio},"id_zona":${filtros.id_zona},"id_defensor":${filtros.id_defensor},"id_asesor":${filtros.id_asesor}}`
    // http://200.58.127.244:3009/asesorias/filtro?filtros={"fecha-inicio":"2021-10-23","fecha-final":"2024-11-22","id_municipio":251,"id_zona":null,"id_defensor":null,"id_asesor":null}
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      data = data.asesorias
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }
  
  async getTotalAsesoriasfiltro(filtros) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/total-asesorias-filtro?filtros={"fecha-inicio":"${filtros.fecha_inicio}","fecha-final":"${filtros.fecha_final}","id_municipio":${filtros.id_municipio},"id_zona":${filtros.id_zona},"id_defensor":${filtros.id_defensor},"id_asesor":${filtros.id_asesor}}`
    // http://200.58.127.244:3009/asesorias/filtro?filtros={"fecha-inicio":"2021-10-23","fecha-final":"2024-11-22","id_municipio":251,"id_zona":null,"id_defensor":null,"id_asesor":null}
  console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getAsesoriasByFiltersPaginacion(pagina,filtros) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/paginacion-filtro?pagina=${pagina}&filtros={"fecha-inicio":"${filtros.fecha_inicio}","fecha-final":"${filtros.fecha_final}","id_municipio":${filtros.id_municipio},"id_zona":${filtros.id_zona},"id_defensor":${filtros.id_defensor},"id_asesor":${filtros.id_asesor}}`
    // http://200.58.127.244:3009/asesorias/filtro?filtros={"fecha-inicio":"2021-10-23","fecha-final":"2024-11-22","id_municipio":251,"id_zona":null,"id_defensor":null,"id_asesor":null}
   console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      console.log(data)
      data = data.asesorias
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }
  


   /*
  async getAsesoriasDescarga(filtros, campos) {
    let url = `${this.ASESORIAS_API_URL}/asesorias/descargar-excel?campos=${campos}`
    if (filtros === null) {
      url = `${this.ASESORIAS_API_URL}/asesorias/descargar-excel?campos=${campos}`
    } else {
      url = `${this.ASESORIAS_API_URL}/asesorias/descargar-excel?filtros={"fecha-inicio":"${filtros.fecha_inicio}","fecha-final":"${filtros.fecha_final}","id_municipio":${filtros.id_municipio},"id_zona":${filtros.id_zona},"id_defensor":${filtros.id_defensor},"id_asesor":${filtros.id_asesor}}&campos=${campos}`
    }
    try {
      // Construir la URL para el servicio
      // Realizar la llamada al servicio y descargar el archivo
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      // Verificar si la respuesta es exitosa y descargar el archivo
      if (response.ok) {
        // Configurar los encabezados para la descarga del archivo
        const dispositionHeader = response.headers.get('content-disposition');
        const filenameMatch = dispositionHeader && dispositionHeader.match(/filename="(.*)"/);
        const filename = filenameMatch ? filenameMatch[1] : 'asesorias.xlsx';

        // Descargar el archivo
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return {"status": "success", "message": "Archivo descargado correctamente"};
      } else {
        // Manejar errores de la petición
        throw new Error(`Error en la petición: ${response.status} - ${response.statusText}`);
      }
    } catch (error) {
      // Manejar errores generales
      throw new Error(`Error en la ejecución del método: ${error.message}`);
    }
  }
   */

}

export { APIModel }
