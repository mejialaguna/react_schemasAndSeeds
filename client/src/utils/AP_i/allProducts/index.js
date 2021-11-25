const getProducts = (query) => {
  return fetch(`https://fakestoreapi.com/${query}`);
};



export default getProducts 