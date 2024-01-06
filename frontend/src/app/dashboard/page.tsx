"use client"
import React from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { PaymentDash, dashboardCount } from '../graphql';
import { DonutChart } from '../statitics/donutChart';

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




  console.log(' sleort', dash)
  const seriesV = Object.values(dash);
  const seriesN = Object.keys(dash);
  return (
    <>
    <div>Dashboard Comming soon</div>
    <DonutChart labelNames={seriesN} seriesValues={seriesV}/>
    </>
  )
}
