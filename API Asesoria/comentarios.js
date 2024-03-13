/*



Notas del sistemas actual
Tipos Juicio   - ---- 
Post http://localhost:3009/tipos-de-juicio
Body
{

        "tipo_juicio": "Eliminar",
        "estatus_general": "ACTIVO"
}
Respuesta
{
    "tipoDeJuicio": {
        "id_tipo_juicio": 17,
        "tipo_juicio": "Eliminar",
        "estatus_general": "ACTIVO"
    }
}
Get   http://localhost:3009/tipos-de-juicio
Respuesta
{
    "tiposDeJuicio": [
        {
            "id_tipo_juicio": 1,
            "tipo_juicio": "Divorcio Incausado",
            "estatus_general": "ACTIVO"
        },
        {
            "id_tipo_juicio": 2,
            "tipo_juicio": "Divorcio Voluntario",
            "estatus_general": "ACTIVO"
        } 
] 

}

y get ID  todo bien devuelve esto
Respuesta
http://localhost:3009/tipos-de-juicio/1
{
    "tipoDeJuicio": {
        "id_tipo_juicio": 1,
        "tipo_juicio": "Divorcio Incausado",
        "estatus_general": "ACTIVO"
    }
}
http://localhost:3009/tipos-de-juicio/15
eliminar es con id
Respuesta
{
    "menssage": "El tipo de juicio ha sido eliminado"
}

Put http://localhost:3009/tipos-de-juicio/17
body
{
     "id_tipo_juicio": 17,
            "tipo_juicio": "Eliminar uno",
            "estatus_general": "ACTIVO"
}
respuesta
{
    "tipoDeJuicio": {
        "id_tipo_juicio": 17,
        "tipo_juicio": "Eliminar uno",
        "estatus_general": "ACTIVO"
    }
}

*/


/*



Notas con respecto a estados civiles 
Get http://localhost:3009/estados-civiles
Respuesta
{
    "estadosCiviles": [
        {
            "id_estado_civil": 1,
            "estado_civil": "Soltero(a)",
            "estatus_general": "ACTIVO"
        },
        {
            "id_estado_civil": 2,
            "estado_civil": "Casado(a)",
            "estatus_general": "ACTIVO"
        } 
]
} 

Get ID
 http://localhost:3009/estados-civiles/1
Respúesta
{
    "estadoCivil": {
        "id_estado_civil": 1,
        "estado_civil": "Soltero(a)",
        "estatus_general": "ACTIVO"
    }
}
Post http://localhost:3009/estados-civiles
Body
{
        "estado_civil": "Eliminar",
        "estatus_general": "ACTIVO"
}
Respuesta
{
    "estadoCivil": {
        "id_estado_civil": 7,
        "estado_civil": "Eliminar",
        "estatus_general": "ACTIVO"
    }
}
Delete http://localhost:3009/estados-civiles/7
Respuesta
{
    "menssage": "El estado civil ha sido eliminado"
}
Put http://localhost:3009/estados-civiles/9
body
{
     "id_estado_civil": 9,
            "estado_civil": "Eliminar Uno ",
            "estatus_general": "ACTIVO"
}
respuesta
{
    "estadoCivil": {
        "id_estado_civil": 9,
        "estado_civil": "Eliminar Uno ",
        "estatus_general": "ACTIVO"
    }
}

*/


/*




Notas con respecto a generos
 Get  http://localhost:3009/generos
Respuesta
{
    "generos": [
        {
            "id_genero": 1,
            "descripcion_genero": "Masculino",
            "estatus_general": "ACTIVO"
        },
        {
            "id_genero": 2,
            "descripcion_genero": "Femenino",
            "estatus_general": "ACTIVO"
        }
]
}
Get id http://localhost:3009/generos/1
Respuesta
{
    "genero": {
        "id_genero": 1,
        "descripcion_genero": "Masculino",
        "estatus_general": "ACTIVO"
    }
}
Post http://localhost:3009/generos
Body
{
    "descripcion_genero": "Eliminar",
        "estatus_general": "ACTIVO"
}
Respuesta
{
    "genero": {
        "id_genero": 4,
        "descripcion_genero": "Eliminar",
        "estatus_general": "ACTIVO"
    }
}
Delete http://localhost:3009/generos/4
Respuesta
{
    "menssage": "El genero ha sido eliminado"
}
put  http://localhost:3009/generos/5
Body
{
        "id_genero": 5,
            "descripcion_genero": "Masculino Eliminar Uno",
            "estatus_general": "ACTIVO"
}
Respuesta
{
    "genero": {
        "id_genero": 5,
        "descripcion_genero": "Masculino Eliminar Uno",
        "estatus_general": "ACTIVO"
    }
}

*/

/*


Notas con respecto a motivos
Post  http://localhost:3009/motivos
Body
{
 "descripcion_motivo": "Eliminar",
            "estatus_general": "ACTIVO"
}
Respuesta
 {
    "motivo": {
        "id_motivo": 5,
        "descripcion_motivo": "Eliminar",
        "estatus_general": "ACTIVO"
    }
}

Delete http://localhost:3009/motivos/5
Respuesta
{
    "menssage": "El motivo ha sido eliminado"
}
Get  http://localhost:3009/motivos
Respuesta 
{
    "motivos": [
        {
            "id_motivo": 1,
            "descripcion_motivo": "Discapacidad o enfermedad",
            "estatus_general": "ACTIVO"
        },
        {
            "id_motivo": 2,
            "descripcion_motivo": "Ama de casa",
            "estatus_general": "ACTIVO"
        }
]
}
Get ID http://localhost:3009/motivos/2
Respuesta
{
    "motivo": {
        "id_motivo": 2,
        "descripcion_motivo": "Ama de casa",
        "estatus_general": "ACTIVO"
    }
}
put 
body
{
    "id_motivo": 6,
            "descripcion_motivo": "Discapacidad o enfermedad Eliminar  Uno",
            "estatus_general": "ACTIVO"
}
Respuesta http://localhost:3009/motivos/6
{
    "motivo": {
        "id_motivo": 6,
        "descripcion_motivo": "Discapacidad o enfermedad Eliminar  Uno",
        "estatus_general": "ACTIVO"
    }
}



*/

/*



Notas catalogo requisitos
get http://localhost:3009/catalogo-requisitos
{
    "requisitosCatalogo": [
        {
            "id_catalogo": 1,
            "descripcion_catalogo": "Requisitos",
            "estatus_general": "ACTIVO"
        },
        {
            "id_catalogo": 2,
            "descripcion_catalogo": "Carta compromiso",
            "estatus_general": "ACTIVO"
        }
]
}
Get ID  http://localhost:3009/catalogo-requisitos/1
{
    "requisitoCatalogo": {
        "id_catalogo": 1,
        "descripcion_catalogo": "Requisitos",
        "estatus_general": "ACTIVO"
    }
}
Post   http://localhost:3009/catalogo-requisitos
Body
{
  "descripcion_catalogo": "Requisitos Elimar",
        "estatus_general": "ACTIVO"
}
REspuesta
{
    "requisitoCatalogo": {
        "id_catalogo": 4,
        "descripcion_catalogo": "Requisitos Elimar",
        "estatus_general": "ACTIVO"
    }
}

Delete http://localhost:3009/catalogo-requisitos/4
{
    "menssage": "Requisito del catálogo eliminado"
}

Put  http://localhost:3009/catalogo-requisitos/7
Body
{
    "id_catalogo": 7,
  "descripcion_catalogo": "Requisitos Elimar 3",
        "estatus_general": "ACTIVO"
}
Respuesta
{
    "requisitoCatalogo": {
        "id_catalogo": 7,
        "descripcion_catalogo": "Requisitos Elimar 3",
        "estatus_general": "ACTIVO"
    }
}

*/