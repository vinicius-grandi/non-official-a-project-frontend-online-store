import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useProductCount } from '../contexts/ShoppingCartProvider';
import * as api from '../services/api';
import ItemToCart from './ItemToCart';

const Products = ({ search, category }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { count, setProductCount,
    productQuantity, setProductQuantity,
    setCheckoutInfo, checkoutInfo } = useProductCount();
  const props = {
    count,
    setProductCount,
    productQuantity,
    setProductQuantity,
    setCheckoutInfo,
    checkoutInfo,
  };

  useEffect(() => {
    api.getProductsFromCategoryAndQuery(category, search).then((res) => {
      setProducts(res.results);
      setLoading(false);
    });
  }, [category, search]);

  if (loading) return <h1>Carregando...</h1>;

  return (
    <>
      {products.map((product) => (
        <div className="product" data-testid="product-detail-link" key={ product.id }>
          <p data-testid="product">
            <Link to={ `/${product.id}` }>
              {product.title}
            </Link>
          </p>
          <div>
            <img src={ `${product.thumbnail}` } alt={ `${product.title}` } />
            {product.shipping.free_shipping
            && (
              <span>
                <img
                  src="images/free-shipping.png"
                  alt="free shipping icon"
                  className="free-shipping"
                  data-testid="free-shipping"
                />
                Frete Grátis
              </span>
            )}
          </div>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            className="add-to-cart-button"
            onClick={ () => ItemToCart({ props, product }) }
          >
            Adicionar ao carrinho
          </button>
          <p data-testid="product" className="price">{product.price}</p>
        </div>
      ))}
    </>
  );
};

Products.propTypes = {
  search: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Products;
