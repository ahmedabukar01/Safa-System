import { gql } from "@apollo/client";

export const SignIn = gql` mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      access
      fullName
      id
      role
      token
    }
  }
    `

export const Products = gql` query{
    products {
        id
        price
        productName
    }
    }
    `