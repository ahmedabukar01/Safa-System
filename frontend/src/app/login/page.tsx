'use client'
import * as React from 'react'
import { useAppContext } from '../lib/AppContext'
import LoginForm from '../components/auth/LoginForm'
import { gql, useMutation} from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SignIn } from '../graphql'

export default function Login() {
  const router = useRouter()
    const {userInfo, setUserInfo}: any = useAppContext()
    const [signIn, {data}] =  useMutation(SignIn)
   

    const OnSubmit = async (values: any) => {

      const res = await signIn({variables: {
        input: values
      }, onError: (e)=> {
        console.log(e)
      }})

      if(res?.errors){
        console.log('errors', res.errors)
      }
      
      const {access, fullName, id, role, token} = res.data?.signIn;
      setUserInfo({id, fullName, role})

      console.log('result', access, role, 'userinfo', userInfo, 'all info', res.data?.signIn)

      router.push("/")
    }

  return (
    <>
    <Link href={'/'}>home</Link>
    <Link href={'/test'}>test</Link>
    <LoginForm onSubmit={OnSubmit}/>
    </>
  )
}
