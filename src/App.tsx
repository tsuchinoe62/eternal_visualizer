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
import Home from './Home';
import PlayerSearch from './PlayerSearch';
import GuildSearch from './GuildSearch';
import PlayerDetail from './PlayerDetail';
import GuildDetail from './GuildDetail';

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
          <div>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/players" element={<PlayerSearch />}></Route>
              <Route path="/guilds"  element={<GuildSearch />}></Route>
              <Route path="/player_detail/:id" element={<PlayerDetail />}></Route>
              <Route path="/guild_detail/:id" element={<GuildDetail />}></Route>
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
