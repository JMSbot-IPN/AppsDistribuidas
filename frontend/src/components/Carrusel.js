import React, { useState } from "react";

const Carrusel = () => {
  const [images, setImages] = useState([
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Mont_Blanc_panorama_from_Aiguille_du_Midi.jpg/1200px-Mont_Blanc_panorama_from_Aiguille_du_Midi.jpg",
      alt: "Mont Blanc",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Grand_Canyon_South_Rim_Viewpoint.jpg/1200px-Grand_Canyon_South_Rim_Viewpoint.jpg",
      alt: "Gran Cañón",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Sydney_Opera_House_at_sunset.jpg/1200px-Sydney_Opera_House_at_sunset.jpg",
      alt: "Ópera de Sydney",
    },
  ]);
  const [activeIndex, setActiveIndex] = useState(0); // Inicializa con el índice 0


  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel">
      <ul className="carousel-items">
        {images.map((image, i) => (
          <li key={i} className="carousel-item" onClick={() => handleClick(i)}>
            <img src={image.src} alt={image.alt} />
          </li>
        ))}
      </ul>
      <div className="carousel-controls">
        <button className="carousel-control" onClick={() => handleClick(0)}>
          <i className="fas fa-angle-left"></i>
        </button>
        <button className="carousel-control" onClick={() => handleClick(images.length - 1)}>
          <i className="fas fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Carrusel;