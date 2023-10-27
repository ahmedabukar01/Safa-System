'use client'
import * as React from 'react'
import { useAppContext } from '../lib/AppContext'
import LoginForm from '../components/login/LoginForm'

export default function Login() {
    const {state, setState}: any = useAppContext()

    const onSubmit = (values: any) => {

    }

  return (
    <LoginForm onSubmit={onSubmit}/>
  )
}
