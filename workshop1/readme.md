# Proyecto de REST con Express, MongoDB, Node.js y Dotenv

Este es un proyecto de ejemplo que muestra cómo crear una API RESTful utilizando Express.js, MongoDB, Node.js y Dotenv para la gestión de variables de entorno.

## Requisitos

- Node.js instalado en tu máquina.
- MongoDB instalado y en funcionamiento localmente o una instancia remota accesible.

## Instalación

1. Clona este repositorio en tu máquina local usando el siguiente comando:

    ```bash
    git clone https://github.com/YeustinLR/Workshop.git
    ```

2. Navega hasta el directorio del proyecto:

    ```bash
    cd workshop1
    ```

3. Instala las dependencias del proyecto utilizando npm:

    ```bash
    npm install
    ```

## Configuración de variables de entorno con Dotenv

Este proyecto utiliza Dotenv para cargar variables de entorno desde un archivo .env. Las variables de entorno son útiles para almacenar información sensible o configuraciones que pueden variar entre entornos, como las credenciales de la base de datos o las claves de API.

### Configuración

1. Crea un archivo llamado .env en la raíz de tu proyecto.

2. Agrega las variables de entorno necesarias en el archivo .env. Por ejemplo:

    ```plaintext
    DATABASE_URL = Obtenido en MongoDB Atlas, cree un clúster y siga los pasos para conectar. Obtienes la URL con el usuario y password
    ```
        Esto tambien lo pegas en el MongoDBcompas para interactuar con la BD o a tu preferencia.
    Asegúrate de que este archivo no se incluya en tu repositorio y que se mantenga seguro, especialmente si contiene información sensible como contraseñas o claves de API.

### Uso en el proyecto

Dotenv se encargará automáticamente de cargar las variables de entorno definidas en el archivo .env en el objeto process.env. Por lo tanto, puedes acceder a estas variables en tu código de la siguiente manera:

```javascript
require('dotenv').config();

const mongoString = process.env.DATABASE_URL
```


## Uso

Para ejecutar la aplicación, puedes utilizar el siguiente comando:

```bash
npm start
```

Esto iniciará el servidor y tu API estará disponible en la URL http://localhost:puerto.

## Endpoints

A continuación se muestra una lista de los endpoints disponibles en esta API:

- `GET /api/getAll`: Obtiene todos los recursos.
- `GET /api/getOneo/:id`: Obtiene un recurso específico por su ID.
- `POST /api/post`: Crea un nuevo recurso.
- `PUT /api/update/:id`: Actualiza un recurso existente por su ID.
- `DELETE /api/delete/:id`: Elimina un recurso por su ID.

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (git checkout -b feature/feature-name).
3. Realiza tus cambios.
4. Realiza un commit con tus cambios (git commit -am 'Añade una nueva característica').
5. Haz push a la rama (git push origin feature/feature-name).
6. Crea un nuevo Pull Request.
