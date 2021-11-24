const mongoose = require("mongoose");
const Product = require("../models/Product");
const axios = require("axios")

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/global_trade",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  function (err) {
    if (err) throw err;

    console.log("Successfully connected");
  }
);


const products = () => {
  return axios.get("https://fakestoreapi.com/products")
      .then(({data} ) => {
        // console.log(data , "=================================")
      const dataProduct = data.map((item) => {
        return {
          name: item.title,
          description: item.description ? item.name : "miscellaneous",
          price: item.price ? item.price : 20,
          rating: item.rating.rate,
          category: item.category,
          stock: item.rating.count,
          images: [{ url: item.image }],
        };
      })
      Product.deleteMany({}).then(() => {
          Product.insertMany(dataProduct).then((data) => {
              console.log(data + "products inserted")
          })
      })
        // return dataProduct;
    });
};

products()
