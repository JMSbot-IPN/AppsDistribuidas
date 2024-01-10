import React, { useState, useEffect } from 'react';
import Login from './Login';
import ApiKey from './ApiKey';
import FileUploader from './FileUploader';
import FileDownloader from './FileDownloader';
import Pricing from './Pricing';
import AuthFail from './AuthFail';
import AuthSuccess from './AuthSuccess';
import axios from 'axios';

const API_KEY = 'tu_clave_api_secreta';
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
  const [authFlag, setAuthFlag] = useState(false);

  const checkActiveUser = async () => {
    try {
      const response = await axios.get('http://localhost:5000/ActiveUserVerify');
      if (response.status === 200) {
        setAuthFlag(true);
      } else {
        setAuthFlag(false);
      }
    } catch (error) {
      console.error('Error al verificar el usuario activo:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const authStatus = await AuthSuccess(API_KEY);
      console.log('Estado de la Autenticación:', authStatus);
      if (authStatus === 'Success') {
        setAuthFlag(true);
        checkActiveUser(); // Verificar el usuario activo después de la autenticación
      } else {
        setAuthFlag(false);
      }
    };

    fetchData();
    checkActiveUser(); // Verificar el usuario activo al cargar la página
  }, []);

  const handleLoginClick = () => {
    // Lógica para iniciar/cerrar sesión
    if (authFlag) {
      // Si está autenticado, cerrar sesión
      setAuthFlag(false);
    } else {
      // Si no está autenticado, redirigir a iniciar sesión
      setRoute('login');
    }
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

  const handleLogoutClick = () => {
    // Lógica para cerrar sesión
    // setAuthFlag(false); Cambia el estado de autenticación a falso
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
        {authFlag ? (
          <div className="login">
            <button onClick={handleLoginClick}>Iniciar Sesion</button>
          </div>
        ) : (
          <Sesion onLoginClick={handleLoginClick} />
        )}
      </nav>

      {renderComponent()}
    </div>
  );
};

export default App;
