const productsCategories = (query) => {
  return fetch(`https://fakestoreapi.com/products/category/${query}`);
};

export default productsCategories; 