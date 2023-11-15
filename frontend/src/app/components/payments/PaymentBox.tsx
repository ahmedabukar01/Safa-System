"use client"
import * as React from 'react'
import { Button, Col, Form, Input, Row } from 'antd'
import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr'
import { SearchProduct } from '@/app/graphql'

export default function PaymentBox() {
  const {data, refetch} = useSuspenseQuery(SearchProduct, {variables: {productId: ""}});

  const OnFinish = async (values: any) => {
    const value = values.productID;
    console.log('value', value);

    const res = await refetch({productId: value});
    if(res.errors) {
      console.error("Error", res.errors)
    }

    console.log("after refetch", res.data)
  };

  return (
    <>
    <div>PaymentBox</div>
    <Form
    onFinish={OnFinish}
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
    </>

  )
}
