import React, { useState } from 'react';

const Factura = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      <img src="https://platzi.com/assets/img/logo.svg" alt="Logo" />
      <nav>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Busqueda</a></li>
          <li><a href="#">perfil</a></li>
        </ul>
      </nav>
      
    </div>
  );
};

export default Factura;
