"use client"
import * as React from 'react'
import ReportDetails from '@/app/components/payments/ReportDetails';
import Loading from '@/app/loading';
import { FindPayment } from '@/app/graphql';
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { Space, Typography } from 'antd';
import { center } from '@/app/css/styles';

const {Title } = Typography

export default function SinglePayment({params}: {params: {id: string}}) {
    const {id} = params;
    const {data,error} = useSuspenseQuery(FindPayment, {variables: {findPaymentId: id}});
    
  return (
    <div style={center}>
    <Space>
      <Title level={3}>Payment Details</Title>
    </Space>
      <React.Suspense fallback={<Loading />}>
       <ReportDetails data={data?.findPayment}/>
      </React.Suspense>
    </div>
  )
}
