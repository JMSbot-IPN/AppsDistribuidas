import pyodbc

# Establecer la cadena de conexión
conn_str = 'DRIVER={SQL Server};SERVER=base-app-dist.database.windows.net;DATABASE=BaseAppsDist;UID=kykar;PWD=Esquites123.'

# Conectar a la base de datos
conn = pyodbc.connect(conn_str)

# Crear un cursor para ejecutar consultas
cursor = conn.cursor()

# Ejecutar la consulta en la tabla "usuario"
cursor.execute(f'SELECT * FROM usuario WHERE id = {id}')

# Obtener los resultados de la consulta
results = cursor.fetchall()

# Imprimir los resultados
for row in results:
    print(row)

# Cerrar la conexión y el cursor
cursor.close()
conn.close()
