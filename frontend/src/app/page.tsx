import Link from 'next/link'
import { useAppContext } from './lib/AppContext';
import { useRouter } from 'next/navigation';
import LayoutTheme from './components/layouts/HomeLayout';
import PaymentBox from './components/payments/PaymentBox';
import { Suspense } from 'react';
import Loading from './loading';

export default function Home() {

  // const {authToken}: any = useAppContext();

  // console.log('authToken in home page', authToken);

  return (
    <LayoutTheme>
      <Suspense fallback={<Loading />}>
        <PaymentBox />
      </Suspense>
    </LayoutTheme>
  )
}

// Home.getLayout = LayoutTheme;
