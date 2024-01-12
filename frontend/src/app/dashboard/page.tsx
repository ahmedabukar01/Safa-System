"use client"
import React, { Suspense } from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
import { PaymentDash, dashboardCount } from '../graphql';
import { DonutChart } from '../statitics/donutChart';
import { Card, Col, Row, Statistic, Typography } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
const {Title} = Typography

export default function Dashboard() {
  const {data} = useSuspenseQuery(dashboardCount);
  const {data: report} = useSuspenseQuery(PaymentDash);

  const payments = report?.paymentsReport;

  const dash:any = [];

  // payments.forEach(items => {
  //   console.log("items",typeof items)
  //   // items?.forEach(item => {
  //   //   dash[item.productName] = (dash[item.productName] || 0) + item.amount
  //   // })
  // })

  // structure all product name with value(amount of sold)
   payments?.forEach((items:any) => {
      items.items.forEach((item:any) => {
      dash[item.productName] = (dash[item.productName] || 0) + item.amount
    })
    })

    const newObj = {...dash}

    const objSort = Object.entries(newObj).sort((a,b) => a[1] - b[1]);
    const keyPairs = objSort.map(([key]) => key);
    const keyValues = objSort.map(([, value]) => value)

    const seriesV = keyValues.slice(keyValues.length - 10);
    const seriesN = keyPairs.slice(keyPairs.length - 10);

  // const seriesV = Object.values(dash);
  // const seriesN = Object.keys(dash);
  // const testN = ["ahmed", "nor", "haa", "no"];
  // const testV = [2,43,54,5]

  const {numOfCategoreis, numOfPayments, numOfProducts, numOfUsers} = data?.dashCount
  
  return (
    <div 
    style={{
      display: "flex", 
      justifyContent: "space-between", 
      alignContent: "center", 
      height: "50vh"
      }}>
    <div style={{width: '46%', marginTop: 50}}>
      <Row gutter={16}>
      <Col span={12} style={{marginBottom: 30}}>
        <Card bordered={false}
        style={{
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.04)",
          height: 150,
          background: "#d0cdff",
        }}
        >
          <Statistic
            title="Users"
            value={numOfUsers}
            // precision={2}
            // valueStyle={{ color: '#3f8600' }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
     </Col>
    <Col span={12}>
      <Card bordered={false} 
       style={{
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.04)",
          height: 150,
          background: "#c0fdcf",
        }}
      >
        <Statistic
          title="Categories"
          value={numOfCategoreis}
          // valueStyle={{ color: '#cf1322' }}
          // prefix={<ArrowDownOutlined />}
        />
      </Card>
    </Col>
  </Row>
  <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}
         style={{
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.04)",
          height: 150,
          background: "#c0fdcf",
        }}
        >
          <Statistic
            title="Products"
            value={numOfProducts}
            // valueStyle={{ color: '#3f8600' }}
            // prefix={<ArrowUpOutlined />}
            // suffix="%"
          />
        </Card>
     </Col>
    <Col span={12}>
      <Card bordered={true}
       style={{
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.04)",
          height: 150,
          background: "#f0ffcf",
        }}
      >
        <Statistic
          title="Total Payments"
          value={numOfPayments}
          // valueStyle={{ color: '#cf1322' }}
          // prefix={<ArrowDownOutlined />}
        />
      </Card>
    </Col>
  </Row>
    </div>
    
    <div style={{width: '50%'}}>
    <Title level={4} style={{textAlign: "center"}}>Top 10 Most Sold Items</Title>
      { report && <DonutChart seriesValues={seriesV} labelNames={seriesN} type="donut" /> }
    </div>
    
    </div>
  )
}




// {seriesV.length > 0 ? (
//   <DonutChart labelNames={seriesN} seriesValues={seriesV} type="donut" />
// ) : (<p style={{textAlign: "center", marginTop: 100}}>Not enough data to display graphs.... </p>) }