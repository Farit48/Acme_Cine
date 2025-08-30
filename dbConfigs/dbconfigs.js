// use Farit_Acme_Cine

db.createCollection("Cinemas", {
    validator: {
      $jsonSchema: {
        bsonType: "object", 
        required: ["codigo", "nombre", "fecha"],
        properties: {
            codigo: {
                bsonType: "string",
            },
            nombre: {
                bsonType: "string",
            },
            direccion: {
                bsonType: "string",
            },
            ciudad: {
                bsonType: "string",
            },
            salas: {
                bsonType: "array",
                uniqueItems:true,
                items:{
                    bsonType:'object',
                    properties:{
                        codigo: {
                            bsonType: "string",
                        },
                        totalSillas: {
                            bsonType: "int",
                        },
                        funciones: {
                            bsonType: "array",
                            items: {
                                bsonType: "object", 
                                required: [ "pelicula", "fecha"],
                                properties: {
                                    pelicula: {
                                        bsonType: "objectId",
                                        description: "Colocar la pelicula que proyectara esa funcion"
                                    },
                                    fecha: {
                                        bsonType: "date",
                                        description: "La fecha de esa funcion en especifico"
                                    },
                                }
                            }
                        }
                    }
                }
            },
        }
      }
    }
});
db.createCollection("Films", {
    validator: {
      $jsonSchema: {
        bsonType: "object", 
        required: ["codigo", "nombre", "fecha"],
        properties: {
            codigo: {
                bsonType: "string",
            },
            titulo: {
                bsonType: "string",
            },
            sinopsis: {
                bsonType: "string",
            },
            reparto: {
                bsonType: "string",
            },
            clasificación: {
                bsonType: "string",
            },
            idioma: {
                bsonType: "string",
            },
            director: {
                bsonType: "string",
            },
            duración: {
                bsonType: "string",
            },
            género: {
                bsonType: "string",
            },
            fechaEstreno: {
                bsonType: "string",
            },
            tráiler: {
                bsonType: "string",
            },
            poster: {
                bsonType: "string",
            },
        }
      }
    }
});