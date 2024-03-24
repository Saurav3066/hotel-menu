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

const Menu = () => {
  const [selectedSubmenu, setSelectedSubmenu] = useState('Starter');
  const [popupCardData, setPopupCardData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchDropdownVisible, setIsSearchDropdownVisible] = useState(false);
  const [isCompanyNameVisible, setIsCompanyNameVisible] = useState(true);
  const isSmallScreen = useMediaQuery('(max-width:560px)'); // Change the max-width to 560px
  const searchRef = useRef(null);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSearchButtonClick = () => {
    setIsSearchDropdownVisible(true); // Open the dropdown search bar
    setIsCompanyNameVisible(false); // Hide the company name
  };

  const handleClickOutsideSearch = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setIsSearchDropdownVisible(false); // Close the search bar if clicked outside
      setIsCompanyNameVisible(true); // Show the company name
    }
  };

  const filteredFoodItems = (data) => {
    return data.filter((food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleFoodItemClick = (food) => {
    setPopupCardData(food);
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
                    transition: 'background-color 0.3s, color 0.3s', // Add transition for smooth hover effect
                  }}
                  variant="contained"
                  color="primary"
                  onClick={handleSearchButtonClick}
                  startIcon={<SearchIcon />}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#fff'; // Change background color on hover
                    e.target.style.color = '#000000'; // Change text color on hover
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#000000'; // Revert background color on mouse leave
                    e.target.style.color = '#fff'; // Revert text color on mouse leave
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
      <div className="menu-banner">{/* Banner content goes here */}</div>
      <div className="menu-content max-w-full">
        {filteredFoodItems(getSelectedData(selectedSubmenu)).map(
          (food, index) => (
            <div
              key={index}
              className="food-item-container"
              onClick={() => handleFoodItemClick(food)}
            >
              <FoodItem image={food.image} name={food.name} price={food.price} />
            </div>
          )
        )}
      </div>
      {popupCardData && <PopupCard data={popupCardData} onClose={handleClosePopup} />}
    </div>
  );
};

const PopupCard = ({ data, onClose }) => {
  return (
    <div className="popup-card">
      <button className="close-popup" onClick={onClose}>X</button>
      <img
        src={data.image}
        alt={data.name}
        style={{ width: '100%', height: 'auto', fit: 'cover', padding: '10px' }}
      />
      <h2>{data.name}</h2>
      <p>Price: {data.price}</p>
    </div>
  );
};

export default Menu;
