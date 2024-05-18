class APIModel {
  /*
  API_URL = 'http://200.58.127.244'
  USERS_API_URL = `${this.API_URL}:3002`
  ASESORIAS_API_URL = `${this.API_URL}:3009`
  CP_API_URL = `${this.API_URL}:3012`
  */
  API_URL = 'http://localhost'
  USERS_API_URL = `${this.API_URL}:3002`
  ASESORIAS_API_URL = `${this.API_URL}:3009`
  CP_API_URL = `${this.API_URL}:3012`
  user = JSON.parse(sessionStorage.getItem('user'))

  constructor() { }




  // --------------------Turno------------------------

  //Metodo para obtener el turno por su id
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
  
  //Metodo para actualizar un turno existente por su id y los datos a modificar
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




   // ---------------------- Usuarios ----------------------

  //Metodo para iniciar sesion con un usuario y contraseña
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
 
  //Metodo para recuperar la contraseña de un usuario
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

  //Metodo para obtener todos los usuarios
  async getUsuarios() {
    const url = `${this.USERS_API_URL}/usuarios`
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

  //Metodo para obtener un usuario por su id
  async getUsuarioByID(id) {
    const url = `${this.USERS_API_URL}/usuarios/${id}`
    const response = await fetch(url, {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.user.token}` },
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  //Metodo para agregar un nuevo usuario
  async postUsuario(data) {
    const url = `${this.USERS_API_URL}/usuarios`
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

  //Metodo para actualizar un usuario existente por su id y los datos a modificar
  async putUsuario(id, data) {
    const url = `${this.USERS_API_URL}/usuarios/${id}`
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
 
   // ---------------------- Permisos ----------------------

 async getPermisos() {
    const url = `${this.USERS_API_URL}/permisos`
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

  



   // ---------------------- Tipo Usuarios ----------------------
    
   async getTipoUsuarios() {
    const url = `${this.USERS_API_URL}/tipo-usuario`
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
    
 
  // ---------------------- Asesorias ----------------------
  //Metodo para obtener todas las asesorias deacurdos a la pagina
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
  
  //Metodo para obtener el total de asesorias del sistema
  async getTotalAsesorias() {
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

  //Metodo para obtener una asesoria por el nombre completo de la persona, es decir, nombre, apellido paterno y apellido materno
  async getAsesoriaByFullName({ nombre, apellidoMaterno, apellidoPaterno }) {
    const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/buscar`)
    const params = {
      nombre,
      apellido_paterno: apellidoPaterno,
      apellido_materno: apellidoMaterno,
    }
    url.search = new URLSearchParams(params).toString()

    console.log(url)


    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  //Metodo para obtener una asesoria por su id
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
  //Metodo para actualizar una asesoria existente por su id y los datos a modificar
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

  //Metodo para agregar una nueva asesoria
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

  //Metodo para obtener las asesorias en base a los filtros
  async getAsesoriasByFilters(filtros) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/filtro?filtros={"fecha-inicio":"${filtros.fecha_inicio}","fecha-final":"${filtros.fecha_final}","id_municipio":${filtros.id_municipio},"id_zona":${filtros.id_zona},"id_defensor":${filtros.id_defensor},"id_asesor":${filtros.id_asesor},"fecha_registro":"${filtros.fecha_registro}","id_distrito_judicial":${filtros.id_distrito}}`;
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

  //Metodo para obtener el total de asesorias en base a los filtros
  async getTotalAsesoriasfiltro(filtros) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/total-asesorias-filtro?filtros={"fecha-inicio":"${filtros.fecha_inicio}","fecha-final":"${filtros.fecha_final}","id_municipio":${filtros.id_municipio},"id_zona":${filtros.id_zona},"id_defensor":${filtros.id_defensor},"id_asesor":${filtros.id_asesor},"fecha_registro":"${filtros.fecha_registro}","id_distrito_judicial":${filtros.id_distrito}}`;
    // http://200.58.127.244:3009/asesorias/filtro?filtros={"fecha-inicio":"2021-10-23","fecha-final":"2024-11-22","id_municipio":251,"id_zona":null,"id_defensor":null,"id_asesor":null}
    //console.log(url)
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


  //Metodo para obtener las asesorias en base al filtro y paginacion
  async getAsesoriasByFiltersPaginacion(pagina, filtros) {
    //console.log("Entro a filtros paginacion")
    const url = `${this.ASESORIAS_API_URL}/asesorias/paginacion-filtro?filtros={"fecha-inicio":"${filtros.fecha_inicio}","fecha-final":"${filtros.fecha_final}","id_municipio":${filtros.id_municipio},"id_zona":${filtros.id_zona},"id_defensor":${filtros.id_defensor},"id_asesor":${filtros.id_asesor},"fecha_registro":"${filtros.fecha_registro}","id_distrito_judicial":${filtros.id_distrito}} &pagina=${pagina}`;

    // http://200.58.127.244:3009/asesorias/filtro?filtros={"fecha-inicio":"2021-10-23","fecha-final":"2024-11-22","id_municipio":251,"id_zona":null,"id_defensor":null,"id_asesor":null}
    //console.log(url)
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    if (response.ok) {
      let data = await response.json()
      // console.log(data)
      data = data.asesorias
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  //Metodo para obtener las asesorias en formato de excel en base a los filtros y campos seleccionados
  async getAsesoriasDescaga(filtros, campos) {
    let url = {};
    if (filtros !== null && campos !== null) {
      url = this.ASESORIAS_API_URL + "/asesorias/descargar-excel?filtros={\"fecha-inicio\":\"" + filtros.fecha_inicio + "\",\"fecha-final\":\"" + filtros.fecha_final + "\",\"id_municipio\":" + filtros.id_municipio + ",\"id_zona\":" + filtros.id_zona + ",\"id_defensor\":" + filtros.id_defensor + ",\"id_asesor\":" + filtros.id_asesor + ",\"fecha_registro\":\"" + filtros.fecha_registro + "\",\"id_distrito_judicial\":" + filtros.id_distrito + "}&campos=" + JSON.stringify(campos);
    } else if (filtros === null && campos !== null) {
      url = `${this.ASESORIAS_API_URL}/asesorias/descargar-excel?campos=${JSON.stringify(campos)}`
    } else if (filtros !== null && campos === null) {
      url = this.ASESORIAS_API_URL + "/asesorias/descargar-excel?filtros={\"fecha-inicio\":\"" + filtros.fecha_inicio + "\",\"fecha-final\":\"" + filtros.fecha_final + "\",\"id_municipio\":" + filtros.id_municipio + ",\"id_zona\":" + filtros.id_zona + ",\"id_defensor\":" + filtros.id_defensor + ",\"id_asesor\":" + filtros.id_asesor + ",\"fecha_registro\":\"" + filtros.fecha_registro + "\",\"id_distrito_judicial\":" + filtros.id_distrito + "}";
    }
    else if (filtros === null && campos === null) {
      url = `${this.ASESORIAS_API_URL}/asesorias/descargar-excel`
    }

    try {
      // Construir la URL para el servicio
      // Realizar la llamada al servicio y descargar el archivo
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      // Verificar si la solicitud fue exitosa (código de estado 200)
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();

        // Crear un Blob a partir de los datos
        const blob = new Blob([arrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        // Crear un enlace temporal y descargar directamente
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'asesorias.xlsx';
        link.click();

        // Liberar el objeto URL creado
        window.URL.revokeObjectURL(link.href);
      } else {
        throw new Error(`Error en la solicitud: ${response.statusText}`);

      }
    } catch (error) {
      // Manejar errores generales
      throw new Error(`Error en la ejecución del método: ${error.message}`);
    }
  }

   
  // ---------------------- Municipios Distritos ----------------------
  //Metodo para obtener los municipios asociados a un distrito judicial por su id
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

  //---------------------- Distritos Judiciales ----------------------
  //Metodo para obtener todos los distritos judiciales
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


  // ---------------------- Codidos Postales  ----------------------
  //Metodo para obtener los datos de la colonia, estado, municipio, ciudad, codigo postal esto a traves del id de la colonia
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
  
  //Metodo para obtener los datos de la colonia, estado, municipio, ciudad, codigo postal esto a traves del codigo postal
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
  //---------------------- Asesores ----------------------
  //Metodo para obtener todos los asesores
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
  //Metodo para obtener todos los asesores activos del sistema
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


  //Metodo para obtener un asesor por su id
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
  
  //Metodo para obtener los asesores por zona 
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
      // console.log(data)
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }

  //---------------------- Empleados ----------------------
  //Metodo para agregar un nuevo empleado
  async postEmpleado(data) {
    const url = `${this.ASESORIAS_API_URL}/empleados`
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

  //Metodo para actualizar un empleado existente por su id y los datos a modificar
  async putEmpleado(id, data) {
    const url = `${this.ASESORIAS_API_URL}/empleados/${id}`
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

//---------------------- Defensores ----------------------
//Metodo para obtener a un defensor por su id
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

  //Metodo para obtener los defensores por zona
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

   
   //Metodo para obtener todos los defensores 
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

  //Metodo para obtener todos los defensores activos del sistema
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
// ---------------------- Estados ----------------------
//Metodo para obtener los municipios relacionados al estado numero 26 en este caso sonora
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

  //---------------------- Zonas ----------------------
  //Metodo para obtener todas las zonas
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

   // ---------------------- Tipos de Juicio ----------------------
  //Metodo para agregar un nuevo tipo de juicio
  async postTiposJuicio(tipoDeJuicio) {
    const url = `${this.ASESORIAS_API_URL}/tipos-de-juicio`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(tipoDeJuicio),
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
   
  //Metodo para actualizar un tipo de juicio existente por su id y los datos a modificar
  async putTiposJuicio(id, tipoDeJuicio) {
    const url = `${this.ASESORIAS_API_URL}/tipos-de-juicio/${id}`;
    try {
      // console.log(tipoDeJuicio) 
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(tipoDeJuicio),
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

  // Metodo para obtener el tipo de juicio por su id
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

  //Metodo para obtener todos los tipos de juicio
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
  //Metodo para obtener todos los tipos de juicio activos del sistema
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

  // ---------------------- Motivos ----------------------

  //Metodo para obtener un motivo por su id
  async getMotivoByID(id) {
    const url = `${this.ASESORIAS_API_URL}/motivos/${id}`;
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

  //Metodo para agregar un nuevo motivo
  async postMotivo(motivo) {
    const url = `${this.ASESORIAS_API_URL}/motivos`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(motivo),
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

  //Metodo para actualizar un motivo existente por su id y los datos a modificar
  async putMotivo(id, motivo) {
    const url = `${this.ASESORIAS_API_URL}/motivos/${id}`;
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(motivo),
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

  //Metodo  para obtener todos los motivos
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
  //Metodo para obtener todos los motivos activos del sistema
  async getMotivos2() {
    const url = `${this.ASESORIAS_API_URL}/motivos?activo=true`

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



  //---------------------- Generos ----------------------
  //Metodo para obtener todos los generos
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
  //Metodo para obtener todos los generos activos del sistema
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
  //Metodo para obtener un genero por su id
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
//Metodo para actualizar un genero existente por su id y los datos a modificar
  async putGenero(id, data) {
    const url = `${this.ASESORIAS_API_URL}/generos/${id}`
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
//Metodo para agregar un nuevo genero
  async postGenero(data) {
    const url = `${this.ASESORIAS_API_URL}/generos`
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
  //---------------------- Catalogos ----------------------
  //Metodo para obtener todos los catalogos
  async getCatalogos() {
    const url = `${this.ASESORIAS_API_URL}/catalogo-requisitos`

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
  //Metodo para obtener todos los catalogos activos del sistema
  async getCatalogos2() {
    const url = `${this.ASESORIAS_API_URL}/catalogo-requisitos?activo=true`

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
  //Metodo para agregar un nuevo catalogo
  async postCatalogos(data) {
    const url = `${this.ASESORIAS_API_URL}/catalogo-requisitos`
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
   //Metodo para obtener un catalogo por su id
  async getCatalogosByID(id) {
    const url = `${this.ASESORIAS_API_URL}/catalogo-requisitos/${id}`
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
  //Metodo para actualizar un catalogo existente por su id y los datos a modificar
  async putCatalogos(id, data) {
    const url = `${this.ASESORIAS_API_URL}/catalogo-requisitos/${id}`
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

  



//---------------------- Estados Civiles ----------------------
 //Metodo para obtener todos los estados civiles por su id
 async getEstadosCivilByID(id) {
  const url = `${this.ASESORIAS_API_URL}/estados-civiles/${id}`
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
//Metodo para actualizar un estado civil existente por su id y los datos a modificar
async putEstadosCivil(id, data) {
  const url = `${this.ASESORIAS_API_URL}/estados-civiles/${id}`
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
//Metodo para agregar un nuevo estado civil
async postEstadosCivil(estadoCivil) {
  const url = `${this.ASESORIAS_API_URL}/estados-civiles`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.token}`,
    },
    body: JSON.stringify(estadoCivil),
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    throw new Error('Error en la petición')
  }
}

 //Metodo para agregar un nuevo estado civil
async postEstadosCivil(estadoCivil) {
  const url = `${this.ASESORIAS_API_URL}/estados-civiles`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.user.token}`,
    },
    body: JSON.stringify(estadoCivil),
  })
  if (response.ok) {
    const data = await response.json()
    return data
  } else {
    throw new Error('Error en la petición')
  }
}

//Metodo para obtener todos los estados civiles
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
//Metodo para obtener todos los estados civiles activos del sistema
async getEstadosCiviles2() {
  const url = `${this.ASESORIAS_API_URL}/estados-civiles?activo=true`

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

}

export { APIModel }
