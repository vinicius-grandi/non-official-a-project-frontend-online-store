export function addItem(product, { setProductCount, count }, opt) {
  if (!count.find(({ id }) => id === product.id) && opt) {
    setProductCount([...count,
      { title: product.title,
        id: product.id,
        thumbnail: product.thumbnail,
        price: product.price,
        available_quantity: product.available_quantity,
      }]);
  }
}

const ItemToCart = ({ props, product }) => {
  const { count, setProductCount,
    productQuantity, setProductQuantity,
    setCheckoutInfo, checkoutInfo } = props;

  const filteredQuantity = productQuantity.filter(
    ({ id: pid }) => pid !== product.id || pid === undefined,
  );
  // Add item to shopping cart
  addItem(product, { setProductCount, count }, true);

  // Search for a product then add it to quantity state.
  const p = productQuantity.find(
    ({ id }) => id === product.id,
  );

  if (((p === undefined) ? 0 : p.quantity) < product.available_quantity) {
    setProductQuantity([
      ...filteredQuantity,
      {
        id: product.id,
        quantity: (p === undefined) ? 1 : p.quantity + 1,
      }]);
    // Setting total price for products
    setCheckoutInfo({
      totalPrice: checkoutInfo.totalPrice + product.price });
  }
};

export default ItemToCart;
