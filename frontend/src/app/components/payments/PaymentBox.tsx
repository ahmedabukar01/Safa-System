"use client"
import * as React from 'react'
import { Button, Col, Form, Input, Row, Typography } from 'antd'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { SearchProduct } from '@/app/graphql'
import Cart from './Cart'
import { center } from '@/app/css/styles'

const { Title } = Typography

export default function PaymentBox() {
  const [cart, setCart] = React.useState<any>('')
  const [form] = Form.useForm();
  const {data, refetch} = useSuspenseQuery(SearchProduct, {variables: {productId: ""}});

  const OnFinish = async (values: any) => {
    const value = values.productID;

    const res = await refetch({productId: value});
    if(res.errors) {
      console.error("Error", res.errors)
    }

    console.log("after refetch", res.data)
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
    <Title level={3} style={center}>Checkout Center</Title>
    <Form
    form={form}
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
        <Col span={24} style={center}>
            <Button type='primary' htmlType='submit'>Search</Button>
        </Col>
        </Row>
    </Form>

    <Cart cart={cart} setCart={setCart}/>
    </>

  )
}
