import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BackArrow from '../components/BackArrow';
import Review from '../components/ProductDetails/Review';
import ShoppingCartIcon from '../components/ShoppingCart/ShoppingCartIcon';
import { useProductCount } from '../contexts/ShoppingCartProvider';
import * as api from '../services/api';
import ReviewCard from '../components/ProductDetails/ReviewCard';
import { addItem } from '../components/ItemToCart';
import ProductInfo from '../components/ProductDetails/ProductInfo';

const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const { id: urlID } = useParams();
  const { count, productQuantity, setProductQuantity,
    checkoutInfo, setCheckoutInfo, setProductCount } = useProductCount();
  const pQuantity = productQuantity.find(({ id }) => id === product.id);
  const [quantity, setQuantity] = useState(0);
  const [review, setReview] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedProduct = await api.getProductByID(urlID);
      setProduct(fetchedProduct);
    }
    setLoading(false);
    fetchData();
  }, [urlID]);

  if (loading) return <h1>Carregando...</h1>;

  return (
    <div className="shopping-cart">
      <BackArrow />
      <div className="product-details">
        {product.title !== undefined && <ProductInfo product={ product } />}
        <button
          type="button"
          onClick={ () => setQuantity((quantity === 0) ? 0 : quantity - 1) }
        >
          -
        </button>
        <span>{quantity}</span>
        {(((pQuantity === undefined)
          ? 0 : pQuantity.quantity) < product.available_quantity
          && quantity < product.available_quantity)
          && (
            <button
              type="button"
              id="plus-button"
              onClick={ () => setQuantity(quantity + 1) }
            >
              +
            </button>
          )}
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ () => {
            const filteredQuantity = productQuantity.filter(
              ({ id: pid }) => pid !== product.id || pid === undefined,
            );
            setProductQuantity([
              ...filteredQuantity,
              { id: product.id,
                quantity: (pQuantity === undefined)
                  ? 0 + quantity
                  : pQuantity.quantity + quantity }]);

            setCheckoutInfo({
              totalPrice: checkoutInfo.totalPrice + (quantity * product.price) });

            addItem(product, { setProductCount, count }, (quantity !== 0));
            setQuantity(0);
          } }
        >
          Adicionar ao carrinho
        </button>
        <Review
          setReview={ setReview }
          oldReview={ review }
          id={ urlID }
        />
        <div className="reviews">
          {localStorage.getItem(urlID)
          && JSON.parse(localStorage.getItem(urlID)).map(
            (obj) => <ReviewCard review={ obj } key={ Math.random() } />,
          )}
        </div>
      </div>
      <ShoppingCartIcon count={ count } />
    </div>
  );
};

export default ProductDetails;
