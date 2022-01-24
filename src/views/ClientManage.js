import React from 'react';

import 'antd/dist/antd.min.css';
import { Layout } from 'antd';
import { Menubar, Topbar } from '../layouts';
import ClientContent from '../components/client/ClientContent';

function ClientManage(props) {
    return (
        <Layout>
            <Topbar />
            <Layout>
                <Menubar />
                <Layout style={{ padding: '0 24px 24px' }}>
                    <ClientContent />
                </Layout>
            </Layout>
        </Layout >
    )
}

export default ClientManage

