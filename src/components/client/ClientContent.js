import { useEffect, useState } from 'react';
import 'antd/dist/antd.min.css';
import { Layout, Table, Button, Modal } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { AddClientModal, ModifyClientModal } from '../../components/client/modals';
import { EditOutlined, DeleteOutlined, UserAddOutlined, ReloadOutlined } from '@ant-design/icons';
import { clientApi } from '../../api/clientApi';
const { Content } = Layout;


function ClientContent(props) {

    const [isOpenAddClientModal, setOpenAddClienModal] = useState(false);
    const [isOpenModifyClientModal, setOpenModifyClientModal] = useState(false);
    const [isDisplayDeleteButton, setDisplayDeleteButton] = useState(false);
    const [editClient, setEditClient] = useState(null);
    const [delClients, setDelClients] = useState([]);
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
            await initData();
            setOpenAddClienModal(false);
        }
        add();
    }

    const deleteClients = (clients) => {
        const delClients = async () => {
            for (let client of clients) {
                await clientApi.delete(client.id);
            }
            initData();
            setDisplayDeleteButton(false);
        }

        delClients();
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
        console.log("==>", client)
        setEditClient(client);
        setOpenModifyClientModal(isOpen);
    }

    const columns = [
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
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'RedirectURI',
            dataIndex: 'redirectURI',
            key: 'redirectURI',
            render: text => <a href='/#'>{text}</a>,
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
            title: 'Action',
            key: 'action',
            render: client => (<>
                <div style={{ display: "flex" }}>
                    <EditOutlined style={{ cursor: "pointer" }}
                        onClick={() => openModifyClientModal(true, client)}
                    />
                </div>
            </>)
        }
    ];

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setDelClients(selectedRows);
            if (selectedRows.length === 0) setDisplayDeleteButton(false);
            else setDisplayDeleteButton(true);
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        }
    };

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
                    client={editClient}
                    onClose={() => openModifyClientModal(false)}
                    onUpdate={updateClient}
                />
            </div>
            <Button type="primary" onClick={() => openAddClienModal(true)} icon={<UserAddOutlined />}>Thêm</Button>
            <Button style={{ marginLeft: '20px' }} onClick={() => initData()} icon={<ReloadOutlined />}></Button>
            {isDisplayDeleteButton && <Button
                type="primary"
                danger
                icon={< DeleteOutlined />}
                style={{ float: 'right' }}
                onClick={() => {
                    Modal.confirm({
                        title: 'Chắc chắn xóa các mục này',
                        onOk: () => deleteClients(delClients)
                    })
                }}>
                Xóa
            </Button>}
            <Table
                rowKey={record => record.id}
                columns={columns}
                dataSource={listClients}
                style={{ marginTop: "20px" }}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
            ></Table>
        </Content>
    )
}

export default ClientContent;

