from flask import Flask, request, send_file, jsonify, render_template
from flask_cors import CORS
from tkinter import Tk
from tkinter.filedialog import askopenfilename
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return render_template('src/App.js')

# Clave API simulada (reemplaza esto con tu manejo de claves real)
API_KEY = 'tu_clave_api_secreta'

@app.route('/recurso_protegido', methods=['GET'])
def recurso_protegido():
    api_key = request.headers.get('API-Key')

    if api_key and api_key == API_KEY:
        # Si la clave API es válida, devuelve los datos protegidos
        return jsonify({'Auth':'Success'})
    else:
        # Si la clave API es incorrecta o no está presente, devuelve un error de acceso no autorizado
        return jsonify({'Auth':'Fail'}), 401
    
@app.route('/upload', methods=['POST'])
def cargar_archivo():
    archivo_cargado = request.files['file']
    if archivo_cargado.filename != '':
        # Establece la ubicación donde se almacenarán los archivos cargados
        carpeta_carga = 'cargas'
        os.makedirs(carpeta_carga, exist_ok=True)
        ruta_archivo = os.path.join(carpeta_carga, archivo_cargado.filename)
        archivo_cargado.save(ruta_archivo)
        return jsonify({'mensaje': 'Archivo cargado exitosamente'})

# Ruta para descargar un archivo desde el servidor
@app.route('/download/<nombre_archivo>', methods=['GET'])
def descargar_archivo(nombre_archivo):
    ruta_archivo = os.path.join('cargas', nombre_archivo)
    if os.path.exists(ruta_archivo):
        return send_file(ruta_archivo, as_attachment=True)
    return jsonify({'mensaje': 'Archivo no encontrado'})

if __name__ == '__main__':
    app.run(debug=True)