import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { Form, Modal, Input, Switch } from 'antd';
import { useForm } from 'antd/lib/form/Form';

function ModifyClientModal(props) {
    const { client, isOpen, onClose, onUpdate } = props;
    const [form, setForm] = useState(null);
    const [thisForm] = useForm();


    useEffect(() => {
        setForm({
            clientId: client?.clientId,
            name: client?.name,
            redirectURI: client?.redirectURI,
            trusted: client?.trusted,
            via: client?.via,
            active: client?.active,
            clientSecret: client?.clientSecret
        });
    }, [isOpen])




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
        onUpdate(client.id, form);
        thisForm.resetFields();
    }

    const onCancel = () => {
        thisForm.resetFields();
        onClose()
    }

    return (
        <Modal
            title="Modify client"
            visible={isOpen}
            okButtonProps={{ form: 'modifyClient', key: 'submit', htmlType: 'submit', type: 'primary' }}
            onOk={thisForm.submit}
            onCancel={onCancel}
            onClose={onCancel}
            bodyStyle={{ height: "350px" }}
        >
            <Form
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
                    //name="clientId"
                    rules={[
                        {
                            required: true,
                            message: 'Please input ClientId',
                        },
                    ]}
                >
                    <Input
                        name="clientId"
                        value={form?.clientId}
                        onChange={handleFormInputChange}
                    />
                </Form.Item>
                <Form.Item
                    label="ClientSecret"
                    //name="ClientSecret"
                    rules={[
                        {
                            required: true,
                            message: 'Please input ClientSecret',
                        },
                    ]}
                >
                    <Input
                        name="clientSecret"
                        value={form?.clientSecret}
                        onChange={handleFormInputChange}
                    />
                </Form.Item>
                <Form.Item
                    label="Client name"
                    //name="Client name"
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
                    //name="RedirectURI"
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
                    //name="Via"
                    rules={[
                        {
                            required: true,
                            message: 'Please input RedirectURI',
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

ModifyClientModal.propTypes = {

}

export default ModifyClientModal

