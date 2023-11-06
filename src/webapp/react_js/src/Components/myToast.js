import React from 'react';
import { Toast } from 'react-bootstrap';

const CustomToast = (props) => {
    const toastCss = {
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: '1',
        boxShadow: '4px 8px rgba(0, 0, 0, 0.2), 6px 20px rgba(0, 0, 0, 0.2)',
    };

    const getToastType = () => {
        return props.type === 'success' ? 'bg-success' : 'bg-danger';
    };

    return (
        <div style={{ display: props.show ? 'block' : 'none' }}>
            <Toast style={{ ...toastCss, backgroundColor: getToastType() }}>
                <Toast.Header className={`text-white ${getToastType()}`} closeButton={false}>
                    <strong className="mr-auto">{props.type === 'success' ? 'Succès' : 'Succès'}</strong>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </div>
    );
};

export default CustomToast;
