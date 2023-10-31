import * as React from 'react'
import { Button, Checkbox, Col, Form, Input, Row, Space , Typography} from 'antd';

const { Title } = Typography

export default function LoginForm({onSubmit}: {onSubmit: any}) {
    const onFinish = (values: any) => {
        onSubmit(values)
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

  return (
    <div>
        <div style={{margin: '4em auto', textAlign: "center"}} >
        <Title level={1}>Welcome To Safa Online System</Title>
        </div>
    <Form
    name="login form"
    // initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    style={{ maxWidth: 600, maxHeight: 900, display: 'flex', margin: 'auto', flexDirection: "column", justifyContent: "center", alignContent: "center" }}
  >
    <Row >
      <Col span={24}>
        <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        >
        <Input />
      </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input.Password />
      </Form.Item>
      </Col>
    </Row>

    {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>

  </Form>
    </div>
  )
}
