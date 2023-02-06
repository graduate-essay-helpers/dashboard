import React from 'react';
import { Container } from 'shards-react'

import { AppWrap } from './wrapper';
import './All.css';

const All = () => {
    return (
        <Container fluid className="main-content-container px-4 app__profiles msg_all">
            <div className="">All</div>
        </Container>

    );
}

export default AppWrap(All, 'all');