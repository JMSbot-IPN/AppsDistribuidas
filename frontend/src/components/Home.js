import React, { useState } from 'react';
import Login from './Login';
import ApiKey from './ApiKey';
import FileUploader from './FileUploader';
import FileDownloader from './FileDownloader';
import Pricing from './Pricing';

const Home = () => (
  <div>
    <h1>Bienvenido a la Página de Inicio</h1>
    <p>Selecciona una opción del menú de navegación.</p>
  </div>
);

const Sesion = ({ onLoginClick }) => (
  <div className="login">
    <button onClick={onLoginClick}>Iniciar Sesión</button>
  </div>
);

const Planes = () => (
  <div>
    <h2>Página de Planes</h2>
    <p>Aquí puedes ver los planes de suscripción.</p>
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
        return <FileUploader />;
      case 'bajar':
        return <FileDownloader />;
      case 'apikey':
        return <ApiKey />;
      case 'login':
        return <Login />;
      case 'planes':
        return <Pricing />;
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
          <li onClick={() => setRoute('planes')}>Planes</li>
        </ul>
        <Sesion onLoginClick={handleLoginClick} />
      </nav>

      {renderComponent()}
    </div>
  );
};

export default App;
