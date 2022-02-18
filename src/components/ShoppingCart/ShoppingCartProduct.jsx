import React from 'react';
import PropTypes from 'prop-types';
import QuantityButtons from '../QuantityButtons';

const ShoppingCartProduct = ({ product, setPrice, price }) => (
  <div className="product-cart-card">
    <img src={ product.thumbnail } alt={ product.title } />
    <p data-testid="shopping-cart-product-name">
      {product.title}
    </p>
    <QuantityButtons setPrice={ setPrice } price={ price } product={ product } />
    <p className="price">
      {product.price}
    </p>
  </div>
);

ShoppingCartProduct.propTypes = {
  product: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.object,
    ],
  ).isRequired,
  setPrice: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};

export default ShoppingCartProduct;
