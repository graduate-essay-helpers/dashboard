import React, { useState } from 'react';
// import { motion } from 'framer-motion';

import './Nav.css';

const Nav = () => {

    const [toggle, setToggle] = useState(false);
    const [activeNav, setActiveNav] = useState('#all');

    return (
        <nav className='app__navbar'>
            <ul className='app__navbar-links'>
                {['all', 'read', 'unread', 'starred'].map((item) => (
                    <li className='app__flex p-text' key={`link-${item}`}>
                        <div></div>
                        <a
                            href={`#${item}`}
                            onClick={() => setActiveNav(`#${item}`)} className={activeNav === `#${item}` ? 'active' : ''}
                        >{item}</a>
                    </li>
                ))}
            </ul>

            {/* <div className='app__navbar-menu'>

                {toggle && (
                    <motion.div
                        whileInView={{ x: [300, 0] }}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                    >
                        <ul>
                            {['all', 'read', 'unread', 'starred'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item}`} onClick={() => setToggle(false)}>{item}</a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div> */}
        </nav>
    );

    // const [activeNav, setActiveNav] = useState('#all');

    // return (
    //     <div className='nav-bar'>
    //         <a href="#all" onClick={() => setActiveNav('#all')} className={activeNav === '#all' ? 'active' : ''}>
    //             All
    //         </a>
    //         <a href="#read" onClick={() => setActiveNav('#read')} className={activeNav === '#read' ? 'active' : ''}>
    //             Read
    //         </a>
    //         <a href="#unread" onClick={() => setActiveNav('#unread')} className={activeNav === '#unread' ? 'active' : ''}>
    //             Unread
    //         </a>
    //         <a href="#starred" onClick={() => setActiveNav('#starred')} className={activeNav === '#starred' ? 'active' : ''}>
    //             Starred
    //         </a>
    //     </div>
    // );
}

export default Nav;