from flask import Flask, request, jsonify, send_file
import threading
from threading import Thread
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

APIkeyFlag = 'Fail'
DlData = ''

def APIkey(param):
    global APIkeyFlag

    try:
        response = requests.get('http://169.254.129.3:5000/recurso_protegido', headers={'API-Key': param})
        
        if response.status_code == 200:
            data = response.json()
            if data.get('Auth') == 'Success':
                APIkeyFlag = 'Success'
            else:
                APIkeyFlag = 'Fail'
        else:
            APIkeyFlag = 'Fail'

    except Exception as error:
        print(error)
        return 'Fail'
    
@app.route('/redirect_APIkey', methods=['GET'])
def redirect():
    param = request.args.get('Key')
    thread = threading.Thread(target=APIkey, args=(param,))
    thread.start()
    thread.join()  # Esperar a que el hilo termine
    return APIkeyFlag

def uploadFile(archivo):
    files = {'file': (archivo.filename, archivo, archivo.content_type)}
    print(files)
    try:
        response = requests.post('http://169.254.129.3:5000/upload', files=files)
        print(response.json())
    except requests.exceptions.RequestException as e:
        print("Error:", e)
        print(archivo)

@app.route('/redirect_upload', methods=['POST'])
def redirect_upload():
    archivo_cargado = request.files['file']
    thread = threading.Thread(target=uploadFile, args=(archivo_cargado,))
    thread.start()
    thread.join()
    return jsonify({'mensaje': 'Archivo cargado exitosamente'})

def downloadFile(nombre_archivo):
    global DlData
    try:
        response = requests.get('http://169.254.129.3:5000/download/'+nombre_archivo)
        DlData = response.content
    except requests.exceptions.RequestException as e:
        print("Error:", e)

@app.route('/redirect_download/<nombre_archivo>', methods=['GET'])
def redirect_download(nombre_archivo):
    thread = threading.Thread(target=downloadFile, args=(nombre_archivo,))
    thread.start()
    thread.join()
    return DlData

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
