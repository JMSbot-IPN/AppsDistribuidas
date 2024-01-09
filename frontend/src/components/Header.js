import React, { useState } from 'react';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header>
      <img src="https://platzi.com/assets/img/logo.svg" alt="Logo" />
      <nav>
        <ul>
          <li><a href="#">Inicio</a></li>
          <li><a href="#">Busqueda</a></li>
          <li><a href="#">perfil</a></li>
        </ul>
      </nav>
      
    </header>
  );
};

export default Header;
