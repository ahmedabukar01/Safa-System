'use client'
import * as React from 'react'
import { useAppContext } from '../lib/AppContext'
import LoginForm from '../components/auth/LoginForm'
import { gql, useMutation} from '@apollo/client'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { SignIn } from '../graphql'
import { useCookies } from 'next-client-cookies'
import { useDispatch } from 'react-redux'
import { setUserRole } from '../globalRedux/features/userSlice'
import { GreenLight, RedLight } from '../components/utils/alerts'

export default function Login() {
  const router = useRouter();
  const cookie = useCookies();
  const dispatch = useDispatch()
  
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
        RedLight("Error", `invalid Credentials`)
      } else{
        const {access, fullName, role} = res.data?.signIn;
        localStorage.setItem("userInfo", JSON.stringify({fullName, role}))
        dispatch(setUserRole(role));
        GreenLight("Success", "Logged in Successfully")
        router.push("/dashboard");
      }

    }

  return (
    <>
    <div className='background'> 
    <LoginForm onSubmit={OnSubmit}/>
    </div>
    </>
  )
}
