import { Button, Col, Form, Input, Row, Select } from 'antd'
import React from 'react'

export default function CreateUserForm({onSubmit}: any) {
    
    const onFinish = (values: any) => {

    }

  return (
    <>
   <Form
    name="create Product form"
    onFinish={onFinish}
    style={{ maxWidth: 600, maxHeight: 900, display: 'flex', margin: 'auto', flexDirection: "column", justifyContent: "center", alignContent: "center" }}
  >
    <Row >
      <Col span={24}>
        <Form.Item
        label="Product Name"
        name="productName"
        rules={[{ required: true, message: 'Please input your Name!' }]}
        >
        <Input />
      </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Form.Item
        label="Product ID"
        name="productID"
        rules={[{ required: true, message: 'Please input your product ID!' }]}
        >
        <Input />
      </Form.Item>
      </Col>
    </Row>

    <Row>
      <Col span={24}>
        <Form.Item
        label="Category"
        name="categoryId"
        rules={[{ required: true, message: 'Please input your Description!' }]}
        >
        <Select options={categories}/>
      </Form.Item>
      </Col>
    </Row>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Create Product
      </Button>
    </Form.Item>

  </Form>
    </>
  )
}
