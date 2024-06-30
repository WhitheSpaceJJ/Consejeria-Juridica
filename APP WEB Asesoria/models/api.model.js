
class APIModel {
  /*
  API_URL = 'http://200.58.127.244'
  USERS_API_URL = `${this.API_URL}:3002`
  ASESORIAS_API_URL = `${this.API_URL}:3009`
  CP_API_URL = `${this.API_URL}:3012`
  */
  // API_URL = 'http://localhost'
  USERS_API_URL = import.meta.env.VITE_DEPLOY_USUARIOS === 'DEPLOYA' ? import.meta.env.VITE_BACKEND_USUARIOS : import.meta.env.VITE_BACKEND_USUARIOS_HTTPS
  ASESORIAS_API_URL = import.meta.env.VITE_DEPLOY_ASESORIAS === 'DEPLOYA' ? import.meta.env.VITE_BACKEND_ASESORIAS : import.meta.env.VITE_BACKEND_ASESORIAS_HTTPS
  CP_API_URL = import.meta.env.VITE_DEPLOY_CODIGOS_POSTALES === 'DEPLOYA' ? import.meta.env.VITE_BACKEND_CODIGOS_POSTALES : import.meta.env.VITE_BACKEND_CODIGOS_POSTALES_HTTPS

  user = JSON.parse(sessionStorage.getItem('user'))

  constructor() { }




  // --------------------Turno------------------------
  /*
    async login({ correo, password }) {
      try {
        const url = new URL(`${this.USERS_API_URL}/usuarios/usuario`);
        url.searchParams.append('correo', correo);
        url.searchParams.append('password', password);
        console.log(url.toString());
  
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        console.log(response);
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error en login:', error);
        throw error;
      }
    }
  */
  //Metodo para obtener el turno por su id
  /*
  async getTurno(id) {
    const url = `${this.ASESORIAS_API_URL}/turnos/${id}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
        //,Authorization: `Bearer ${this.user.token}`,
      },
      credentials: 'include' // Incluir cookies en la solicitud
    })
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }
    */

  async getTurno(id) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/turnos/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getTurno:', error);
      throw error;
    }

  }

  /*
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
    */

  async putTurno(id, turno) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/turnos/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(turno),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    }
    catch (error) {
      console.error('Error en putTurno:', error);
      throw error;
    }
  }




  // ---------------------- Usuarios ----------------------

  //Metodo para iniciar sesion con un usuario y contraseña
  /*

  async login({ correo, password }) {
    try {
      const url = new URL(`${this.USERS_API_URL}/usuarios/usuario`);
      url.searchParams.append('correo', correo);
      url.searchParams.append('password', password);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  }
  */
  /*
  async login({ correo, password }) {
    const url = `${this.USERS_API_URL}/usuarios/usuario?correo=${correo}&password=${password}`
    console.log(url)

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
    */

  async login({ correo, password }) {
    try {
      const url = new URL(`${this.USERS_API_URL}/usuarios/usuario`);
      url.searchParams.append('correo', correo);
      url.searchParams.append('password', password);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }


  }





  //Metodo para recuperar la contraseña de un usuario
  /*
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
   */

  async recover(correo) {
    try {
      const url = new URL(`${this.USERS_API_URL}/usuarios/recuperacion`);
      url.searchParams.append('correo', correo);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en recover:', error);
      throw error;
    }
  }

  //Metodo para obtener todos los usuarios

  /*
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
*/

  async getUsuarios() {
    try {
      const url = new URL(`${this.USERS_API_URL}/usuarios`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getUsuarios:', error);
      throw error;
    }
  }

  /*
  async getUsuariosBusqueda(correo, id_distrito_judicial, total, pagina) {
    const url = new URL(`${this.USERS_API_URL}/usuarios/busqueda`);
    const params = new URLSearchParams();

    if (correo) params.append('correo', correo);
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
    } else {
      throw new Error('Error en la petición');
    }
  }
   */

  async getUsuariosBusqueda(correo, id_distrito_judicial, total, pagina) {
    try {
      const url = new URL(`${this.USERS_API_URL}/usuarios/busqueda`);
      const params = new URLSearchParams();

      if (correo) params.append('correo', correo);
      if (id_distrito_judicial) params.append('id_distrito_judicial', id_distrito_judicial);
      if (total) params.append('total', total);
      if (pagina) params.append('pagina', pagina);

      url.search = params.toString();

      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getUsuariosBusqueda:', error);
      throw error;
    }
  }

  //Metodo para obtener un usuario por su id
  /*
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
    */

  async getUsuarioByID(id) {
    try {
      const url = new URL(`${this.USERS_API_URL}/usuarios/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: { Authorization: `Bearer ${this.user.token}` },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getUsuarioByID:', error);
      throw error;
    }

  }



  //Metodo para agregar un nuevo usuario
  /*
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
    */

  async postUsuario(data) {
    try {
      const url = new URL(`${this.USERS_API_URL}/usuarios`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en postUsuario:', error);
      throw error;
    }
  }


  //Metodo para actualizar un usuario existente por su id y los datos a modificar

  /*
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
*/


  async putUsuario(id, data) {
    try {
      const url = new URL(`${this.USERS_API_URL}/usuarios/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },

        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {

        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en putUsuario:', error);
      throw error;
    }

  }
  // ---------------------- Permisos ----------------------
  /*
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
  */
  async getPermisos() {
    try {
      const url = new URL(`${this.USERS_API_URL}/permisos`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getPermisos:', error);
      throw error;
    }
  }




  // ---------------------- Tipo Usuarios ----------------------
  /*
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
  
    }*/

  async getTipoUsuarios() {
    try {
      const url = new URL(`${this.USERS_API_URL}/tipo-usuario`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getTipoUsuarios:', error);
      throw error;
    }
  }


  // ---------------------- Asesorias ----------------------
  //Metodo para obtener todas las asesorias deacurdos a la pagina
  /* async getAsesorias(pagina) {
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
 */
  async getAsesorias(pagina) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/paginacion`);
      url.searchParams.append('pagina', pagina);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getAsesorias:', error);
      throw error;
    }
  }
  //Metodo para obtener el total de asesorias del sistema
  /* async getTotalAsesorias() {
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
   }*/
  async getTotalAsesorias() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/total-asesorias`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getTotalAsesorias:', error);
      throw error;
    }
  }

  //Metodo para obtener una asesoria por el nombre completo de la persona, es decir, nombre, apellido paterno y apellido materno
  /*async getAsesoriaByFullName(nombre, apellidoMaterno, apellidoPaterno, pagina) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/buscar?nombre=${nombre}&apellido_paterno=${apellidoPaterno}&apellido_materno=${apellidoMaterno}&pagina=${pagina}`
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
    */

  async getAsesoriaByFullName(nombre, apellidoMaterno, apellidoPaterno, pagina) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/buscar`);
      url.searchParams.append('nombre', nombre);
      url.searchParams.append('apellido_paterno', apellidoPaterno);
      url.searchParams.append('apellido_materno', apellidoMaterno);
      url.searchParams.append('pagina', pagina);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getAsesoriaByFullName:', error);
      throw error;
    }
  }

  /*
  async getAsesoriaByFullNameTotal(nombre, apellidoMaterno, apellidoPaterno) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/buscar?nombre=${nombre}&apellido_paterno=${apellidoPaterno}&apellido_materno=${apellidoMaterno}&total=true`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })

    console.log(url)
    if (response.ok) {
      const data = await response.json()
      return data
    } else {
      throw new Error('Error en la petición')
    }
  } 
    */

  async getAsesoriaByFullNameTotal(nombre, apellidoMaterno, apellidoPaterno) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/buscar`);
      url.searchParams.append('nombre', nombre);
      url.searchParams.append('apellido_paterno', apellidoPaterno);
      url.searchParams.append('apellido_materno', apellidoMaterno);
      url.searchParams.append('total', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getAsesoriaByFullNameTotal:', error);
      throw error;
    }
  }

  //Metodo para obtener una asesoria por su id
  /*
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
    */

  async getAsesoriaById(id) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getAsesoriaById:', error);
      throw error;
    }
  }

  //Metodo para actualizar una asesoria existente por su id y los datos a modificar
  /* async putAsesoria({ id, data }) {
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
   }*/

  async putAsesoria({ id, data }) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en putAsesoria:', error);
      throw error;
    }
  }

  //Metodo para agregar una nueva asesoria
  /*async postAsesoria(data) {
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
    */

  async postAsesoria(data) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesorias`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en postAsesoria:', error);
      throw error;
    }
  }

  //Metodo para obtener las asesorias en base a los filtros
  /*
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
    */

  async getAsesoriasByFilters(filtros) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/filtro`);
      url.searchParams.append('filtros', JSON.stringify(filtros));
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      data = data.asesorias;
      return data;

    } catch (error) {
      console.error('Error en getAsesoriasByFilters:', error);
      throw error;
    }

  }

  /*
  //Metodo para obtener el total de asesorias en base a los filtros
  async getTotalAsesoriasfiltro(filtros) {
    const url = `${this.ASESORIAS_API_URL}/asesorias/total-asesorias-filtro?filtros={"fecha-inicio":"${filtros.fecha_inicio}","fecha-final":"${filtros.fecha_final}","id_municipio":${filtros.id_municipio},"id_zona":${filtros.id_zona},"id_defensor":${filtros.id_defensor},"id_asesor":${filtros.id_asesor},"fecha_registro":"${filtros.fecha_registro}","id_distrito_judicial":${filtros.id_distrito}}`;
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
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }
 */

  async getTotalAsesoriasfiltro(filtros) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/total-asesorias-filtro`);
      url.searchParams.append('filtros', JSON.stringify(filtros));
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getTotalAsesoriasfiltro:', error);
      throw error;
    }
  }

  //Metodo para obtener las asesorias en base al filtro y paginacion
  /*
   async getAsesoriasByFiltersPaginacion(pagina, filtros) {
     const url = `${this.ASESORIAS_API_URL}/asesorias/paginacion-filtro?filtros={"fecha-inicio":"${filtros.fecha_inicio}","fecha-final":"${filtros.fecha_final}","id_municipio":${filtros.id_municipio},"id_zona":${filtros.id_zona},"id_defensor":${filtros.id_defensor},"id_asesor":${filtros.id_asesor},"fecha_registro":"${filtros.fecha_registro}","id_distrito_judicial":${filtros.id_distrito}} &pagina=${pagina}`;
 
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
 */

  async getAsesoriasByFiltersPaginacion(pagina, filtros) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesorias/paginacion-filtro`);
      url.searchParams.append('filtros', JSON.stringify(filtros));
      url.searchParams.append('pagina', pagina);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      data = data.asesorias;
      return data;

    } catch (error) {
      console.error('Error en getAsesoriasByFiltersPaginacion:', error);
      throw error;
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
  /*
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
  }*/

  async getMunicipiosByDistrito(idDistro) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/municipios-distritos/distrito/${idDistro}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      data = data.municipios;
      return data;

    } catch (error) {
      console.error('Error en getMunicipiosByDistrito:', error);
      throw error;
    }
  }

  //---------------------- Distritos Judiciales ----------------------
  //Metodo para obtener todos los distritos judiciales
  /*
  async getDistritos() {
    const url = `${this.ASESORIAS_API_URL}/distritos-judiciales`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.user.token}`,
      },
    })
    if (response.ok) {
      let data = await response.json()
      data = data.distritosJudiciales
      return data
    }
    else {
      throw new Error('Error en la petición')
    }
  }
    */

  async getDistritos() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/distritos-judiciales`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      data = data.distritosJudiciales;
      return data;

    } catch (error) {
      console.error('Error en getDistritos:', error);
      throw error;
    }
  }


  // ---------------------- Codidos Postales  ----------------------
  //Metodo para obtener los datos de la colonia, estado, municipio, ciudad, codigo postal esto a traves del id de la colonia
  /*
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
  } */

  async getColoniaById(idColonia) {
    try {
      const url = new URL(`${this.CP_API_URL}/colonias/${idColonia}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getColoniaById:', error);
      throw error;
    }
  }

  //Metodo para obtener los datos de la colonia, estado, municipio, ciudad, codigo postal esto a traves del codigo postal
  /*
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
     */

  async getDomicilioByCP(cp) {
    try {
      const url = new URL(`${this.CP_API_URL}/codigospostales/cp/${cp}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getDomicilioByCP:', error);
      throw error;
    }
  }

  //---------------------- Asesores ----------------------
  //Metodo para obtener todos los asesores
  /*
  async getAsesores(id_distrito_judicial, pagina) {
    const url = `${this.ASESORIAS_API_URL}/asesores/busqueda?pagina=${pagina}&id_distrito_judicial=${id_distrito_judicial}`
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
    */

  async getAsesores(id_distrito_judicial, pagina) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesores/busqueda`);
      url.searchParams.append('pagina', pagina);
      url.searchParams.append('id_distrito_judicial', id_distrito_judicial);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getAsesores:', error);
      throw error;
    }
  }

  //Metodo para obtener todos los asesores activos del sistema
  /*
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
    */

  async getAsesores2() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesores`);
      url.searchParams.append('activo', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;
    }
    catch (error) {
      console.error('Error en getAsesores2:', error);
      throw error;
    }

  }

  //Metodo para obtener asesores por distrito    
  /*
 async getAsesoresByDistrito(id) {
   const url = `${this.ASESORIAS_API_URL}/asesores/distrito/${id}`
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
     return data
   } else {
     throw new Error('Error en la petición')
   }
 }
   */

  async getAsesoresByDistrito(id) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesores/distrito`);
      url.searchParams.append('id_distrito_judicial', id);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      data = data.asesores;
      return data;

    } catch (error) {
      console.error('Error en getAsesoresByDistrito:', error);
      throw error;
    }
  }

  //Metodo para obtener asesores por distrito   
  /* 
  async getDefensoresByDistrito(id) {
    const url = `${this.ASESORIAS_API_URL}/defensores/distrito?id_distrito_judicial=${id}&activo=true`
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
*/

  async getDefensoresByDistrito(id) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/defensores/distrito`);
      url.searchParams.append('id_distrito_judicial', id);
      url.searchParams.append('activo', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      data = data.defensores;
      return data;

    } catch (error) {
      console.error('Error en getDefensoresByDistrito:', error);
      throw error;
    }
  }
  //Metodo para obtener un asesor por su id
  /*
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
    */

  async getAsesorID(id_asesor) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesores/${id_asesor}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getAsesorID:', error);
      throw error;
    }
  }

  //Metodo para obtener los asesores por zona
  /* 
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
      return data
    } else {
      throw new Error('Error en la petición')
    }
  }
 */

  async getAsesoresByZona(id) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/asesores/zona/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      data = data.asesores;
      return data;

    } catch (error) {
      console.error('Error en getAsesoresByZona:', error);
      throw error;
    }
  }


  //---------------------- Empleados ----------------------
  //Metodo para agregar un nuevo empleado
  /*
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
  */

  async postEmpleado(data) {
    try {

      const url = new URL(`${this.ASESORIAS_API_URL}/empleados`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en postEmpleado:', error);
      throw error;
    }

  }

  //Metodo para actualizar un empleado existente por su id y los datos a modificar
  /*
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
 
  */


  async putEmpleado(id, data) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/empleados/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en putEmpleado:', error);
      throw error;
    }
  }

  //---------------------- Defensores ----------------------
  //Metodo para obtener a un defensor por su id
  /*
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
  } */

  async getDefensorID(id_defensor) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/defensores/${id_defensor}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getDefensorID:', error);
      throw error;
    }

  }

  //Metodo para obtener los defensores por zona
  /*
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
  */

  async getDefensoresByZona(id) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/defensores/zona/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      data = data.defensor;
      return data;

    } catch (error) {
      console.error('Error en getDefensoresByZona:', error);
      throw error;
    }

  }

  //Metodo para obtener todos los defensores 
  /*
   async getDefensores(id_distrito_judicial, pagina) {
     const url = `${this.ASESORIAS_API_URL}/defensores/busqueda?pagina=${pagina}&id_distrito_judicial=${id_distrito_judicial}`
 
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
   }¨ 
   */

  async getDefensores(id_distrito_judicial, pagina) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/defensores/busqueda`);
      url.searchParams.append('pagina', pagina);
      url.searchParams.append('id_distrito_judicial', id_distrito_judicial);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getDefensores:', error);
      throw error;
    }
  }

  /*
   async getTotalEmpleadoDistrito(id_distrito_judicial) {
     const url = `${this.ASESORIAS_API_URL}/empleados/busqueda?total=true&id_distrito_judicial=${id_distrito_judicial}`
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
 
   */

  async getTotalEmpleadoDistrito(id_distrito_judicial) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/empleados/busqueda`);
      url.searchParams.append('total', true);
      url.searchParams.append('id_distrito_judicial', id_distrito_judicial);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getTotalEmpleadoDistrito:', error);
      throw error;
    }
  }

  /*
  async getEmpleadosDistrito(id_distrito_judicial, pagina) {
    const url = `${this.ASESORIAS_API_URL}/empleados/busqueda?pagina=${pagina}&id_distrito_judicial=${id_distrito_judicial}`
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
    */

  async getEmpleadosDistrito(id_distrito_judicial, pagina) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/empleados/busqueda`);
      url.searchParams.append('pagina', pagina);
      url.searchParams.append('id_distrito_judicial', id_distrito_judicial);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getEmpleadosDistrito:', error);
      throw error;
    }
  }

  //Metodo para obtener todos los defensores activos del sistema
  /*
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
    */

  async getDefensores2() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/defensores`);
      url.searchParams.append('activo', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getDefensores2:', error);
      throw error;
    }

  }


  // ---------------------- Estados ----------------------
  //Metodo para obtener los municipios relacionados al estado numero 26 en este caso sonora
  /* async getMunicipios() {
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
   }  */

  async getMunicipios() {
    try {
      const url = new URL(`${this.CP_API_URL}/estados/26`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      data = data.estado.municipios;
      return data;

    } catch (error) {
      console.error('Error en getMunicipios:', error);
      throw error;
    }
  }

  //---------------------- Zonas ----------------------
  //Metodo para obtener todas las zonas
  /* async getZonas() {
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
   } */

  async getZonas() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/zonas`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la petición: ${response.status} - ${errorData.message}`);
      }

      let data = await response.json();
      data = data.zonas;
      return data;

    } catch (error) {
      console.error('Error en getZonas:', error);
      throw error;
    }
  }

  // ---------------------- Tipos de Juicio ----------------------
  //Metodo para agregar un nuevo tipo de juicio
  /* async postTiposJuicio(tipoDeJuicio) {
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
   } */

  async postTiposJuicio(tipoDeJuicio) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/tipos-de-juicio`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(tipoDeJuicio),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en postTiposJuicio:', error);
      throw error;
    }
  }

  //Metodo para actualizar un tipo de juicio existente por su id y los datos a modificar
  /*async putTiposJuicio(id, tipoDeJuicio) {
    const url = `${this.ASESORIAS_API_URL}/tipos-de-juicio/${id}`;
    try {
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
  } */

  async putTiposJuicio(id, tipoDeJuicio) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/tipos-de-juicio/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(tipoDeJuicio),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en putTiposJuicio:', error);
      throw error;
    }
  }

  // Metodo para obtener el tipo de juicio por su id
  /*
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
  } */

  async getTiposJuicioByID(id) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/tipos-de-juicio/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getTiposJuicioByID:', error);
      throw error;
    }
  }

  //Metodo para obtener todos los tipos de juicio
  /*
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
 } */

  async getTiposJuicio() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/tipos-de-juicio`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getTiposJuicio:', error);
      throw error;
    }

  }

  /*
  async getTiposJuicioPagina(pagina) {
    const url = `${this.ASESORIAS_API_URL}/tipos-de-juicio/paginacion?pagina=${pagina}`

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
    */


  async getTiposJuicioPagina(pagina) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/tipos-de-juicio/paginacion`);
      url.searchParams.append('pagina', pagina);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getTiposJuicioPagina:', error);
      throw error;
    }
  }

  /*
  async getTiposJuicioTotal() {
    const url = `${this.ASESORIAS_API_URL}/tipos-de-juicio/paginacion?total=${true}`

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
    */

  async getTiposJuicioTotal() {
    try {

      const url = new URL(`${this.ASESORIAS_API_URL}/tipos-de-juicio/paginacion`);
      url.searchParams.append('total', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getTiposJuicioTotal:', error);
      throw error;
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
 */

  async getEstadosCivilesTotal() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/estados-civiles/paginacion`);
      url.searchParams.append('total', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },

      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();

      return data;


    } catch (error) {
      console.error('Error en getEstadosCivilesTotal:', error);
      throw error
    }
  }

  /*

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
 */

  async getEstadosCivilesPagina(pagina) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/estados-civiles/paginacion`);
      url.searchParams.append('pagina', pagina);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getEstadosCivilesPagina:', error);
      throw error;
    }
  }

  /*
  async getGenerosTotal() {
    const url = `${this.ASESORIAS_API_URL}/generos/paginacion?total=${true}`
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
    */

  async getGenerosTotal() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/generos/paginacion`);
      url.searchParams.append('total', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getGenerosTotal:', error);
      throw error;
    }
  }

  /*
  async getGenerosPagina(pagina) {
    const url = `${this.ASESORIAS_API_URL}/generos/paginacion?pagina=${pagina}`
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
*/

  async getGenerosPagina(pagina) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/generos/paginacion`);
      url.searchParams.append('pagina', pagina);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getGenerosPagina:', error);
      throw error;
    }
  }

  /*
  async getCatalogosTotal() {
    const url = `${this.ASESORIAS_API_URL}/catalogo-requisitos/paginacion?total=${true}`
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
  }¨
  */

  async getCatalogosTotal() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/catalogo-requisitos/paginacion`);
      url.searchParams.append('total', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getCatalogosTotal:', error);
      throw error;
    }
  }

  /*
  async getCatalogosPagina(pagina) {
    const url = `${this.ASESORIAS_API_URL}/catalogo-requisitos/paginacion?pagina=${pagina}`
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

  */


  async getCatalogosPagina(pagina) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/catalogo-requisitos/paginacion`);
      url.searchParams.append('pagina', pagina);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getCatalogosPagina:', error);
      throw error;
    }
  }


  /*
  async getMotivosTotal() {
    const url = `${this.ASESORIAS_API_URL}/motivos/paginacion?total=${true}`
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
    */

  async getMotivosTotal() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/motivos/paginacion`);
      url.searchParams.append('total', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getMotivosTotal:', error);
      throw error;
    }
  }

  /*
  async getMotivosPagina(pagina) {
    const url = `${this.ASESORIAS_API_URL}/motivos/paginacion?pagina=${pagina}`
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
 */

  async getMotivosPagina(pagina) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/motivos/paginacion`);
      url.searchParams.append('pagina', pagina);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getMotivosPagina:', error);
      throw error;
    }
  }

  //Metodo para obtener todos los tipos de juicio activos del sistema7
  /*
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
  }*/

  async getTiposJuicio2() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/tipos-de-juicio`);
      url.searchParams.append('activo', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getTiposJuicio2:', error);
      throw error;
    }
  }

  // ---------------------- Motivos ----------------------
  /*
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
  */

  async getMotivoByID(id) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/motivos/${id}`);
      console.log(url.toString());
 
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en getMotivoByID:', error);
      throw error;
    }
  }

  //Metodo para agregar un nuevo motivo
  /*
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
    */

  async postMotivo(motivo) {
    try {
      const url = `${this.ASESORIAS_API_URL}/motivos`;
      console.log(url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(motivo),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en postMotivo:', error);
      throw error;
    }
  }

  //Metodo para actualizar un motivo existente por su id y los datos a 
  /*
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
    */

  async putMotivo(id, motivo) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/motivos/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(motivo),
      });


      if (!response.ok) {

        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();

      return data;

    } catch (error) {
      console.error('Error en putMotivo:', error);
      throw error;
    }

  }

  //Metodo  para obtener todos los motivos
  /*
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
  */

  async getMotivos() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/motivos`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getMotivos:', error);
      throw error;
    }
   }

  //Metodo para obtener todos los motivos activos del sistema
  /*
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
 */

  async getMotivos2() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/motivos`);
      url.searchParams.append('activo', true);

      console.log(url.toString());

      const response = await fetch(url, {

        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },

      });

      console.log(response);

      if (!response.ok) {

        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();

      return data;

    } catch (error) {

      console.error('Error en getMotivos2:', error);
      throw error;
    }

  }


  //---------------------- Generos ----------------------
  //Metodo para obtener todos los generos
  /*
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
    */
 
  async getGeneros() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/generos`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getGeneros:', error);
      throw error;
    }

  }


  //Metodo para obtener todos los generos activos del sistema
  
  /*async getGeneros2() {
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
  }*/

  async getGeneros2() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/generos`);
      url.searchParams.append('activo', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },

      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getGeneros2:', error);
      throw error;
    }

  }
  //Metodo para obtener un genero por su id
  /*
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
    */

  async getGeneroByID(id) {
     try {
      const url = new URL(`${this.ASESORIAS_API_URL}/generos/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getGeneroByID:', error);
      throw error;
    }

     
  }

  //Metodo para actualizar un genero existente por su id y los datos a modificar
  /*
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
  }*/

 
  async putGenero(id, data) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/generos/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en putGenero:', error);
      throw  error;
    }
  }

  //Metodo para agregar un nuevo genero
  /*
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
    */
   
  async postGenero(data) {  
    try {
      const url = `${this.ASESORIAS_API_URL}/generos`;
      console.log(url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en postGenero:', error);
      throw error;
    }
  }


  //---------------------- Catalogos ----------------------
  //Metodo para obtener todos los catalogos
  /*
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
    */
 
  async getCatalogos() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/catalogo-requisitos`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getCatalogos:', error);
      throw error;
    }
  }
 

 /*
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
    */

  async getCatalogos2() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/catalogo-requisitos`);
      url.searchParams.append('activo', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },

      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();

      return data;

    } catch (error) {
      console.error('Error en getCatalogos2:', error);
      throw error;
    }
  }
  //Metodo para agregar un nuevo catalogo
  /*
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
  }*/

  async postCatalogos(data) {
    try {
      const url = `${this.ASESORIAS_API_URL}/catalogo-requisitos`;
      console.log(url); 

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en postCatalogos:', error);
      throw error;
    }

  }
  //Metodo para obtener un catalogo por su id7
  /*
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
    */

  async getCatalogosByID(id) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/catalogo-requisitos/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getCatalogosByID:', error);
      throw error;
    }
  }
  //Metodo para actualizar un catalogo existente por su id y los datos a modificar
  /*
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
 */
 
  async putCatalogos(id, data) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/catalogo-requisitos/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en putCatalogos:', error);
      throw error;
    }
  }




  //---------------------- Estados Civiles ----------------------
  /*
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
  } */
 
  async getEstadosCivilByID(id) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/estados-civiles/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getEstadosCivilByID:', error);
      throw error;
    }
  }


  //Metodo para actualizar un estado civil existente por su id y los datos a modificar7
  /*
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
  } */

  async putEstadosCivil(id, data) {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/estados-civiles/${id}`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(data),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en putEstadosCivil:', error);
      throw error;
    }
  }

  //Metodo para agregar un nuevo estado civil
  /*
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
  } */

  async postEstadosCivil(estadoCivil) {
    try {
      const url = `${this.ASESORIAS_API_URL}/estados-civiles`;
      console.log(url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(estadoCivil),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en postEstadosCivil:', error);
      throw error;
    }
  }

  //Metodo para agregar un nuevo estado civil
  /*
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
 */

  async postEstadosCivil(estadoCivil) {
    try {
      const url = `${this.ASESORIAS_API_URL}/estados-civiles`;
      console.log(url);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.token}`,
        },
        body: JSON.stringify(estadoCivil),
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en postEstadosCivil:', error);
      throw error;
    }
  }
  //Metodo para obtener todos los estados civiles7
  /*
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
  }*/
 
  async getEstadosCiviles() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/estados-civiles`);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },
      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error en getEstadosCiviles:', error);
      throw error;
    }
  }

 /*
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
  } */

  async getEstadosCiviles2() {
    try {
      const url = new URL(`${this.ASESORIAS_API_URL}/estados-civiles`);
      url.searchParams.append('activo', true);
      console.log(url.toString());

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.user.token}`,
        },

      });

      console.log(response);

      if (!response.ok) {
        throw new Error(`Error en la petición: ${response.statusText}`);
      }

      const data = await response.json();

      return data;

    }
    catch (error) {
      console.error('Error en getEstadosCiviles2:', error);
      throw error;
    }
  }

}

export { APIModel }
