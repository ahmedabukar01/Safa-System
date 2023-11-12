"use client"
import Link from 'next/link'
import { useAppContext } from './lib/AppContext';
import { useRouter } from 'next/navigation';
import LayoutTheme from './components/layouts/HomeLayout';

export default function Home() {

  // const {authToken}: any = useAppContext();

  // console.log('authToken in home page', authToken);

  return (
    <LayoutTheme>
    <h1>Welcome to Safa SuperMarket System </h1>
    <Link href={'/login'}>Login</Link>
    <Link href={'/test'}>test</Link>
    </LayoutTheme>
  )
}

// Home.getLayout = LayoutTheme;
