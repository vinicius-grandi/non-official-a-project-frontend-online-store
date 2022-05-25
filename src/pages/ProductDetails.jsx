import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductByQuantity } from '../store/ShoppingCart.store';
import { useParams } from 'react-router-dom';
import BackArrow from '../components/BackArrow';
import Review from '../components/ProductDetails/Review';
import ShoppingCartIcon from '../components/ShoppingCart/ShoppingCartIcon';
import * as api from '../services/api';
import ReviewCard from '../components/ProductDetails/ReviewCard';
import ProductInfo from '../components/ProductDetails/ProductInfo';

const ProductDetails = () => {
  const shoppingCart = useSelector((state) => state.shoppingCart);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const { id: urlID } = useParams();
  const pQuantity = shoppingCart.productInfo[urlID];
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
            dispatch(addProductByQuantity({
              ...product,
              quantity,
            }));
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
      <ShoppingCartIcon />
    </div>
  );
};

export default ProductDetails;
