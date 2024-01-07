from flask import Flask, request, jsonify

app = Flask(__name__)

# Clave API simulada (reemplaza esto con tu manejo de claves real)
API_KEY = 'tu_clave_api_secreta'

@app.route('/recurso_protegido', methods=['GET'])
def recurso_protegido():
    api_key = request.headers.get('API-Key')

    if api_key and api_key == API_KEY:
        # Si la clave API es válida, devuelve los datos protegidos
        return jsonify({'mensaje': '¡Acceso concedido al recurso protegido!'})
    else:
        # Si la clave API es incorrecta o no está presente, devuelve un error de acceso no autorizado
        return jsonify({'error': 'Acceso no autorizado'}), 401

if __name__ == '__main__':
    app.run(debug=True)
