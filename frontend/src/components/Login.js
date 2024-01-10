import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  var correo = loginEmail;
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:5000/sesion', {
        params: {
          mail: loginEmail,
          pwd: loginPassword
        }
      });

      console.log('Respuesta de inicio de sesión:', response.data);
      // Aquí puedes manejar la respuesta como desees, actualizar el estado, redirigir, etc.
      if (response.status === 200) {
        try {
          const ActiveUser = await axios.post(`http://localhost:5000/ActiveUser`, {
            correo: correo
          });
          console.log('Respuesta de activación de usuario:', ActiveUser.data);
          // Mensaje emergente de sesión iniciada y recargar la página
          window.alert('Sesión iniciada correctamente');
          window.location.reload();
        } catch (error) {
          console.error('Error al activar usuario:', error);
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/registro', {
        correo: loginEmail,
        pwd: loginPassword,
      });

      setMessage(response.data.mensaje);
      setIsRegistering(false);
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    }
  };

  const toggleRegister = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div>
      {!showRegister ? (
        <div>
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit">Iniciar Sesión</button>
          </form>
          <p>
            ¿No tienes una cuenta?{' '}
            <a href="#" onClick={toggleRegister}>
              Regístrate
            </a>
          </p>
        </div>
      ) : (
        <div>
          <h2>Registrarse</h2>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit">Registrarse</button>
          </form>
          <p>
            ¿Ya tienes una cuenta?{' '}
            <a href="#" onClick={toggleRegister}>
              Iniciar Sesión
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Login;
