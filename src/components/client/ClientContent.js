import { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Table, Button, Modal } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { AddClientModal, ModifyClientModal } from '../../components/client/modals';
import { EditOutlined, DeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import { clientApi } from '../../api/clientApi';
const { Content } = Layout;


function ClientContent(props) {

    const [isOpenAddClientModal, setOpenAddClienModal] = useState(false);
    const [isOpenModifyClientModal, setOpenModifyClientModal] = useState(false);
    const [curClient, setCurClient] = useState(null);
    const [listClients, setListClients] = useState(null);

    useEffect(() => {
        initData();
    }, [])

    const initData = async () => {
        const { success, records } = await clientApi.get();
        if (!success) return [];
        setListClients(records);
    }

    //CRUD func
    const addClient = (newClient) => {
        const add = async () => {
            const { success } = await clientApi.add(newClient);
            if (!success) return;
            initData();
        }
        add();
        setOpenAddClienModal(false);
    }

    const deleteClient = (client) => {
        const delClient = async () => {
            const { success } = await clientApi.delete(client.id);
            if (!success) return;
            initData();
        }
        delClient();
    }

    const updateClient = (id, client) => {
        const updateClient = async () => {
            const { success } = await clientApi.edit(id, client);
            if (!success) return;
            initData();
        }
        updateClient();
        setOpenModifyClientModal(false);
    }

    //Handle open/close modal
    const openAddClienModal = (isOpen) => {
        setOpenAddClienModal(isOpen);
    }

    const openModifyClientModal = (isOpen, client) => {
        setCurClient(client);
        setOpenModifyClientModal(isOpen);
    }

    const actionColumn = [
        {
            title: 'Action',
            key: 'action',
            render: client => (<>
                <div style={{ display: "flex" }}>
                    <EditOutlined style={{ cursor: "pointer" }}
                        onClick={() => openModifyClientModal(true, client)}
                    />
                    <DeleteOutlined
                        style={{ color: "red", marginLeft: 10, cursor: "pointer" }}
                        onClick={() => {
                            Modal.confirm({
                                title: 'Chắc chắn xóa client này',
                                onOk: () => deleteClient(client)
                            })
                        }}
                    />
                </div>
            </>)
        }
    ]

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a href='/#'>{text}</a>,
        },
        {
            title: 'RedirectURI',
            dataIndex: 'redirectURI',
            key: 'redirectURI',
        },
        {
            title: 'Trusted',
            dataIndex: 'trusted',
            key: 'trusted',
            render: trusted => (
                <>
                    {<Checkbox checked={trusted} />}
                </>
            )
        },
        {
            title: 'Active',
            dataIndex: 'active',
            key: 'active',
            render: active => (
                <>
                    {<Checkbox checked={active} />}
                </>
            )
        },
        {
            title: 'Via',
            dataIndex: 'via',
            key: 'via',
        },
        {
            title: 'ClientId',
            dataIndex: 'clientId',
            key: 'clientId',
        },
        {
            title: 'ClientSecret',
            dataIndex: 'clientSecret',
            key: 'clientSecret',
        },
        ...actionColumn
    ];

    return (
        <Content
            className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: '90vh'
            }}
        >
            <div>
                <AddClientModal
                    isOpen={isOpenAddClientModal}
                    onClose={() => openAddClienModal(false)}
                    onAdd={addClient}
                />
                <ModifyClientModal
                    isOpen={isOpenModifyClientModal}
                    client={curClient}
                    onClose={() => openModifyClientModal(false)}
                    onUpdate={updateClient}
                />
            </div>
            <Button type="primary" onClick={() => openAddClienModal(true)} icon={<UserAddOutlined />}>Add Client</Button>
            <Table rowKey={record => record.clientId} columns={columns} dataSource={listClients} style={{ marginTop: "20px" }} ></Table>
        </Content>
    )
}

export default ClientContent;

