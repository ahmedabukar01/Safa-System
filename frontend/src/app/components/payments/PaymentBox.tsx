"use client"
import * as React from 'react'
import { Suspense } from 'react'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import dynamic from 'next/dynamic'
import { SearchProduct } from '@/app/graphql'
// import Cart from './Cart' 
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { center } from '@/app/css/styles'
import { RedLight, WarningAlert } from '../utils/alerts'
import Loading from '../layouts/Loading'
const Cart = React.lazy(() => import('./Cart'))

// const Cart = dynamic(() => import('./Cart'), {
//   ssr: false,
// })

const { Title } = Typography

export default function PaymentBox() {
  const [cart, setCart] = React.useState<any>([])
  const [form] = Form.useForm();
  const {data, refetch} = useSuspenseQuery(SearchProduct, {variables: {productId: ""}, fetchPolicy: "no-cache"});

  const OnFinish = async (values: any) => {
    const value = values.productID;
    form.resetFields();

    const res = await refetch({productId: value});
    // await new Promise((resolve) => setTimeout(resolve, 4000))
    
    if(!res.data.product) {
      RedLight("Not Found", "No Product Founded")
      // alert("Warning, Product already in the cart");
      return 
    }

    // const existed = cart?.find(item => res.data.product.productID === item.productID)
    // if(existed){
    //   WarningAlert("Warning", "Product Already in the Cart");
    //   return;
    // }

    // console.log("after refetch", res.data)
    form.resetFields();
  };

  React.useEffect(() => {
    const product = {
      productName: data?.product?.productName,
      productID: data?.product?.productID,
      price: data?.product?.price,
      amount: 1
    }

    const existedItem = cart && cart.find(item => item.productID === product?.productID);
    if(existedItem) {
      console.log("here")
      // alert("Warning, Product already in the cart");
      WarningAlert("Warning", "Product Already in the Cart");
      return 
    }

    if(product?.price !== undefined){
      console.log('yes')
      setCart((prev) => [...prev, product])
    } 
      
  }, [data?.product]);


  return (
    <div>
    <Title level={3} style={center}>Checkout Center</Title>
    <Form
    form={form}
    onFinish={OnFinish}
    style={{marginBottom: "10px", width: '60vw', margin: 'auto'}}
    >
        <Row >
        <Col span={24}>
            <Form.Item
            label="ProductID"
            name="productID"
            rules={[{ required: true, message: 'Please input Product ID!' }]}
            >
            <Input autoFocus placeholder='Search By Product ID'/>
        </Form.Item>
        </Col>
        </Row>
        <Row >
        <Col span={24} style={center}>
            <Button type='primary' htmlType='submit'>Search</Button>
        </Col>
        </Row>
    </Form>
    <Suspense fallback={<Loading />}>
      <Cart cart={cart} setCart={setCart}/>
    </Suspense>
    </div>

  )
}
