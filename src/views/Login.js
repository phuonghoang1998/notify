import React from 'react';
import 'antd/dist/antd.min.css';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

function Login(props) {
  return (
    <Row style={{ marginTop: '15vh' }}>
      <Col span={9}></Col>
      <Col span={6} style={{ padding: "35px", backgroundColor: "#eeeeee", borderRadius: "8px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "0.8em" }}>Đăng nhập</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button"
              style={{ backgroundColor: "#185ba8", width: "50%", marginLeft:"24%" }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Col>
      <Col span={9}></Col>
    </Row>


  )
}

Login.propTypes = {

}

export default Login

