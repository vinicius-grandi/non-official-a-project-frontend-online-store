import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useProductCount } from '../contexts/ShoppingCartProvider';

const QuantityButtons = ({ setPrice, price, product }) => {
  const { setCheckoutInfo,
    productQuantity: quantity, setProductQuantity: setQuantity,
    count, setProductCount } = useProductCount();
  const [productQuantity, setProductQuantity] = useState(
    quantity.find(({ id }) => id === product.id).quantity,
  );

  const quantityHandle = (value) => {
    const { id } = product;
    setProductQuantity(value);

    const filteredQuantity = quantity.filter(
      ({ id: pid }) => pid !== id || pid === undefined,
    );

    setQuantity([
      ...filteredQuantity,
      { id, quantity: value }]);

    if (value === 0) {
      const filteredCount = count.filter(({ id: pid }) => id !== pid);
      setProductCount(filteredCount);
    }
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

    setCheckoutInfo({ totalPrice: value.toFixed(2) });
  };

  return (
    <div>
      <button
        data-testid="product-increase-quantity"
        type="button"
        onClick={ () => {
          const sub = price - product.price;
          priceHandle((productQuantity > 0) ? sub : price);
          quantityHandle((productQuantity === 0) ? 0 : productQuantity - 1);
        } }
      >
        -
      </button>
      <span>{productQuantity}</span>
      <button
        data-testid="product-decrease-quantity"
        type="button"
        id={ product.id }
        onClick={ () => {
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
