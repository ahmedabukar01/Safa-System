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
    <PaymentBox />
    </LayoutTheme>
  )
}

// Home.getLayout = LayoutTheme;
