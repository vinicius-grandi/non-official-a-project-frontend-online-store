import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../store/ShoppingCart.store';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../services/api';

const Products = ({ search, category }) => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
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
              <span className="free-shipping"
              >
                <img
                  src="/non-official-a-project-frontend-online-store/images/free-shipping.png"
                  alt="free shipping icon"
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
            onClick={ () => {
              dispatch(addProduct(product));
            } }
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
