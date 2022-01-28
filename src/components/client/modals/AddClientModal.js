import React, { useState } from 'react';
import 'antd/dist/antd.min.css';
import { Form, Modal, Input, Switch, Button } from 'antd';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import * as utils from '../../../utils/generateUtil';


const defaultForm = {
    name: null,
    redirectURI: null,
    via: null,
    active: false,
    trusted: false,
    clientId: utils.genClientId(),
    clientSecret: utils.genClientSecret()
}

function AddClientModal(props) {
    const { isOpen, onClose, onAdd } = props;
    const [form, setForm] = useState(defaultForm);
    const [thisForm] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const onFormInputChange = (e) => {
        const value = e.target.value;
        setForm({
            ...form,
            [e.target.name]: value
        });
    }

    const onTrusted = () => {
        setForm({ ...form, trusted: !form.trusted })
    }

    const onOk = () => {
        const newClient = form;
        setLoading(true);
        setTimeout(() => {
            onAdd(newClient);
            setLoading(false);
            thisForm.resetFields();
        }, 1000);
    }

    const onCancel = () => {
        thisForm.resetFields();
        onClose();
    }

    const onActive = () => {
        setForm({ ...form, active: !form.active })
    }


    const genNewClientId = () => {
        const clientId = utils.genClientId();
        setForm(pre => { return { ...pre, clientId } });
    }

    const genNewClientSecret = () => {
        const clientSecret = utils.genClientSecret();
        setForm(pre => { return { ...pre, clientSecret } });
    }


    return (
        <Modal
            title="Add client"
            visible={isOpen}
            okButtonProps={{
                form: 'addClient',
                key: 'submit',
                htmlType: 'submit',
                type: 'primary',
                loading: loading && <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            }}
            onOk={() => thisForm.submit}
            onCancel={() => onCancel()}
            onClose={() => onCancel()}
            bodyStyle={{ height: "380px" }}
        >
            <Form
                id='addClient'
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
                    name="ClientId"
                >
                    <Input
                        name="clientId"
                        value={form?.clientId}
                        onChange={() => onFormInputChange()}
                        disabled
                    />
                    <Button style={{ marginLeft: '20px', position: 'absolute' }} onClick={() => genNewClientId()} icon={<ReloadOutlined />}></Button>
                </Form.Item>
                <Form.Item
                    label="ClientSecret"
                    name="ClientSecret"
                >
                    <Input
                        name="clientSecret"
                        value={form?.clientSecret}
                        onChange={onFormInputChange}
                        disabled
                    />
                    <Button style={{ marginLeft: '20px', position: 'absolute' }} onClick={() => genNewClientSecret()} icon={<ReloadOutlined />}></Button>
                </Form.Item>
                <Form.Item
                    label="Client name"
                    name="Client name"
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
                        value={form.name}
                        onChange={onFormInputChange}
                    />
                </Form.Item>
                <Form.Item
                    label="RedirectURI"
                    name="RedirectURI"
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
                        value={form.redirectURI}
                        onChange={onFormInputChange}
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
                        value={form.via}
                        onChange={onFormInputChange}
                    />
                </Form.Item>
                <Form.Item label="Trusted">
                    <Switch
                        name="trusted"
                        checked={form.trusted}
                        onChange={onTrusted}
                    />
                </Form.Item>
                <Form.Item label="Active">
                    <Switch
                        name="active"
                        checked={form.active}
                        onChange={onActive}
                    />
                </Form.Item>
            </Form>
        </Modal >
    )
}


export default AddClientModal

