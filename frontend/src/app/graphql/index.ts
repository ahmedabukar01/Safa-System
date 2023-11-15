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

// export const Products = gql` query{
//     products {
//         id
//         price
//         productName
//     }
//     }
//     `

export const Logout = gql` mutation{
    logout {
    success
  }
}`

// categories
export const Categories = gql` query{
  categories {
    id
    description
    createdAt
    name
    products {
      productName
    }
  }
  }
  `
  // we're using this for perfomance,just to eliminate properties we don't need.
  export const GetCategory = gql` query{
    categories {
      id 
      name
    }
    }
    `
export const NewCategory = gql` mutation CreateCategory($input: CategoryInput!) {
  createCategory(input: $input) {
    id
  }
}`

// products

export const Products = gql` query{
    products {
    id
    price
    productID
    productName
    createdAt
    category {
      name
    }
  }
}`

export const NewProduct = gql` mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    id
  }
}`

export const SearchProduct = gql` query Product($productId: ID!) {
  product(id: $productId) {
    productID
    price
    id
    productName
  }
}`;
