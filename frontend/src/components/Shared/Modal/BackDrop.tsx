import React, { MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';

const Backdrop = ({ onClick }: { onClick: MouseEventHandler }) => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-10 bg-black opacity-75" onClick={onClick}></div>,
        document.getElementById('backdrop-hook') as Element
    );
};

export default Backdrop;
