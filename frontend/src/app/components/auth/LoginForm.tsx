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
    <div style={{
      width: 600,
      height: 900,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      alignContent: "cneter",
      alignItems: "center", 
      margin: "auto",
      // background: "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(33,50,180,0.7147233893557423) 10%, rgba(36,31,207,0.8860731792717087) 22%, rgba(0,212,255,1) 100%)"
      // background: "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(90,103,201,0.9533000700280112) 10%, rgba(36,31,207,0.8860731792717087) 74%, rgba(0,212,255,1) 100%)"
    }}>
        <div style={{margin: '4em auto', textAlign: "center", }} >
        <Title level={1} style={{color: "#fff"}}>Welcome To Safa Online System</Title>
        </div>
    <Form
    name="login form"
    // initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    // style={{ maxWidth: 600, maxHeight: 900, display: 'flex', margin: 'auto', flexDirection: "column", justifyContent: "center", alignContent: "center" }}
  >
    <Row>
      <Col span={24}>
        <Form.Item
        label={<span style={{color: "white", fontSize: "16px"}}>Email &nbsp; &nbsp;</span>}
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        style={{fontSize: "30px"}}
        >
        <Input style={{padding: "6px 10px"}}/>
      </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Form.Item
        label={<span style={{color: "white", fontSize: "16px"}}>Password</span>}
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        >
        <Input.Password style={{padding: "6px 10px"}}/>
      </Form.Item>
      </Col>
    </Row>

    {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" size='middle'>
        Submit
      </Button>
    </Form.Item>

  </Form>
    </div>
  )
}
