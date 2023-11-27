import React from 'react';
import { Flex, Spin } from 'antd';

const LoadingPage: React.FC = () => (
  <Flex align="center" gap="middle" justify='center' style={{height: "80vh", margin: "auto"}}>
    <Spin size="large" />
    <Spin size='large'/>
    <Spin size="large" />
  </Flex>
);

export default LoadingPage;