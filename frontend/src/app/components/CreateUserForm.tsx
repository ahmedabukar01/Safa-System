import * as React from 'react'
import { Button, Col, Form, Input, Row, Select } from 'antd'
import { GET_USERS } from './utils/auth'

const ROLES = [
  {
    label: "USER",
    value: "USER"
  },
  {
    label: "ADMIN",
    value: "ADMIN"
  },
  {
    label: "SUPER_ADMIN",
    value: "SUPER_ADMIN"
  }
]

export default function CreateUserForm({onSubmit}: any) {
  const [roleBased, setRoleBased] = React.useState(false)

  const admins = GET_USERS();
  console.log(admins, 'users')
    
    const onFinish = (values: any) => {

    }

    const onChange = (e) => {
      if(e === 'USER'){
        setRoleBased(true)
      } else {
        setRoleBased(false)
      }
    }

  return (
    <>
   <Form
    name="Register form"
    onFinish={onFinish}
    style={{ maxWidth: 600, maxHeight: 900, display: 'flex', margin: 'auto', flexDirection: "column", justifyContent: "center", alignContent: "center" }}
  >
    <Row >
      <Col span={24}>
        <Form.Item
        label="Name"
        name="fullName"
        rules={[{ required: true, message: 'Please input Name!' }]}
        >
        <Input />
      </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input Email!' }]}
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
        rules={[{ required: true, message: 'Please input Password' }]}
        >
        <Input.Password/>
      </Form.Item>
      </Col>
    </Row>

    <Row>
      <Col span={24}>
        <Form.Item
        label="Role"
        name="role"
        rules={[{ required: true, message: 'Please input Role!' }]}
        >
        <Select options={ROLES} onChange={onChange}/>
      </Form.Item>
      </Col>
    </Row>
    {
      roleBased && (
        <Row>
        <Col span={24}>
          <Form.Item
          label="Admin By"
          name="adminBy"
          rules={[{ required: true, message: 'Who admins this!' }]}
          >
          <Select options={admins} placeholder="Select Who Admin's"/>
        </Form.Item>
        </Col>
      </Row>
      )
    }
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Register User
      </Button>
    </Form.Item>

  </Form>
    </>
  )
}
