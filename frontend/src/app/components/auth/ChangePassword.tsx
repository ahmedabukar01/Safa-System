import React, { useState } from 'react';
import { Button, Checkbox, Col, Form, Input, Row, Modal , Typography} from 'antd';
import { useMutation } from '@apollo/client';
import { ChangePasswordMutation, Logout } from '@/app/graphql';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setUserRole } from '@/app/globalRedux/features/userSlice';

const ChangePassword: React.FC = () => {
  const [changePassword] = useMutation(ChangePasswordMutation)
  const [logout, {data}] =  useMutation(Logout)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()
  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    const res = await changePassword({variables: {input: {...values}}});
    if(res.errors){
      console.error("Error: ", res.errors);
    }

    const logingOut = await logout();
    if(logingOut.errors){
      console.error("Error: ", logingOut.errors)
    }

    dispatch(setUserRole(""))
    router.push("/")
  }

  return (
    <>
      <Button type="text" onClick={showModal}
       style={{
        paddingLeft: "0px",
      }}
      >
        Change Password
      </Button>
      <Modal title="Change Password" open={isModalOpen}
      footer={null}
      style={{minWidth: "60vw", textAlign:"center"}}
      >
        <p>Please be careful with your credentials...</p> <br />
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
                label="Current Password"
                name="currentPassword"
                rules={[{ required: true, message: 'Current Password is required!' }]}
                >
                <Input.Password />
              </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                label="New Password"
                name="newPassword"
                rules={[{ required: true, message: 'Please input your password!' }]}
                >
                <Input.Password />
              </Form.Item>
              </Col>
            </Row>

            <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
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

export default ChangePassword;