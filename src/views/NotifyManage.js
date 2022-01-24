import React from 'react';
import NotificationContent from '../components/notification/NotificationContent';
import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import { Menubar, Topbar } from '../layouts';
function NotifyManage(props) {
    return (
        <Layout>
            <Topbar />
            <Layout>
                <Menubar />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <NotificationContent />
                </Layout>
            </Layout>
        </Layout >
    )
}

NotifyManage.propTypes = {

}

export default NotifyManage

