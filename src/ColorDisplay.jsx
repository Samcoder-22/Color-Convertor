import React from 'react';

const ColorDisplay = ({ hex }) => {
    const style = {
        width: '100px',
        height: '100px',
        backgroundColor: `#${hex}`,
        border: '2px solid #000',
        marginTop: '20px',
    };

    return <div style={style}></div>;
};

export default ColorDisplay;
