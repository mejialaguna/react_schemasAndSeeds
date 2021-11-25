import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const CONTACT_FORM = gql`
  mutation contactForm($email: String!, $contactBody: String!) {
    contactForm(email: $email, contactBody: $contactBody) {
      _id
      email
      contactBody
      createdAt
    }
  }
`;

export const SAVE_PRODUCT = gql`
  mutation saveProduct($input: productInput!) {
    saveProduct(input: $input) {
      _id
      username
      email
      savedProducts {
        _id
        name
        description
        price
        rating
        images
        category
        stock
        reviews
        reviewCount
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($productId: String!) {
    removeProduct(productId: $productId) {
      _id
      username
      email
      productCount
      savedProducts {
        _id
        name
        description
        price
        rating
        images
        category
        stock
        reviews
        reviewCount
      }
    }
  }
`;

export default { LOGIN_USER, ADD_USER, CONTACT_FORM };
