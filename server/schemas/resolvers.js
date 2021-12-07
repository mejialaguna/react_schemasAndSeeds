const { User, Product, Image, Review, ContactUs } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return await User.find().select("-__v -password");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return await User.findOne({ username }).select("-__v -password");
    },

    products: async () => {
      return await Product.find().populate("reviews" + "images")
    },
    product: async (parent, { _id }) => {
      return await Product.findOne({ _id }).populate("reviews");
    },
    getAllReviews: async () => {
      return await Product.find();
    },
    getContactFormMessages: async () => {
      return await ContactUs.find();
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      console.log(user);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      console.log(email, " ", password);
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect UserName");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect Password");
      }

      const token = signToken(user);
      return { token, user };
    },
    addProduct: async (parent, args) => {
      console.log(args);
      const newImages = args.images.map((item) => ({ url: item }));
      const newProduct = await Product.create({ ...args, images: newImages });
      console.log(newProduct);
      return newProduct;
    },
    saveCustomerProducts: async (parent, args, context) => {
      if (context.user) {
        //not working saved products
        const costumerProduct = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedProducts: args.savedProduct } },
          { new: true, runValidation: true }
        ).populate("savedProducts");
        return costumerProduct;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    contactForm: async (parent, { email, contactBody }, context) => {
      // console.log(args); // not properly working
      // if (context.user) {
      //   const newForm = await User.findByIdAndUpdate(
      //     userId, // find id first
      //     {
      //       $push: {
      //         contactUs: { email, contactBody, userId: context.user._id },
      //       },
      //     }, // pushig it to contactUS in the model
      //     { new: true, runValidators: true }
      //   );
      //   return newForm;
      // }
      // throw new AuthenticationError("You need to be logged in!");
      if (context.user) {
        const newForm = await ContactUs.create({
          email,
          contactBody,
          userId: context.user._id,
        });
        return newForm;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeProduct: async (parent, { productId }) => {
      console.log(productId);
      if (!productId) {
        return { message: "not id found" };
      } else {
        const removedProduct = await Product.findOneAndDelete(productId);
        return removedProduct;
      }
    },
    addReview: async (parent, { reviewBody, userId, productId }, context) => {
      //review not working
      // console.log(args);
      if (context.user) {
        const newReview = await Product.findByIdAndUpdate(
          productId, // looking for id
          { $push: { reviews: { reviewBody, userId } } }, //pushing this to the array
          { new: true, runValidators: true }
        );
        console.log(newReview);
        return newReview;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
