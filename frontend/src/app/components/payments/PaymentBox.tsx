import { Button, Col, Form, Input, Row } from 'antd'
import React from 'react'

export default function PaymentBox() {
  return (
    <>
    <div>PaymentBox</div>
    <Form>
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
