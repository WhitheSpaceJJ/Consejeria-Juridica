class APIModel {
  /*
 API_URL = 'http://200.58.127.244'
 USERS_API_URL = `${this.API_URL}:3002`
 ASESORIAS_API_URL = `${this.API_URL}:3009`
 CP_API_URL = `${this.API_URL}:3012`
 DEMANDAS_API_URL = `${this.API_URL}:3026`
 */
  API_URL = 'http://localhost'

  USERS_API_URL = import.meta.env.VITE_DEPLOY_USUARIOS === 'DEPLOYA' ? import.meta.env.VITE_BACKEND_USUARIOS : import.meta.env.VITE_BACKEND_USUARIOS_HTTPS
  ASESORIAS_API_URL = import.meta.env.VITE_DEPLOY_ASESORIAS === 'DEPLOYA' ? import.meta.env.VITE_BACKEND_ASESORIAS : import.meta.env.VITE_BACKEND_ASESORIAS_HTTPS
  CP_API_URL = import.meta.env.VITE_DEPLOY_CODIGOS_POSTALES === 'DEPLOYA' ? import.meta.env.VITE_BACKEND_CODIGOS_POSTALES : import.meta.env.VITE_BACKEND_CODIGOS_POSTALES_HTTPS
  DEMANDAS_API_URL = import.meta.env.VITE_DEPLOY_DEMANDAS === 'DEPLOYA' ? import.meta.env.VITE_BACKEND_DEMANDAS : import.meta.env.VITE_BACKEND_DEMANDAS_HTTPS

  user = JSON.parse(sessionStorage.getItem('user'))


  constructor() { }

  // --------------------Usuarios------------------------
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



  // --------------------Proceso Judicial------------------------
  async postProcesoJudicial(data) {
    const url = `${this.DEMANDAS_API_URL}/proceso-judicial`
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

  async putProcesoJudicial(id, data) {
    const url = `${this.DEMANDAS_API_URL}/proceso-judicial/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
      body: JSON.stringify(data),
    })

    console.log(url)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }

  }
  /*


  async getEstadosCivilesTotal() {
    const url = `${this.ASESORIAS_API_URL}/estados-civiles/paginacion?total=${true}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }
    else {
      throw new Error('Error en la petición')
    }
  }

  async getEstadosCivilesPagina(pagina) {
    const url = `${this.ASESORIAS_API_URL}/estados-civiles/paginacion?pagina=${pagina}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }

    else {
      throw new Error('Error en la petición')

    }
  }
  Realiza metodos similares para escolaridad,ocupacion,etnia, juzgados; 

  */
  async getEscolaridadesTotal() {
    const url = `${this.DEMANDAS_API_URL}/escolaridad/paginacion?total=${true}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }
    else {
      throw new Error('Error en la petición')
    }

  }
  async getEscolaridadesPagina(pagina) {
    const url = `${this.DEMANDAS_API_URL}/escolaridad/paginacion?pagina=${pagina}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }

    else {
      throw new Error('Error en la petición')

    }
  }
  async getDefensoresByDistrito2(id) {
    const url = `${this.ASESORIAS_API_URL}/defensores/distrito?id_distrito_judicial=${id}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      data = data.defensores
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  async getOcupacionesTotal() {
    const url = `${this.DEMANDAS_API_URL}/ocupacion/paginacion?total=${true}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }
    else {
      throw new Error('Error en la petición')
    }

  }

  async getOcupacionesPagina(pagina) {
    const url = `${this.DEMANDAS_API_URL}/ocupacion/paginacion?pagina=${pagina}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }

    else {
      throw new Error('Error en la petición')

    }
  }

  async getEtniasTotal() {
    const url = `${this.DEMANDAS_API_URL}/etnia/paginacion?total=${true}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }
    else {
      throw new Error('Error en la petición')
    }

  }

  async getEtniasPagina(pagina) {
    const url = `${this.DEMANDAS_API_URL}/etnia/paginacion?pagina=${pagina}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }

    else {
      throw new Error('Error en la petición')

    }
  }


  async getJuzgadosTotal() {

    const url = `${this.DEMANDAS_API_URL}/juzgado/paginacion?total=${true}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }
    else {
      throw new Error('Error en la petición')
    }
  }

  async getJuzgadosPagina(pagina) {
    const url = `${this.DEMANDAS_API_URL}/juzgado/paginacion?pagina=${pagina}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    }

    else {
      throw new Error('Error en la petición')

    }
  }



  async getProcesosJudicialesByDefensor(id, estatus) {
    const url = `${this.DEMANDAS_API_URL}/proceso-judicial/defensor?id_defensor=${id}&estatus_proceso=${estatus}`
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
  async getProcesosJudicialesEnTramite(estatus) {
    const url = `${this.DEMANDAS_API_URL}/proceso-judicial/tramite?estatus_proceso=${estatus}`
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

  async getProcesosBusqueda(id_defensor, id_distrito_judicial, total, pagina,estatus_proceso) {
    const url = new URL(`${this.DEMANDAS_API_URL}/proceso-judicial/busqueda/`);

    const params = new URLSearchParams();
    if (estatus_proceso) params.append('estatus_proceso', estatus_proceso);
    if (id_defensor) params.append('id_defensor', id_defensor);
    if (id_distrito_judicial) params.append('id_distrito_judicial', id_distrito_judicial);
    if (total) params.append('total', total);
    if (pagina) params.append('pagina', pagina);


    url.search = params.toString();
    

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      throw new Error('Error en la petición');
    }

  }
  


  async getProcesosJudiciales() {
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

  async getProcesoJudicialById(id) {
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


  async getTotalDemandas() {
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

  async getDemandaById(id) {
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

  //---------------------  Juzgados ------------------------
  async getJuzgadoByID(id) {
    const url = `${this.DEMANDAS_API_URL}/juzgado/${id}`
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

  async getJuzgados() {
    const url = `${this.DEMANDAS_API_URL}/juzgado`
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



  async getJuzgados2() {
    const url = `${this.DEMANDAS_API_URL}/juzgado?activo=true`
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
  async putJuzgado(id, data) {
    const url = `${this.DEMANDAS_API_URL}/juzgado/${id}`
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

  async postJuzgado(data) {
    const url = `${this.DEMANDAS_API_URL}/juzgado`
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
  // -------------------- Escolaridad ------------------------
  async getEscolaridadByID(id) {
    const url = `${this.DEMANDAS_API_URL}/escolaridad/${id}`
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




  async putEscolaridad(id, data) {
    const url = `${this.DEMANDAS_API_URL}/escolaridad/${id}`
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

  async postEscolaridad(data) {
    const url = `${this.DEMANDAS_API_URL}/escolaridad`
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


  async getEscolaridades() {
    const url = `${this.DEMANDAS_API_URL}/escolaridad`
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

  async getEscolaridades2() {
    const url = `${this.DEMANDAS_API_URL}/escolaridad?activo=true`
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


  // -------------------- Etnia ------------------------


  async getEtniaByID(id) {
    const url = `${this.DEMANDAS_API_URL}/etnia/${id}`
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
  async putEtnia(id, data) {
    const url = `${this.DEMANDAS_API_URL}/etnia/${id}`
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
  async getEtnias() {
    const url = `${this.DEMANDAS_API_URL}/etnia`
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
  async getEtnias2() {
    const url = `${this.DEMANDAS_API_URL}/etnia?activo=true`
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


  async postEtnia(data) {
    const url = `${this.DEMANDAS_API_URL}/etnia`
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

  // -------------------- Ocupacion ------------------------
  async postOcupacion(data) {
    const url = `${this.DEMANDAS_API_URL}/ocupacion`
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

  async getOcupacionByID(id) {
    const url = `${this.DEMANDAS_API_URL}/ocupacion/${id}`
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

  async putOcupacion(id, data) {
    const url = `${this.DEMANDAS_API_URL}/ocupacion/${id}`
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

  async getOcupaciones() {
    const url = `${this.DEMANDAS_API_URL}/ocupacion`
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

  async getOcupaciones2() {
    const url = `${this.DEMANDAS_API_URL}/ocupacion?activo=true`
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
  async getTurno(id) {
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
  async putTurno(id, turno) {
    const url = `${this.ASESORIAS_API_URL}/turnos/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
      body: JSON.stringify(turno),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error en la petición');
    }

  }

  async getTurnos() {
    const url = `${this.ASESORIAS_API_URL}/turnos`
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
  async getTurnosBusqueda(id_defensor, id_distrito_judicial, total, pagina) {
    const url = new URL(`${this.ASESORIAS_API_URL}/turnos/busqueda`);

    const params = new URLSearchParams();

    if (id_defensor) params.append('id_defensor', id_defensor);
    if (id_distrito_judicial) params.append('id_distrito_judicial', id_distrito_judicial);
    if (total) params.append('total', total);
    if (pagina) params.append('pagina', pagina);


    url.search = params.toString();
 

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      throw new Error('Error en la petición');
    }

  }


  async getTurnosBydIDDistrito(id_distrito_judicial) {
    const url = `${this.ASESORIAS_API_URL}/turnos/distrito?id_distrito_judicial=${id_distrito_judicial}`
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
  async getTurnoById(id) {
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
  async getTurno(id) {
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
  async getTurnosByDefensor(idDefensor) {
    const url = `${this.ASESORIAS_API_URL}/turnos/defensor/${idDefensor}`

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

  //  --------------------Tipo de Juicio------------------------
  async getTiposJuicioByID(id) {
    const url = `${this.ASESORIAS_API_URL}/tipos-de-juicio/${id}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error en la petición');
      }
    } catch (error) {
      console.log('Error:', error.message);
      return null;
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
  async getTiposJuicio2() {
    const url = `${this.ASESORIAS_API_URL}/tipos-de-juicio?activo=true`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Error en la petición');
    }
  }

  //--------------------Asesoria------------------------


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


  // --------------------Municipio Distrito------------------------
  async getMunicipiosByDistrito(idDistro) {
    const url = `${this.ASESORIAS_API_URL}/municipios-distritos/distrito/${idDistro}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      let data = await response.json()
      data = data.municipios
      return data
    }
    else {
      throw new Error('Error en la petición')
    }
  }


  // -------------------- Distrito  Judiciales------------------------

  async getDistritos() {
    const url = `${this.ASESORIAS_API_URL}/distritos-judiciales`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      //console.log("Entro a distritos")
      let data = await response.json()
      data = data.distritosJudiciales
      return data
    }
    else {
      console.log("Error en la petición")
      throw new Error('Error en la petición')
    }
  }




  //--------------------Asesores------------------------

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



  async getAsesorID(id_asesor) {
    const url = `${this.ASESORIAS_API_URL}/asesores/${id_asesor}`

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
  async getAsesores2() {
    const url = `${this.ASESORIAS_API_URL}/asesores?activo=true`

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

  // --------------------Defensores------------------------

  async getDefensorID(id_defensor) {
    const url = `${this.ASESORIAS_API_URL}/defensores/${id_defensor}`

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


  async getDefensores2() {
    const url = `${this.ASESORIAS_API_URL}/defensores?activo=true`

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

  // --------------------Genero------------------------
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
  async getGeneros2() {
    const url = `${this.ASESORIAS_API_URL}/generos?activo=true`

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


  async getGeneroByID(id) {
    const url = `${this.ASESORIAS_API_URL}/generos/${id}`

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

  // --------------------Prueba------------------------
  async getPruebaByID(id) {
    const url = `${this.DEMANDAS_API_URL}/prueba/${id}`
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

  async getPruebasBusqueda(id_proceso_judicial, total, pagina) {
    const url = new URL(`${this.DEMANDAS_API_URL}/prueba/proceso-judicial`);

    const params = new URLSearchParams();

    if (id_proceso_judicial) params.append('id_proceso_judicial', id_proceso_judicial);
    if (total) params.append('total', total);
    if (pagina) params.append('pagina', pagina);


    url.search = params.toString();

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      throw new Error('Error en la petición');
    }

  }

  async postPrueba(data) {
    const url = `${this.DEMANDAS_API_URL}/prueba`
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

  async putPrueba(id, data) {
    const url = `${this.DEMANDAS_API_URL}/prueba/${id}`
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


  // --------------------Estado Procesal------------------------
  async getEstadoProcesalByID(id) {
    const url = `${this.DEMANDAS_API_URL}/estado-procesal/${id}`
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


  async getEstadosBusqueda(id_proceso_judicial, total, pagina) {
 
    const url = new URL(`${this.DEMANDAS_API_URL}/estado-procesal/proceso-judicial`);

    const params = new URLSearchParams();

    if (id_proceso_judicial) params.append('id_proceso_judicial', id_proceso_judicial);
    if (total) params.append('total', total);
    if (pagina) params.append('pagina', pagina);


    url.search = params.toString();

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      throw new Error('Error en la petición');
    }

  }

  async postEstadoProcesal(data) {
    const url = `${this.DEMANDAS_API_URL}/estado-procesal`
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


  async putEstadoProcesal(id, data) {
    const url = `${this.DEMANDAS_API_URL}/estado-procesal/${id}`
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



  // --------------------Observacion------------------------

  async getObservacionByID(id) {
    const url = `${this.DEMANDAS_API_URL}/observacion/${id}`
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


  async getObservacionesBusqueda(id_proceso_judicial, total, pagina) {
    const url = new URL(`${this.DEMANDAS_API_URL}/observacion/proceso-judicial`);

    const params = new URLSearchParams();

    if (id_proceso_judicial) params.append('id_proceso_judicial', id_proceso_judicial);
    if (total) params.append('total', total);
    if (pagina) params.append('pagina', pagina);


    url.search = params.toString();

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      throw new Error('Error en la petición');
    }


  }



  async postObservacion(data) {
    const url = `${this.DEMANDAS_API_URL}/observacion`
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




  async putObservacion(id, data) {
    const url = `${this.DEMANDAS_API_URL}/observacion/${id}`
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



  // --------------------Resolucion------------------------


  async getResolucionByID(id) {
    const url = `${this.DEMANDAS_API_URL}/resolucion/${id}`
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



  async getResolucionesBusqueda(id_proceso_judicial, total, pagina) {
    const url = new URL(`${this.DEMANDAS_API_URL}/resolucion/proceso-judicial`);

    const params = new URLSearchParams();

    if (id_proceso_judicial) params.append('id_proceso_judicial', id_proceso_judicial);
    if (total) params.append('total', total);
    if (pagina) params.append('pagina', pagina);


    url.search = params.toString();

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      throw new Error('Error en la petición');
    } 
  }




  async postResolucion(data) {
    const url = `${this.DEMANDAS_API_URL}/resolucion`
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



  async putResolucion(id, data) {
    const url = `${this.DEMANDAS_API_URL}/resolucion/${id}`
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




  // --------------------Familiar------------------------

  async getFamiliarByID(id) {
    const url = `${this.DEMANDAS_API_URL}/familiar/${id}`
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



  async getFamiliaresBusqueda(id_promovente, total, pagina) {
    const url = new URL(`${this.DEMANDAS_API_URL}/familiar/promovente`);

    const params = new URLSearchParams();

    if (id_promovente) params.append('id_promovente', id_promovente);
    if (total) params.append('total', total);
    if (pagina) params.append('pagina', pagina);


    url.search = params.toString();
    
    
    const response = await fetch(url.toString(), {
      method: 'GET',  
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
    else {
      throw new Error('Error en la petición');
    }
    
  }


  async postFamiliar(data) {
    const url = `${this.DEMANDAS_API_URL}/familiar`
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




  async putFamiliar(id, data) {
    const url = `${this.DEMANDAS_API_URL}/familiar/${id}`
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







}

export { APIModel }
