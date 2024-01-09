import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Database = ({ mail, pwd }) => {
  const [result, setResult] = useState('');

  useEffect(() => {
    const iniciarSesion = async () => {
      try {
        const response = await axios.get('http://localhost:5000/sesion', 
            {params :{
                mail: mail,
                pwd: pwd
            }}
        );

        // Verifica el resultado y actualiza el estado 'result' en función de eso
        setResult(response.data ? 'Coincidencia encontrada' : 'No se encontró coincidencia');
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    };

    iniciarSesion(); // Llama a la función al cargar el componente
  }, [mail, pwd]); // Ejecuta el efecto cuando cambian 'mail' o 'pwd'

  return (
    <div>
      <p>Resultado: {result}</p>
    </div>
  );
};

export default Database;


