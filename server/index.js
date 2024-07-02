
require("dotenv").config();

const express = require("express");
const cors = require('cors');

const PORT = process.env.PORT || '3001';

// Creamos nuestra app con Express
const server = express();

// 1- Importar el módulo de JWT
const jwt = require('jsonwebtoken');

// 2- Definir una clave secreta para firmar el token
const jwtConfig = require('./jwt.config.js');
server.set('key', jwtConfig.clave);

// 3- Middleware para parsear token
// Middleware para parsear el cuerpo de la solicitud como JSON
server.use(express.json());

// Configura CORS para permitir solicitudes desde http://localhost:5173
server.use(cors({
  origin: '*'
}));

// Conexion a MongoDB con Mongoose______

// TODO: hacer que la dominio se lea desde una variable de entorno
// TODO: hacer que la usuario se lea desde una variable de entorno
// TODO: hacer que el password lea desde una variable de entorno
// TODO: hacer que el password lea desde una variable de entorno
const mongoose = require('mongoose');
// const uri = `mongodb+srv://${process.env.DB_USUARIO}:${process.env.DB_PASSWORD}@${process.env.DB_DOMAIN}/?appName=${process.env.DB_CLUSTER}`;

const uri = `mongodb+srv://verasonia3:kx8OkICNir2a8nXv@cluster0.wz4grms.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);
//_____________________________________________


server.listen(PORT, () => {
   console.log(`Servidor iniciado. Escuchando en el puerto: ${PORT}`);
});


// 4- Endpoint para autenticar un usuario
server.post('/autenticar', (req, res) => {


  if (req.body.user ) {

    const usuario = req.body.user;

    console.log(req.body)

    // Obtener el usuario y contraseña del cuerpo de la solicitud
    const payload = {
      usuario,
      checked: true,
    };
    const key = server.get('key');

    
    try {
      const token = jwt.sign(payload, key)
      res.send({
        message: 'Funciona!',
        token
      });

    } catch (error) {
      res.send({
        message: 'Hubo un error',
        token
      });
    }
        
  } else {
    res.send({
      message: 'No se envio el user',
    });
  
  }

  

});

server.post('/tarea', (req, res) => {

   const tarea = req.body;

    // Procesar los datos recibidos
   console.log("Recibida la tarea: ", tarea);
   
    // Se envía una respuesta al cliente de que la data fue procesada
   res.send({
     message: 'Se recibió la nueva tarea correctamente',
   });

 });

