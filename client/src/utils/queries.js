import { gql } from "@apollo/client";

export const QUERY_CATEGORY = gql`
  query getCategory($category: String!) {
    category(category: $category) {
      name
      description
      price
      rating
      images {
        url
      }
      stock
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getAllProducts {
    products {
      _id
      name
      description
      price
      rating
      images {
        url
      }
      category
      stock
    }
  }
`;

