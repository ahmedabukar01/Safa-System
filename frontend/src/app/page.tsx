"use client"
import Link from 'next/link'
import { useAppContext } from './lib/AppContext';

export default function Home() {
  const {authToken}: any = useAppContext();

  console.log('authToken in home page', authToken);

  return (
    <>
    <h1>Welcome to Safa SuperMarket System </h1>
    <Link href={'/login'}>Login</Link>
    <Link href={'/test'}>test</Link>
    </>
  )
}
