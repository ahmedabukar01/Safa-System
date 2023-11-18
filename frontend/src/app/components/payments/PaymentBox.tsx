"use client"
import * as React from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { SearchProduct } from '@/app/graphql'
import Cart from './Cart'
import Error from 'next/error'

export default function PaymentBox() {
  const [cart, setCart] = React.useState<any>('')
  const {data, refetch} = useSuspenseQuery(SearchProduct, {variables: {productId: ""}});

  const OnFinish = async (values: any) => {
    const value = values.productID;

    const res = await refetch({productId: value});
    if(res.errors) {
      console.error("Error", res.errors)
    }

    console.log("after refetch", res.data)
  };

  React.useEffect(() => {
    const product = {
      id: data?.product?.id,
      productName: data?.product?.productName,
      productID: data?.product?.productID,
      price: data?.product?.price,
      amount: 1
    }

    const existedItem = cart && cart.find(item => item.id === product?.id);
    if(existedItem) {
      console.log("item already in the cart")
      return 
    }

    if(product?.price !== undefined){
      console.log('yes')
      setCart((prev) => [...prev, product])
    }
  }, [data?.product]);


  return (
    <>
    <div>PaymentBox</div>
    <Form
    onFinish={OnFinish}
    style={{marginBottom: "10px"}}
    >
        <Row >
        <Col span={24}>
            <Form.Item
            label="ProductID"
            name="productID"
            rules={[{ required: true, message: 'Please input Product ID!' }]}
            >
            <Input autoFocus placeholder='Search By Product ID' />
        </Form.Item>
        </Col>
        </Row>
        <Row >
        <Col span={24}>
            <Button type='primary' htmlType='submit'>Search</Button>
        </Col>
        </Row>
    </Form>

    <Cart cart={cart} setCart={setCart}/>
    </>

  )
}
