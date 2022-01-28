import React from 'react';
import { Link, useLocation, } from 'react-router-dom';
import 'antd/dist/antd.min.css';
import { Layout, Menu } from 'antd';
import { UserOutlined, NotificationOutlined } from '@ant-design/icons';
const { Sider } = Layout;


function Menubar(props) {
    const location = useLocation();
    return (

        <Sider
            width={200} className="site-layout-background"
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <Menu
                mode="inline"
                defaultSelectedKeys={["/client"]}
                selectedKeys={[location.pathname]}
                theme="dark"
            >
                <Menu.Item key="/client" icon={<UserOutlined />}>
                    <Link to="/client">
                        <span>Client</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="/notification" icon={<NotificationOutlined />}>
                    <Link to="/notification">
                        <span>Notification</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
    )
}

Menubar.propTypes = {

}

export default Menubar

