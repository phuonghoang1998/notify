import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { Form, Modal, Input, Switch, Button } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import * as utils from '../../../utils/generateUtil';

function ModifyClientModal(props) {
    const { client, isOpen, onClose, onUpdate } = props;
    const [form, setForm] = useState(client);
    const [isLoading, setLoading] = useState(false);
    const [thisForm] = Form.useForm();

    useEffect(() => {
        initForm();
    }, [isOpen]);

    const initForm = () => {
        setForm({
            clientId: client?.clientId,
            name: client?.name,
            redirectURI: client?.redirectURI,
            trusted: client?.trusted,
            via: client?.via,
            active: client?.active,
            clientSecret: client?.clientSecret
        });
    }

    const handleFormInputChange = (e) => {
        const value = e.target.value;
        setForm({
            ...form,
            [e.target.name]: value
        });
    }

    const handleActive = () => {
        setForm({ ...form, active: !form.active })
    }

    const handleTrusted = () => {
        setForm({ ...form, trusted: !form.trusted })
    }

    //Handle confirm
    const onOk = () => {
        console.log("=======> onOk")
        setLoading(true);
        setTimeout(() => {
            onUpdate(client.id, form);
            thisForm.resetFields();
            setLoading(false);
        }, 1000);
    }

    const onCancel = () => {
        thisForm.resetFields();
        onClose()
    }


    const genNewClientSecret = () => {
        const clientSecret = utils.genClientSecret();
        setForm(pre => { return { ...pre, clientSecret } });
    }

    return (
        <Modal
            title="Update client"
            visible={isOpen}
            okButtonProps={{
                form: 'modifyClient',
                key: 'submit',
                htmlType: 'submit',
                type: 'primary',
                loading: isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            }}
            onOk={() => thisForm.submit}
            onCancel={() => onCancel()}
            onClose={() => onCancel()}
            bodyStyle={{ height: "380px" }}
        >
            <Form
                labelCol={{
                    span: 6,
                }}
                wrapperCol={{
                    span: 15,
                }}
                layout="horizontal"
                size='small'
                form={thisForm}
                onFinish={() => onOk()}
            >
                <Form.Item
                    label="ClientId"
                >
                    <Input
                        name="clientId"
                        value={form?.clientId}
                        disabled
                    />
                </Form.Item>
                <Form.Item
                    label="ClientSecret"
                >
                    <Input
                        name="clientSecret"
                        value={form?.clientSecret}
                        disabled
                    />
                    <Button style={{ marginLeft: '20px', position: 'absolute' }} onClick={() => genNewClientSecret()} icon={<ReloadOutlined />}></Button>
                </Form.Item>
                <Form.Item
                    label="Client name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Client name',
                        },
                    ]}
                >
                    <Input
                        type="text"
                        name="name"
                        value={form?.name}
                        onChange={handleFormInputChange}
                    />
                </Form.Item>
                <Form.Item
                    label="RedirectURI"
                    rules={[
                        {
                            required: true,
                            message: 'Please input RedirectURI',
                        },
                    ]}
                >
                    <Input
                        type="text"
                        name="redirectURI"
                        value={form?.redirectURI}
                        onChange={handleFormInputChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Via"
                    rules={[
                        {
                            required: true,
                            message: 'Please input Via',
                        },
                    ]}
                >
                    <Input
                        type="text"
                        name="via"
                        value={form?.via}
                        onChange={handleFormInputChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Trusted"
                >
                    <Switch
                        name="trusted"
                        checked={form?.trusted}
                        onChange={handleTrusted}
                    />
                </Form.Item>
                <Form.Item label="Active">
                    <Switch
                        name="active"
                        checked={form?.active}
                        onChange={handleActive}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
}


export default ModifyClientModal

