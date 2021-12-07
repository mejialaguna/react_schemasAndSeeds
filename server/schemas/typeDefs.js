const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    productCount: Int
    savedProducts: [Product]
  }

  type Product {
    _id: ID!
    name: String
    description: String
    price: Float
    rating: Float
    images: [Images]
    category: String
    stock: Int
    reviews: [Review]
    reviewCount: Int
  }

  type ContactUs {
    _id: ID
    contactBody: String
    userId: String
    email: String
    createdAt: String
  }

  type Images {
    _id: ID
    url: String
  }

  type Review {
    _id: ID
    reviewBody: String!
    userId: String!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  input product {
    _id: ID!
    name: String
    description: String
    price: Int
    rating: Int
    images: [String]
    category: String
    stock: Int
    reviewCount: Int
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    products: [Product]
    product(_id: ID!): Product
    getAllReviews: [Product]
    getContactFormMessages: [ContactUs]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addProduct(
      name: String!
      description: String!
      price: Int!
      rating: Int
      images: [String]
      category: String!
      stock: Int!
    ): Product
    removeProduct(productId: ID!): Product
    addReview(userId: ID!, productId: ID!, reviewBody: String!): Product
    saveCustomerProducts(savedProduct: ID!): User
    contactForm(email: String!, contactBody: String!): ContactUs
  }
`;

module.exports = typeDefs;
