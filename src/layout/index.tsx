import {
  ApiOutlined,
  DashboardOutlined,
  OpenAIOutlined,
  ReadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Layout as LayoutComponent, Menu, MenuProps } from 'antd';
import { Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
import './scrollbar.css';

const { Sider, Content } = LayoutComponent;

type MenuItem = Required<MenuProps>['items'][number];
const manageItems: MenuItem[] = [
  {
    key: 'manage',
    label: '管理面板',
    type: 'group',
    children: [
      {
        key: 'dashboard',
        label: '首页',
        icon: <DashboardOutlined />,
      },
      {
        key: 'models',
        label: '模型管理',
        icon: <OpenAIOutlined />,
      },
      {
        key: 'tools',
        label: '工具管理',
        icon: <ApiOutlined />,
      },
      {
        key: 'skills',
        label: '技能管理',
        icon: <ReadOutlined />,
      },
      {
        key: 'agents',
        label: 'Agent管理',
        icon: <TeamOutlined />,
      },
    ],
  },
];
const chatItems: MenuItem[] = [
  {
    type: 'divider',
  },
  {
    key: 'chat',
    label: 'Agent列表',
    type: 'group',
    children: [
      { key: '1', label: '豆包' },
      { key: '2', label: '龙虾' },
      { key: '3', label: '元宝' },
      { key: '4', label: '土豆' },
      { key: '5', label: '鱼香肉丝' },
      { key: '6', label: '红烧肉' },
      { key: '7', label: '青椒肉丝' },
      { key: '8', label: '红烧肉' },
      { key: '9', label: '红烧肉' },
      { key: '10', label: '红烧肉' },
      { key: '11', label: '红烧肉' },
    ],
  },
];

const Layout = () => {
  const [selectedKey, setSelectedKey] = useState<string>('dashboard');
  const navigate = useNavigate();

  const handleMenuClick = (type: 'manage' | 'chat', e: any) => {
    setSelectedKey(e.key);
    if (type === 'manage') {
      navigate(e.key);
    } else if (type === 'chat') {
      navigate(`/chat/${e.key}`);
    }
    console.log('click ', e);
  };

  return (
    <LayoutComponent
      style={{ height: 'calc(100vh - 32px)', background: '#ffffff' }}
    >
      <Sider width={256} style={{ background: '#f9f9f9' }}>
        <div
          style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
        >
          <Menu
            onClick={(e) => handleMenuClick('manage', e)}
            selectedKeys={[selectedKey]}
            defaultOpenKeys={['dashboard']}
            mode="inline"
            style={{ background: '#f9f9f9' }}
            items={manageItems}
          />
          <div
            className="custom-scrollbar"
            style={{ flex: 1, overflow: 'auto' }}
          >
            <Menu
              onClick={(e) => handleMenuClick('chat', e)}
              selectedKeys={[selectedKey]}
              defaultOpenKeys={[]}
              mode="inline"
              style={{ background: '#f9f9f9' }}
              items={chatItems}
            />
          </div>
        </div>
      </Sider>
      <Content
        className="content-scrollbar"
        style={{ padding: '0 24px 24px', height: '100%' }}
      >
        <Outlet />
      </Content>
    </LayoutComponent>
  );
};
export default Layout;
