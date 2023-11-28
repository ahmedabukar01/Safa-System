"use client"
import { project } from '@/app/utils/config';
import { Breadcrumb, Layout, Menu, Space, theme } from 'antd';

const { Header, Content, Footer } = Layout;

const tabs = [
    {
        key: 1,
        label: `Create New User`
    },
    {
        key: 2,
        label: `View Users`
    },
    {
        key: 3,
        label: `Mangement Board`
    }
]

const ManagementLayout: any = ({children}: any) => {

  return (
    <Layout className="layout">
      <Header style={{ display: 'flex', alignItems: 'center', justifyContent: "center"}}>
        <div className="demo-logo" style={{background: "red"}}/>
        <div style={{width: "100%"}}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={tabs.map((item) => item)}
          style={{display: "flex", justifyContent: "center"}}
        />
        </div>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content" > 
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default ManagementLayout;