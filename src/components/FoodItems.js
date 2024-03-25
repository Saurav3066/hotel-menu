import React from 'react';
import PropTypes from 'prop-types';
import './css/foodItem.css'; 

const FoodItem = ({ image, name, price, description,onLongPress }) => {
  return (
    <div className="food-item-container" onContextMenu={e => {
        e.preventDefault(); 
        onLongPress();
      }}>
      <img src={image} alt={name} className="food-item-image" />
      <p className="food-item-name">{name}</p>
      <p className="food-item-price">{price}</p>
      <p className='food-item-description'>{description}</p>
    </div>
  );
};

FoodItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
  onLongPress: PropTypes.func.isRequired,
};

FoodItem.defaultProps = {
  image: '',
  name: '',
  price: '',
  description: '',
};

export default FoodItem;
