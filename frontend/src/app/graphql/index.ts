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

// payments
export const SavePaymentReport = gql` mutation CreatePayment($input: PaymentInput!) {
  createPayment(input: $input) {
    success
  }
}`

export const AllPaymentReport = gql` query Payments($filters: Filters){
    payments(filters: $filters){
    id
    total
    createdAt
    items {
      amount
      price
      productID
      productName
    }
  }
}`

export const FindPayment = gql` query FindPayment($findPaymentId: ID!) {
  findPayment(id: $findPaymentId) {
    id
    items {
      amount
      price
      productID
      productName
    }
    createdAt
    total
  }
}`

// users
export const Admins = gql` query {
    adminsOnly {
    fullName
    id
  }
}`

export const AllClients = gql` query {
  users {
  email
  role
  adminBy
  fullName
  id
  access
  lastLogged
  createdAt
}
}`

export const GetMe = gql` query {
  me{
  email
  role
  adminBy
  fullName
  id
  access
  lastLogged
  createdAt
}
}`;

export const RegisterUser = gql` mutation Register($input: UserInput) {
  register(input: $input) {
    id
    fullName
    access
    role
  }
}`

export const ChangePasswordMutation = gql` mutation ChangePassword($input: ChangePasswordInput!) {
  changePassword(input: $input) {
    success
  }
}`
