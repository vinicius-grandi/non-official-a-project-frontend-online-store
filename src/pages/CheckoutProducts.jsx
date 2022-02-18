import React from 'react';
import { Redirect } from 'react-router-dom';
import BackArrow from '../components/BackArrow';
import { useProductCount } from '../contexts/ShoppingCartProvider';

const CheckoutProducts = () => {
  const { count, checkoutInfo } = useProductCount();

  const handleForm = () => <Redirect to="/" />;
  if (checkoutInfo.totalPrice === 0) return <Redirect to="/" />;

  return (
    <form
      onSubmit={ (e) => {
        e.preventDefault();
        handleForm();
      } }
    >
      <BackArrow />
      <div className="products">
        <h2>Revise seus Produtos</h2>
        {count.map((product) => (
          <div key={ product.id }>
            <img src={ product.thumbnail } alt={ product.title } />
            <p>{product.title}</p>
            <p className="price">{product.price}</p>
          </div>
        ))}
        <span className="price total-price">{checkoutInfo.totalPrice}</span>
      </div>
      <div className="client-info">
        <h2>Informações do Comprador</h2>
        <div>
          <input
            type="text"
            id="full-name"
            placeholder="Nome Completo"
            data-testid="checkout-fullname"
          />
          <input
            type="text"
            id="cpf"
            placeholder="CPF"
            data-testid="checkout-cpf"
          />
          <input
            type="email"
            id="client-email"
            placeholder="Email"
            data-testid="checkout-email"
          />
          <input
            type="tel"
            id="telephone"
            placeholder="Telefone"
            data-testid="checkout-phone"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="CEP"
            title="Please enter a Zip Code"
            pattern="^\s*?\d{5}(?:[-\s]\d{4})?\s*?$"
            data-testid="checkout-cep"
          />
          <input
            type="text"
            id="address"
            placeholder="Endereço"
            data-testid="checkout-address"
          />
        </div>
        <div>
          <input type="text" id="complement" placeholder="Complemento" />
          <input type="number" id="house-number" placeholder="Número" />
          <input type="text" id="city" placeholder="Cidade" />
          <select id="state" placeholder="Estado">
            <option value="sao paulo">São Paulo</option>
          </select>
        </div>
        <div className="payment-method">
          <label htmlFor="boleto">
            Boleto
            <input type="radio" name="payment" value="boleto" id="boleto" />
          </label>
          <p>Cartão de crédito</p>
          <label htmlFor="visa">
            Visa:
            <input type="radio" name="payment" value="visa" id="visa" />
          </label>
          <label htmlFor="mastercard">
            MasterCard:
            <input type="radio" name="payment" value="mastercard" id="mastercard" />
          </label>
          <label htmlFor="elo">
            Elo:
            <input type="radio" name="payment" value="elo" id="elo" />
          </label>
        </div>
      </div>
      <button type="submit">Comprar</button>
    </form>
  );
};

export default CheckoutProducts;
