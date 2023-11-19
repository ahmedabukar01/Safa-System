
import { useSuspenseQuery } from '@apollo/client'
import { Button, Col, Form, Input, InputNumber, Row , Select, Typography} from 'antd'
import { Categories } from '../graphql'
import { GetCategories } from './utils/GetCategories'
const {Title} = Typography

export default function ProductsForm({onSubmit}: any) {
      
    const onFinish = (values: any) => {
        onSubmit(values)
    }
    const onFinishFailed = (error: any) => {
        console.log("failed: ", error);
    }

    const categories = GetCategories();

  return (
    <>
    <div>
        <Title level={3} style={{textAlign:"center"}}>Create New Product</Title>
    </div>
     <Form
    name="create Product form"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
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
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input your Price!' }]}
        >
        <InputNumber min={0} />
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
