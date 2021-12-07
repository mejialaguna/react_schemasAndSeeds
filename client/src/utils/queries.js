import { gql } from "@apollo/client";
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

 const QUERY_PRODUCTS = gql`
  query getAllProducts {
  getAllProducts{
    _id
    name
    description
    price
    images{
      url
    }
  }
}
`;

export default { QUERY_PRODUCTS };

