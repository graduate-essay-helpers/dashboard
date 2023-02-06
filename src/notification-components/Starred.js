import React from 'react';
import { Container } from 'shards-react'

import { AppWrap } from './wrapper';
import "./Starred.css";

const Starred = () => {
    return (
        <Container fluid className="main-content-container px-4 app__skills-container msg_starred">
            <div>Starred</div>
        </Container>
    );
}

export default AppWrap(Starred, 'starred');