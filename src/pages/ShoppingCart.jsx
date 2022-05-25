import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import BackArrow from '../components/BackArrow';
import CheckoutProducts from '../components/ShoppingCart/CheckoutProducts';
import ShoppingCartProduct from '../components/ShoppingCart/ShoppingCartProduct';

const ShoppingCart = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [price, setPrice] = useState(shoppingCart.totalPrice);

  return (
    <>
      <header className="shopping-cart-header">
        <BackArrow />
        <CheckoutProducts />
      </header>
      {Object.values(shoppingCart.productInfo).length < 1
        ? (
          <h1 data-testid="shopping-cart-empty-message" id="shopping-cart-empty-message">
            O seu carrinho está vazio
          </h1>
        )
        : (
          <div className="products-in-cart">
            {Object.values(shoppingCart.productInfo).map((product) => (
              <ShoppingCartProduct
                price={ price }
                setPrice={ setPrice }
                product={ product }
                key={ product.id }
              />
            ))}
            <span className="price total-price">
              {shoppingCart.totalPrice}
            </span>
          </div>
        )}
      <p><a href="https://icons8.com/icon/26191/back-arrow">Back Arrow icon by Icons8</a></p>
    </>
  );
};

export default ShoppingCart;
