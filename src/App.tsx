import React from 'react';
import './index.css';
import {
  HomeOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { Route, Routes, useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items: MenuProps['items'] = [
  {key: "/", icon: React.createElement(HomeOutlined), label: "HOME"},
  {key: "/players", icon: React.createElement(UserOutlined), label: "プレイヤー検索"},
  {key: "/guilds", icon: React.createElement(TeamOutlined), label: "軍団検索"},
]

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        <Menu
          onClick={({key})=>{
            navigate(key);
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/']}
          items={items}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        {/* <Header style={{ padding: 0, background: colorBgContainer }}></Header> */}
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <div style={{ padding: 24, textAlign: 'center', background: colorBgContainer }}>
          <p>long content</p>
          {
            // indicates very long content
            Array.from({ length: 100 }, (_, index) => (
              <React.Fragment key={index}>
                {index % 20 === 0 && index ? 'more' : '...'}
                <br />
              </React.Fragment>
            ))
          }
        </div>
        <div>
          <Routes>
            <Route path="/" element={<div>Home</div>}></Route>
            <Route path="/players" element={<div>Player</div>}></Route>
            <Route path="/guilds"  element={<div>Guild</div>}></Route>
          </Routes>
        </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
