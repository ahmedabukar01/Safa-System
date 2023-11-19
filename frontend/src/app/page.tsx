"use client"
import Link from 'next/link'
import { useAppContext } from './lib/AppContext';
import { useRouter } from 'next/navigation';
import LayoutTheme from './components/layouts/HomeLayout';
import PaymentBox from './components/payments/PaymentBox';

export default function Home() {

  // const {authToken}: any = useAppContext();

  // console.log('authToken in home page', authToken);

  return (
    <LayoutTheme>
    <h1>Welcome to Safa SuperMarket System </h1>
    <Link href={'/login'}>Login</Link>
    <Link href={'/test'}>test</Link>

    <PaymentBox />
    </LayoutTheme>
  )
}

// Home.getLayout = LayoutTheme;
