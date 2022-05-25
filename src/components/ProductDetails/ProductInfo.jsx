import React from 'react';
import PropTypes from 'prop-types';

const ProductInfo = ({ product }) => {
  const regex = new RegExp('I.jpg$', 'ig');
  return (
    <>
      <div>
        <h1 data-testid="product-detail-name">
          {`${product.title} - R$${product.price}`}
        </h1>
        {product.shipping.free_shipping
            && (
              <span className="free-shipping">
                <img
                  src="/non-official-a-project-frontend-online-store/images/free-shipping.png"
                  alt="free shipping icon"
                  data-testid="free-shipping"
                />
                Frete Grátis
              </span>
            )}
      </div>
      <div className="product-specs">
        <img
          src={ (product.thumbnail !== undefined)
            ? product.thumbnail.replace(regex, 'O.jpg')
            : undefined }
          alt={ product.title }
        />
        <ul>
          {product.attributes !== undefined
              && product.attributes.map(({ name, value_name: value, id }) => (
                <li key={ id }>
                  <strong>{`${name}: `}</strong>
                  {value}
                </li>
              ))}
        </ul>
      </div>
    </>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.object,
    ],
  ).isRequired,
};

export default ProductInfo;
