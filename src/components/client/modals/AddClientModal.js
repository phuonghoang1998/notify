import React, { useState } from 'react';
import 'antd/dist/antd.min.css';
import { Form, Modal, Input, Switch } from 'antd';


const defaultForm = {
    name: null,
    redirectURI: null,
    via: null,
    active: false,
    trusted: false,
    clientId: null,
    clientSecret: null
}

function AddClientModal(props) {
    const { isOpen, onClose, onAdd } = props;
    const [form, setForm] = useState(defaultForm);
    const [thisForm] = Form.useForm();

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
        onAdd(newClient);
        thisForm.resetFields(); 
    }

    const onCancel = () => {
        thisForm.resetFields(); 
        onClose();
    }

    const onActive = () =>  {
        setForm({ ...form, active: !form.active })
    }


    return (
        <Modal
            title="Add client"
            visible={isOpen}
            okButtonProps={{ form: 'addClient', key: 'submit', htmlType: 'submit', type: 'primary' }}
            onOk={thisForm.submit}
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
                    span: 14,
                }}
                layout="horizontal"
                size='small'
                form={thisForm}
                onFinish={onOk}
            >
                <Form.Item
                    label="ClientId"
                    name="ClientId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input ClientId',
                        },
                    ]}
                >
                    <Input
                        name="clientId"
                        value={form.clientId}
                        onChange={onFormInputChange}
                    />
                </Form.Item>
                <Form.Item
                    label="ClientSecret"
                    name="ClientSecret"
                    rules={[
                        {
                            required: true,
                            message: 'Please input ClientSecret',
                        },
                    ]}
                >
                    <Input
                        name="clientSecret"
                        value={form.clientSecret}
                        onChange={onFormInputChange}
                    />
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

