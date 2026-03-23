import { ApiOutlined, DashboardOutlined, OpenAIOutlined, ReadOutlined, TeamOutlined } from "@ant-design/icons";
import { Layout as LayoutComponent, Menu, MenuProps } from "antd";
import { Outlet } from "react-router";
import "./scrollbar.css";

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
            { key: '13', label: 'Agent1' },
            { key: '14', label: 'Agent2' },
            { key: '15', label: 'Agent3' },
            { key: '16', label: 'Agent4' },
            { key: '17', label: 'Agent5' },
            { key: '18', label: 'Agent6' },
            { key: '19', label: 'Agent7' },
            { key: '20', label: 'Agent8' },
            { key: '21', label: 'Agent9' },
            { key: '22', label: 'Agent10' },
            { key: '23', label: 'Agent11' },
            { key: '24', label: 'Agent12' },
        ],
    },
];

const Layout = () => {
    return (
        <LayoutComponent style={{ height: '100vh' }}>
            <Sider width={256} style={{ background: '#fff' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <Menu
                        onClick={(e) => {
                            console.log('click ', e);
                        }}
                        defaultSelectedKeys={['manage']}
                        defaultOpenKeys={['manage']}
                        mode="inline"
                        items={manageItems}
                    />
                    <div className="custom-scrollbar" style={{ flex: 1, overflow: 'auto' }}>
                        <Menu
                            onClick={(e) => {
                                console.log('click ', e);
                            }}
                            defaultSelectedKeys={[]}
                            defaultOpenKeys={[]}
                            mode="inline"
                            items={chatItems}
                        />
                    </div>
                </div>
            </Sider>
            <Content style={{ margin: '0 24px 24px' }}>
                <Outlet />
            </Content>
        </LayoutComponent>
    );
};
export default Layout;