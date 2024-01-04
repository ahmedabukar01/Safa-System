"use client"
import React from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { PaymentDash, dashboardCount } from '../graphql';

export default function Dashboard() {
  const {data} = useSuspenseQuery(dashboardCount);
  const {data: report} = useSuspenseQuery(PaymentDash);

  const payments = report?.paymentsReport;

  const dash = [];

  // payments.forEach(items => {
  //   console.log("items",typeof items)
  //   // items?.forEach(item => {
  //   //   dash[item.productName] = (dash[item.productName] || 0) + item.amount
  //   // })
  // })

   payments?.forEach(items => {
      items.items.forEach((item) => {
      dash[item.productName] = (dash[item.productName] || 0) + item.amount
    })
    })

  console.log('resut',dash)
  return (
    <div>Dashboard Comming soon</div>
  )
}
