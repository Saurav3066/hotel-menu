import React, { useState, useEffect, useRef } from 'react';
import Submenu from './Submenu.js';
import FoodItem from './FoodItems.js';
import starterData from './data/starterData.js';
import fullCourseData from './data/fullCourseData.js';
import beverageData from './data/beverageData.js';
import dessertData from './data/dessertData.js';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import './css/menu.css';
import Logo from './images/logo.png';
import Banner from './images/foodyes.png';

const Menu = () => {
  const [selectedSubmenu, setSelectedSubmenu] = useState('Starter');
  const [popupCardData, setPopupCardData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchDropdownVisible, setIsSearchDropdownVisible] = useState(false);
  const [isCompanyNameVisible, setIsCompanyNameVisible] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:560px)'); // Change the max-width to 560px
  const searchRef = useRef(null);
  const longPressTimeout = useRef(null);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSearchButtonClick = () => {
    setIsSearchDropdownVisible(true);
    setIsCompanyNameVisible(false); 
  };

  const handleClickOutsideSearch = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchDropdownVisible(false); 
      setIsCompanyNameVisible(true);
    }
  };

  const filteredFoodItems = (data) => {
    return data.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleFoodItemPress = (food) => {
    longPressTimeout.current = setTimeout(() => {
      setPopupCardData(food);
    }, 500); // Set the long press duration (milliseconds)
  };

  const handleFoodItemRelease = () => {
    clearTimeout(longPressTimeout.current);
    setPopupCardData(null);
  };

  const handleClosePopup = () => {
    setPopupCardData(null);
  };

  const handleSubmenuClick = (submenu) => {
    setSelectedSubmenu(submenu);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (!isSmallScreen) {
      setIsSearchDropdownVisible(false);
    }
  }, [isSmallScreen]);

  const getSelectedData = (selectedSubmenu) => {
    switch (selectedSubmenu) {
      case 'Starter':
        return starterData;
      case 'Full Course':
        return fullCourseData;
      case 'Beverage':
        return beverageData;
      case 'Dessert':
        return dessertData;
      default:
        return [];
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutsideSearch);
    return () => {
      document.removeEventListener('mousedown', handleClickOutsideSearch);
    };
  }, []);

  return (
    <div className="menu-container">
      <header className="menu-header">
        <div className="logo">
          <img src={Logo} alt="Logo" />
        </div>
        {isCompanyNameVisible && (
          <div className="company-name">Foodies</div>
        )}
        {isSmallScreen ? (
          <>
            {isSearchDropdownVisible ? (
              <div ref={searchRef} className="search-bar">
                <input
                  type="text"
                  placeholder={`Search in ${selectedSubmenu}`}
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                {searchTerm && (
                  <button className="clear-search" onClick={handleClearSearch}>
                    X
                  </button>
                )}
              </div>
            ) : (
              <Button
                className="search-button"
                style={{
                  backgroundColor: '#000000',
                  color: '#fff',
                  borderRadius: '5px',
                  padding: '8px 0px 8px 6px',
                  fontSize: '30px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none',
                  transition: 'background-color 0.3s, color 0.3s',
                }}
                variant="contained"
                color="primary"
                onClick={handleSearchButtonClick}
                startIcon={<SearchIcon />}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#fff';
                  e.target.style.color = '#000000'; 
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#000000';
                  e.target.style.color = '#fff';
                }}
              >
              </Button>
            )}
          </>
        ) : (
          <>
            <div className="search-bar">
              <input
                type="text"
                placeholder={`Search in ${selectedSubmenu}`}
                value={searchTerm}
                onChange={handleSearchInputChange}
                onClick={() => setIsSearchDropdownVisible(true)}
              />
              {searchTerm && (
                <button className="clear-search" onClick={handleClearSearch}>
                  X
                </button>
              )}
            </div>
          </>
        )}
        {isSearchDropdownVisible && (
          <div className="dropdown-search">
            <input
              type="text"
              placeholder={`Search in ${selectedSubmenu}`}
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
            {searchTerm && (
              <button className="clear-search" onClick={handleClearSearch}>
                X
              </button>
            )}
          </div>
        )}
      </header>
      <Submenu
        onStarterClick={() => handleSubmenuClick('Starter')}
        onFullCourseClick={() => handleSubmenuClick('Full Course')}
        onBeverageClick={() => handleSubmenuClick('Beverage')}
        onDessertClick={() => handleSubmenuClick('Dessert')}
      />

      <img className="menu-banner" src={Banner} alt='' />
      <div className="menu-content max-w-full">
        {filteredFoodItems(getSelectedData(selectedSubmenu)).map(
          (food, index) => (
            <div
              key={index}
              className="food-item-container"
              onClick={() => handleFoodItemPress(food)}
              onMouseDown={() => handleFoodItemPress(food)}
              onMouseUp={handleFoodItemRelease}
              onTouchStart={() => handleFoodItemPress(food)}
              onTouchEnd={handleFoodItemRelease}
              onTouchCancel={handleFoodItemRelease}
            >
              {popupCardData === food && (
                <PopupCard data={popupCardData} onClose={handleClosePopup} />
              )}
              <FoodItem image={food.image} />
            </div>
          )
        )}
      </div>
    </div>
  );
};

const PopupCard = ({ data, onClose }) => {
  return (
    <div className="popup-card">
      {/* <button className="close-popup" onClick={onClose}>X</button> */}
      <div className='card-image-container'>
      <img
        src={data.image}
        alt={data.name}
        style={{ width:'auto', height:'auto', objectFit:'cover' }}
      />
      </div>
      <div className="popup-content">
        <h2>{data.name}</h2>
        <p>Price: {data.price}</p>
        <p> {data.description}</p>
      </div>
    </div>
  );
};

export default Menu;

