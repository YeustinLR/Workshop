// /index.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

const express = require('express');
const app = express();
// database connection
const mongoose = require("mongoose");
// Función para conectar a la base de datos
async function connectToDatabase() {
  try {
      // Conectar a la base de datos utilizando la URL de conexión
      await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      });
      console.log("Conexión a la base de datos establecida");
  } catch (error) {
      console.error("Error al conectar a la base de datos:", error);
      // Puedes decidir cómo manejar el error aquí, por ejemplo, terminar la aplicación
      process.exit(1); // Terminar la aplicación con código de salida 1
  }
}

// Llamar a la función para conectar a la base de datos
connectToDatabase();

const theSecretKey = process.env.JWT_SECRET;

// const {
//   base64decode
// } = require('nodejs-base64');

// const crypto = require('crypto');

const {
  teacherPatch,
  teacherPost,
  teacherGet,
  teacherDelete
} = require("./controllers/teacherController.js");
// const { saveSession, getSession } = require('./controllers/sessionController.js');
const {
  coursePost, courseGet
} = require("./controllers/courseController.js");

const { createImage }  = require("./controllers/openAiController.js");

// parser for the request body (required for the POST and PUT methods)
const bodyParser = require("body-parser");
const cors = require("cors");

// Middlewares
app.use(bodyParser.json());
// check for cors
app.use(cors({
  domains: '*',
  methods: "*"
}));


// login with JWT
app.post("/api/session", function (req, res) {
  if (req.body.username && req.body.password &&
    req.body.username === 'admin' && req.body.password === 'password') {

    //TODO: query the database to get the user info
    const token = jwt.sign({
      userId: 123,
      name: 'Yeustin',
      permission: ['create', 'edit', 'delete'],
      deviceId: "123"
    }, theSecretKey);

    res.status(201).json({
      token
    })
  } else {
    res.status(422);
    res.json({
      error: 'Invalid username or password'
    });
  }
});

// JWT Authentication middleware
app.use(function (req, res, next) {
  if (req.headers["authorization"]) {
    const authToken = req.headers['authorization'].split(' ')[1];
    try {
      jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
        if (err || !decodedToken) {
          res.status(401);
          res.json({
            error: "Unauthorized"
          });
        }
        console.log('Welcome', decodedToken.name);
        next();
      });
    } catch (e) {
      console.error('There was an error', e);
      res.send({
        error: "Unauthorized "
      }).status(401);
    }
  } else {
    res.status(401);
    res.send({
      error: "Unauthorized "
    });
  }
});

// listen to the task request

app.get("/api/teachers", teacherGet);
app.post("/api/teachers", teacherPost);
app.patch("/api/teachers", teacherPatch);
app.put("/api/teachers", teacherPatch);
app.delete("/api/teachers", teacherDelete);
app.post("/api/image", createImage);
// course
app.get("/api/courses", courseGet);
app.post("/api/courses", coursePost);

app.listen(3001, () => console.log(`Example app listening on port 3001!`))
