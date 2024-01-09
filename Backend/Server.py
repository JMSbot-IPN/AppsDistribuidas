from flask import Flask, request, send_file, jsonify, render_template
from flask_cors import CORS
from tkinter import Tk
from tkinter.filedialog import askopenfilename
import stripe
import os
import pyodbc

app = Flask(__name__)
CORS(app)
stripe.api_key = os.getenv('STRIPE_SECRET_TEST')

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
    print(archivo_cargado)
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
    print(ruta_archivo)
    if os.path.exists(ruta_archivo):
        return send_file(ruta_archivo, as_attachment=True)
    return jsonify({'mensaje': 'Archivo no encontrado'})

@app.route('/payment', methods=['POST'])
def make_payment():
    data = request.get_json()
    amount = data.get('amount')
    payment_method_id = data.get('id')

    try:
        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency='usd',
            description='Spatula company',
            payment_method=payment_method_id,
            confirm=True
        )
        print("Payment", payment_intent)
        return jsonify({
            'message': 'Payment successful',
            'success': True
        }), 200
    except stripe.error.CardError as e:
        print("Error", str(e))
        return jsonify({
            'message': 'Payment failed',
            'success': False
        }), 400
    
@app.route('/sesion', methods=['GET'])
def iniciar_sesion():
    mail = request.args.get('mail')
    pwd = request.args.get('pwd')

    conn_str = 'DRIVER={SQL Server};SERVER=base-app-dist.database.windows.net;DATABASE=BaseAppsDist;UID=kykar;PWD=Esquites123.'
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()

    # Uso de parámetros en la consulta para evitar inyección SQL
    cursor.execute('SELECT * FROM usuario WHERE correo = ? AND pass = ?', (mail, pwd))
    rows = cursor.fetchall()

    # Convertir los resultados a una lista de diccionarios
    results = []
    columns = [column[0] for column in cursor.description]
    for row in rows:
        results.append(dict(zip(columns, row)))

    cursor.close()
    conn.close()

    return jsonify(results)

@app.route('/registro', methods=['POST'])
def registrar_usuario():
    data = request.get_json()
    correo = data.get('correo')
    pwd = data.get('pwd')
    api_key = 'myapikey'

    conn_str = 'DRIVER={SQL Server};SERVER=base-app-dist.database.windows.net;DATABASE=BaseAppsDist;UID=kykar;PWD=Esquites123.'
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()

    # Uso de parámetros en la consulta para evitar inyección SQL
    cursor.execute('INSERT INTO usuario (correo, pass, api_key, tipo_plan) VALUES (?, ?, ?, ?)', (correo, pwd, api_key, 'basico'))
    conn.commit()

    cursor.close()
    conn.close()

    return jsonify({'message': 'Usuario registrado exitosamente'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)