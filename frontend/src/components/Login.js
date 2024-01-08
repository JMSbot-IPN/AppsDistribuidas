import React, { useState } from 'react';

const Login = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    // Lógica de inicio de sesión
    console.log('Inicio de sesión:', { email: loginEmail, password: loginPassword });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    // Lógica de registro de usuario
    console.log('Registro de usuario:', { email: loginEmail, password: loginPassword });
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
