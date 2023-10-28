'use client'
import * as React from 'react'
import { useAppContext } from '../lib/AppContext'
import LoginForm from '../components/login/LoginForm'
import { gql, useMutation} from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'

const SignIn = gql` mutation SignIn($input: SignInInput!) {
  signIn(input: $input) {
    access
    fullName
    id
    role
    token
  }
}
  `

export default function Login() {
    const {state, setState}: any = useAppContext()
    const [signIn, {data}] =  useMutation(SignIn)
   

    const OnSubmit = (values: any) => {
      console.log('values', values)

      signIn({variables: {
        input: values
      }, onError: (e)=> {
        console.log(e)
      }})

      console.log(data, 'data')
    }

  return (
    <LoginForm onSubmit={OnSubmit}/>
  )
}
