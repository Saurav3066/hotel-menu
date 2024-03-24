import React, { useState } from 'react';
import './css/submenu.css';

const Submenu = ({ onStarterClick, onFullCourseClick, onBeverageClick, onDessertClick }) => {
  const [activeButton, setActiveButton] = useState('Starter');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    switch (buttonName) {
      case 'Starter':
        onStarterClick();
        break;
      case 'Full Course':
        onFullCourseClick();
        break;
      case 'Beverage':
        onBeverageClick();
        break;
      case 'Dessert':
        onDessertClick();
        break;
      default:
        break;
    }
  };

  return (
    <div className="submenu-container">
      <button
        className={`submenu-button ${activeButton === 'Starter' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Starter')}
      >
        Starter
      </button>
      <button
        className={`submenu-button ${activeButton === 'Full Course' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Full Course')}
      >
        Full Course
      </button>
      <button
        className={`submenu-button ${activeButton === 'Beverage' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Beverage')}
      >
        Beverage
      </button>
      <button
        className={`submenu-button ${activeButton === 'Dessert' ? 'active' : ''}`}
        onClick={() => handleButtonClick('Dessert')}
      >
        Dessert
      </button>
    </div>
  );
};

export default Submenu;
