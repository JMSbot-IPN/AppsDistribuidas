import React, { useState, useEffect } from 'react';
import Login from './Login';
import ApiKey from './ApiKey';
import FileUploader from './FileUploader';
import FileDownloader from './FileDownloader';
import Pricing from './Pricing';
import AuthFail from './AuthFail';
import AuthSuccess from './AuthSuccess';

const API_KEY = 'tu_clave_api_secreta' + Math.random();
var AuthFlag = false;


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

const App = () => {
  const [route, setRoute] = useState('home');

  useEffect(() => {
    const fetchData = async () => {
      const authStatus = await AuthSuccess(API_KEY);
      console.log('Estado de la Autenticación:', authStatus);
      if (authStatus === 'Success') {
        AuthFlag = true;
      }
    };

    fetchData();
  }, []);

  const handleLoginClick = () => {
    setRoute('login'); // Redirige a la sección de inicio de sesión
  };

  const renderComponent = () => {
    switch (route) {
      case 'subir':
        if (AuthFlag) {
          return <FileUploader />;
        } else {
        return <AuthFail />;
        }
      case 'bajar':
        if (AuthFlag) {
          return <FileDownloader />;
        } else {
        return <AuthFail />;
        }
      case 'apikey':
        return <ApiKey API_KEY={API_KEY}/>;
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
