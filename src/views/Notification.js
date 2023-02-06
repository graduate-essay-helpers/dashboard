import React, { useState } from 'react';
import { Container } from 'shards-react'

import { Nav, All, Read, Unread, Starred } from '../notification-components';
import './Notification.css';

const Notification = () => {
    const [activeNav, setActiveNav] = useState('#');

    return (
        <Container fluid className="main-content-container px-4">
            <div className='msg'>
                <h3 style={{ position: 'relative' }}>Messages</h3>
                {/* <div style={{ height: '50px', background: 'white', display: 'flex', gap: '20px', alignContent: 'center' }}>
                <h5><a href="">All</a></h5>
                <h5><a href="">Read</a></h5>
                <h5><a href="">Unread</a></h5>
                <h5><a href="">Starred</a></h5>
            </div> */}
                <Nav />
                <div className='notification'>
                    <All />
                    <Read />
                    <Unread />
                    <Starred />
                </div>
            </div>

        </Container>
    )
}

export default Notification