import requests

# URL del servidor y recurso protegido
server_url = 'http://localhost:5000/recurso_protegido'

# Clave API a enviar
api_key = 'tu_clave_api_secreta'

# Configuración del encabezado con la clave API
headers = {
    'API-Key': api_key
}

# Realizar la solicitud GET al recurso protegido
response = requests.get(server_url, headers=headers)

# Mostrar la respuesta del servidor
print(response.json())
