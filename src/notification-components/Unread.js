import React from 'react';
import { Container } from 'shards-react'

import { AppWrap } from './wrapper';
import "./Unread.css";

const Unread = () => {
    return (
        <Container fluid className="main-content-container px-4 app__profiles msg_unread">
            <div>Unread</div>
        </Container>
    );
}

export default AppWrap(Unread, 'unread');