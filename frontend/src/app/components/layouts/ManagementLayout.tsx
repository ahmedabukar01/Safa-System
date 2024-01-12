"use client"
import { project } from '@/app/utils/config';
import { Breadcrumb, Layout, Menu, Space, theme } from 'antd';
import Link from 'next/link';

const { Header, Content, Footer } = Layout;

const tabs = [
    {
        key: 1,
        label: <Link href={"/saasoffice/"}>Create New User</Link>
    },
    {
        key: 2,
        label: <Link href={"/saasoffice/view"}>View Users</Link>
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
          defaultSelectedKeys={['1']}
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