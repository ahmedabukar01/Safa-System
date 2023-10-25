'use client'
import { useEffect, useState } from 'react'
import { useAppContext } from '../lib/AppContext'

export default function Login() {
    const {state, setState}: any = useAppContext()
    const [my, setMY] = useState({
        ali: 'aww',
        ma: "haa"
    })

    useEffect(() => {
        setState({...state, name: "ahmed"});
    }, [])
    
    console.log(state)


  return (
    <div>page</div>
  )
}
