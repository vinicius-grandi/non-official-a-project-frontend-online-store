export async function getCategories() {
  return fetch(
    'https://api.mercadolibre.com/sites/MLB/categories',
  ).then((res) => res.json());
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  return fetch(
    `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`,
  ).then((res) => res.json());
}

export async function getProductByID(productId) {
  return fetch(
    `https://api.mercadolibre.com/items/${productId}`,
  ).then((res) => res.json());
}
