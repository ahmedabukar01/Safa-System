
import { Button, Col, Form, Input, Row , Typography} from 'antd'
const {Title} = Typography
export default function CreateCategoryForm({onSubmit}: any) {
    const onFinish = (values: any) => {
        onSubmit(values)
    }
    const onFinishFailed = (error: any) => {
        console.log("failed: ", error);
    }

  return (
    <>
    <div>
        <Title level={3} style={{textAlign:"center"}}>Create Category</Title>
    </div>
     <Form
    name="create Category form"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    style={{ maxWidth: 600, maxHeight: 900, display: 'flex', margin: 'auto', flexDirection: "column", justifyContent: "center", alignContent: "center" }}
  >
    <Row >
      <Col span={24}>
        <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your Name!' }]}
        >
        <Input />
      </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input your Description!' }]}
        >
        <Input />
      </Form.Item>
      </Col>
    </Row>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Create Category
      </Button>
    </Form.Item>

  </Form>
    </>
  )
}
