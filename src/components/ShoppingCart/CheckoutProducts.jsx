import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutProducts = () => (
  <Link to="/checkout-products">
    <button type="button" data-testid="checkout-product" className="icon-button">
      <img src="/non-official-a-project-frontend-online-store/images/checkout.png" alt="shopping cart icon" />
    </button>
  </Link>
);

export default CheckoutProducts;
