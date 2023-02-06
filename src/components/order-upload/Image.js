import React from 'react';

const Image = ({ image }) => {
    return (
        <div>
            <img alt='' src={image.src} />
        </div>
    );
}

export default Image