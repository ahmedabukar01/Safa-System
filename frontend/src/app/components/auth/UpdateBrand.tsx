import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Modal , Typography} from 'antd';
import { useMutation } from '@apollo/client';
import { ChangePasswordMutation, Logout, UpdateBrandName } from '@/app/graphql';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setUserRole } from '@/app/globalRedux/features/userSlice';

const UpdateBrandComponent: React.FC = () => {
  const [updateBrandName] = useMutation(UpdateBrandName)
  const [logout, {data}] =  useMutation(Logout)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    const res = await updateBrandName({variables: {input: {...values}}});
    if(res.errors){
      console.error("Error: ", res.errors);
    }


    localStorage.setItem("brandName", JSON.stringify(values.brandName));
    setIsModalOpen(false)
  }

  return (
    <>
      <Button type="primary" onClick={showModal}
       style={{
        alignContent: "center"
      }}
      >
        Update Brand Name
      </Button>
      <Modal title="Change Password" open={isModalOpen}
      footer={null}
      style={{minWidth: "60vw", textAlign:"center"}}
      >
        <p>Brand Name will be printed on the Receipt paper ...</p> <br />
        <div>
        <Form
            name="login form"
            // initialValues={{ remember: true }}
            onFinish={onFinish}
            style={{ maxWidth: 600, maxHeight: 900, display: 'flex', margin: 'auto', flexDirection: "column", justifyContent: "center", alignContent: "center" }}
          >
            <Row>
              <Col span={24}>
                <Form.Item
                label="Brand Name"
                name="brandName"
                rules={[{ required: true, message: 'Current Password is required!' }]}
                >
                <Input />
              </Form.Item>
              </Col>
            </Row>

            <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
            <Button type="default" onClick={handleCancel} style={{marginRight: '2em'}}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>

          </Form>
        </div>
      </Modal>
    </>
  );
};

export default UpdateBrandComponent;