import React, { useState } from 'react';
import Login from './Login';

const Home = () => (
  <div>
    <h1>Bienvenido a la Página de Inicio</h1>
    <p>Selecciona una opción del menú de navegación.</p>
  </div>
);

const Subir = () => (
  <div>
    <h2>Página de Subir</h2>
    <p>Aquí puedes subir archivos.</p>
  </div>
);

const Bajar = () => (
  <div>
    <h2>Página de Bajar</h2>
    <p>Aquí puedes descargar archivos.</p>
  </div>
);

const ApiKey = () => (
  <div>
    <h2>Página de ApiKey</h2>
    <p>Aquí puedes gestionar tu clave API.</p>
  </div>
);

const Sesion = ({ onLoginClick }) => (
  <div className="login">
    <button onClick={onLoginClick}>Iniciar Sesión</button>
  </div>
);

const App = () => {
  const [route, setRoute] = useState('home');

  const handleLoginClick = () => {
    setRoute('login'); // Redirige a la sección de inicio de sesión
  };

  const renderComponent = () => {
    switch (route) {
      case 'subir':
        return <Subir />;
      case 'bajar':
        return <Bajar />;
      case 'apikey':
        return <ApiKey />;
      case 'login':
        // Aquí puedes redirigir a la sección de inicio de sesión, tal vez con un componente separado
        return <Login />;
      default:
        return <Home />;
    }
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li onClick={() => setRoute('home')}>Inicio</li>
          <li onClick={() => setRoute('subir')}>Subir</li>
          <li onClick={() => setRoute('bajar')}>Bajar</li>
          <li onClick={() => setRoute('apikey')}>Apikey</li>
        </ul>
        <Sesion onLoginClick={handleLoginClick} />
      </nav>

      {renderComponent()}
    </div>
  );
};

export default App;
