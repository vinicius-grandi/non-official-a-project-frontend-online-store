import React from 'react';
import { Redirect } from 'react-router-dom';
import BackArrow from '../components/BackArrow';
import { useProductCount } from '../contexts/ShoppingCartProvider';
import brazilianStates from '../data/brazilianStates.json'

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
      <h2>Informações do Comprador</h2>
      <div className="client-info">
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
            {brazilianStates.map(
              (val) => <option key={val} value={val}>{val}</option>
            )}
          </select>
        </div>
        <h2>Métodos de Pagamento</h2>
        <div className="payment-method">
          <label htmlFor="boleto">
            <input type="radio" name="payment" value="boleto" id="boleto" />
            Boleto
          </label>
          <p>Cartão de crédito</p>
          <div id="credit-card">
            <label htmlFor="visa">
              <input type="radio" name="payment" value="visa" id="visa" />
              Visa
            </label>
            <label htmlFor="mastercard">
              <input type="radio" name="payment" value="mastercard" id="mastercard" />
              MasterCard
            </label>
            <label htmlFor="elo">
              <input type="radio" name="payment" value="elo" id="elo" />
              Elo
            </label>
          </div>
        </div>
      </div>
      <button type="submit" id="confirm-purchase-button">Comprar</button>
    </form>
  );
};

export default CheckoutProducts;
