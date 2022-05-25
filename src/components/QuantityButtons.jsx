import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { addProduct, removeProduct } from '../store/ShoppingCart.store';

const QuantityButtons = ({ setPrice, price, product }) => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch();
  const [productQuantity, setProductQuantity] = useState(
    shoppingCart.productInfo[product.id].quantity,
  );

  const quantityHandle = (value) => {
    setProductQuantity(value);
  };

  useEffect(() => {
    if (productQuantity >= product.available_quantity) {
      document.querySelector(`#${product.id}`).style.display = 'none';
    } else {
      document.querySelector(`#${product.id}`).style.display = 'initial';
    }
  }, [productQuantity, product.available_quantity, product.id]);

  const priceHandle = (value) => {
    setPrice(value);
  };

  return (
    <div>
      <button
        data-testid="product-decrease-quantity"
        type="button"
        onClick={ () => {
          dispatch(removeProduct(product));
          const sub = price - product.price;
          priceHandle((productQuantity > 0) ? sub : price);
          quantityHandle((productQuantity === 0) ? 0 : productQuantity - 1);
        } }
      >
        -
      </button>
      <span>{productQuantity}</span>
      <button
        data-testid="product-increase-quantity"
        type="button"
        id={ product.id }
        onClick={ () => {
          dispatch(addProduct(product));
          const sum = price + product.price;
          priceHandle(sum);
          quantityHandle(productQuantity + 1);
        } }
      >
        +
      </button>
    </div>
  );
};

QuantityButtons.propTypes = {
  product: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.object,
    ],
  ).isRequired,
  setPrice: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
};

export default QuantityButtons;
