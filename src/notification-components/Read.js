import React from 'react';
import { Container } from 'shards-react'

import { AppWrap } from './wrapper';
import "./Read.css";

const Read = () => {
    return (
        <Container fluid className="app__skills-container msg_read main-content-container px-4">
            <div>Read</div>
        </Container>
    );
}

export default AppWrap(Read, 'read');