import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ShoppingCartIcon = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart);

  return (
    <Link to="/shopping-cart" id="shopping-icon">
      <button type="button" data-testid="shopping-cart-button" className="icon-button">
        <span
          className="product-count"
          data-testid="shopping-cart-size"
        >
          {shoppingCart.totalQuantity}
        </span>
        <img src="/non-official-a-project-frontend-online-store/images/shopping-cart.png" alt="shpping cart icon" />
      </button>
    </Link>
  );
};

export default ShoppingCartIcon;
