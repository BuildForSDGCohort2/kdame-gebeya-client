import { gql } from '@apollo/client';

export const GET_ALL_SUPPLIERS = gql`
query getAllSuppliers {
    users(role: "SUPPLIER"){
      ... on Users {
      users {
        id
        firstName
        role
        lastName
        email
        phoneNumber
        company {
          websiteUrl
          companyName
          companyEmail
          address{
            country
            city
            postalCode
            
          }
        }
      }
    }
      ... on UsersError {
        message
        type
      }
      ... on Error {
        message
        type
      }
    }
  }
`;
export const GET_USER = gql`
query getOneUser($supplierId: ID!) {
    user(id: $supplierId){
      ... on User {
        firstName
        lastName
        email
        phoneNumber
        role
        createdAt
        isVerified
        company {
          websiteUrl
          companyName
          companyEmail
          products
          address {
            country
            city
            postalCode
          }
        }
        id
      }
      ... on UserDoesNotExist {
        type
        message
      }
      ... on Error {
        type
        message
      }
    }
  }`;
export const GET_POSTED_PRODUCT = gql`
  query getPostedProduct($supplierId: ID!){
    user(id: $supplierId){
      ... on User{
        id
        firstName
        products{
          id 
          productName
          productPrice
        }
      }
      ... on UserDoesNotExist{
        message
      }
    }
  }
  `;
export const GET_REVIEWS = gql`
query ProductReview($productId: ID!){
 ProductReview(productId:"5f76e58c7ebd020017a4f180"){
    ... on Reviews{
      reviews{
        id
        reviewerEmail
        comment
      }
    }
    ... on GetProductError{
      message
      type
    }
  }
}
`;