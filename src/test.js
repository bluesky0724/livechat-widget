import { Button } from '@mui/material';
import React from 'react';
import AddNewTicketModal from './components/AddNewTicketModal';
import InfoCard from './components/InfoCard';
import Message from './components/Message';
import MessageInput from './components/MessageInput';

const Test = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClose  = () => {
        setIsOpen(false);
    }
    return <div>
        <div className='w-1/3'>
            <Message senderName="Xing Liao" message="hello my friend" attachments={["test.png", "test2.jpg"]} />
            <MessageInput />
            <InfoCard />
            <Button onClick={(e) => setIsOpen(true)} >Open Modal</Button>
            <AddNewTicketModal open={isOpen} onClose={handleClose} />
        </div>
    </div>
}

export default Test;