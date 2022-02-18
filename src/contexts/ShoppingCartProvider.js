import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ShoppingCartContext = createContext();

function ShoppingCartProvider({ children }) {
  const [count, setProductCount] = useState([]);
  const [checkoutInfo, setCheckoutInfo] = useState({ totalPrice: 0 });
  const [productQuantity, setProductQuantity] = useState([]);
  return (
    <ShoppingCartContext.Provider
      value={
        { count,
          setProductCount,
          checkoutInfo,
          setCheckoutInfo,
          productQuantity,
          setProductQuantity }
      }
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

ShoppingCartProvider.propTypes = {
  children: PropTypes.shape({
    $$typeof: PropTypes.symbol,
  }).isRequired,
};

export function useProductCount() {
  const context = useContext(ShoppingCartContext);
  const {
    count, setProductCount,
    checkoutInfo, setCheckoutInfo,
    productQuantity, setProductQuantity,
  } = context;
  return {
    count,
    setProductCount,
    checkoutInfo,
    setCheckoutInfo,
    productQuantity,
    setProductQuantity,
  };
}

export default ShoppingCartProvider;
