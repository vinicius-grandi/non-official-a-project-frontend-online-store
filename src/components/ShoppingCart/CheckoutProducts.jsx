import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutProducts = () => (
  <Link to="/checkout-products">
    <button type="button" data-testid="checkout-product" className="icon-button">
      <img src="images/checkout.png" alt="shpping cart icon" />
    </button>
  </Link>
);

export default CheckoutProducts;
