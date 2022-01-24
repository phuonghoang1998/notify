import React from 'react';
import 'antd/dist/antd.min.css';
import Modal from 'antd/lib/modal/Modal';

function ConfirmDeleteModal(props) {
    const { handleClose, isOpen, handleDelete } = props;


    //Event confirm
    function handleOk() {
        handleDelete();
    }

    function handleCancel() {
        handleClose();
    }
    return (
        <div>
            <Modal
                title="Delete client?"
                visible={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
            </Modal>
        </div>
    )
}

ConfirmDeleteModal.propTypes = {

}

export default ConfirmDeleteModal

