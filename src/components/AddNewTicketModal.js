import { Modal } from '@mui/material';
import React from 'react';

const AddNewTicketModal = (props) => {
    return (
        <Modal 
            open={props.open}
            onClose={props.onClose}
        >
            <div> This is Add New ticket modal</div>
        </Modal>
    )
}

export default AddNewTicketModal;