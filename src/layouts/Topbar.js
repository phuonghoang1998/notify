import React from 'react';
import { Button, Row, Col } from 'antd';
import { Header } from 'antd/lib/layout/layout';
import 'antd/dist/antd.min.css';
function Topbar(props) {
    return (
        <Header className="header">
            <Row>
                <Col span={3}>
                    <p style={{ color: "#fff", paddingLeft: "20px" }}>User 84327497711</p>
                </Col>
                <Col span={18}>
                </Col>
                <Col span={3}>
                    <Button type="primary" danger style={{ marginLeft: "40px" }} >
                        Logout
                    </Button>
                </Col>
            </Row>
        </Header>
    )
}

export default Topbar

