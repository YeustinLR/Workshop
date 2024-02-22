from flask import Flask, request, jsonify

app = Flask(__name__)  # Crea una instancia de la aplicación Flask

# Definición del primer endpoint para manejar solicitudes GET a /hello
@app.route('/hello', methods=['GET'])
def hello():
    message = request.args.get('message', 'World')  # Obtiene el parámetro 'message' de la solicitud GET
    return jsonify({'response': f'Hello {message}'})  # Retorna un mensaje JSON con la respuesta

# Definición del segundo endpoint para manejar solicitudes POST a /user
@app.route('/user', methods=['POST'])
def create_user():
    data = request.json  # Obtiene los datos JSON enviados en el cuerpo de la solicitud POST
    name = data.get('name')  # Obtiene el valor del campo 'name' del JSON
    lastname = data.get('lastname')  # Obtiene el valor del campo 'lastname' del JSON
    if name and lastname:  # Verifica si se proporcionaron ambos campos
        return jsonify({'response': f'El usuario {name} {lastname} fue creado'})  # Retorna un mensaje JSON con la respuesta
    else:
        return jsonify({'response': 'Faltan datos para crear el usuario'}), 400  # Retorna un mensaje JSON de error con el código de estado 400

if __name__ == '__main__':
    port = 3001
    print(f"La aplicación Flask está escuchando en el puerto {port}!")
    app.run(debug=True, port=port)  # Inicia la aplicación Flask en modo de depuración si este archivo se ejecuta directamente