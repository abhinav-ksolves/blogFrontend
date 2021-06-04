import React, { useState, useEffect } from 'react'

const Msg = ({ msg }) => {

    const [message, setMsg] = useState(msg);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setMsg('');
        }, 3000);
        return () => {
            clearTimeout(timeoutId);
        }

    });

    return (
        <h3 className="msg">{message}</h3>
    );
}

export default Msg;