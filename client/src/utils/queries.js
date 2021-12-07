import { gql } from "@apollo/client";
// import gql from "graphql-tag";


// // export const GET_USER = gql`
// //   {
// //     me {
// //       _id
// //       username
// //       email
// //       productCount
// //     }
// //   }
// // `;

 export const QUERY_PRODUCTS = gql`
  query getAllProducts {
  products{
    _id
    name
    description
    price
    rating
    images{
      url
    }
    category
    stock
  }
}
`;


