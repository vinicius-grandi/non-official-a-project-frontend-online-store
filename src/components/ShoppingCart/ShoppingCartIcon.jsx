import React from 'react';
import { Link } from 'react-router-dom';
import { useProductCount } from '../../contexts/ShoppingCartProvider';

const ShoppingCartIcon = () => {
  const { productQuantity } = useProductCount();

  return (
    <Link to="/shopping-cart" id="shopping-icon">
      <button type="button" data-testid="shopping-cart-button" className="icon-button">
        <span
          className="product-count"
          data-testid="shopping-cart-size"
        >
          {productQuantity.reduce((ac, { quantity }) => ac + quantity, 0)}
        </span>
        <img src="/images/shopping-cart.png" alt="shpping cart icon" />
      </button>
    </Link>
  );
};

export default ShoppingCartIcon;
