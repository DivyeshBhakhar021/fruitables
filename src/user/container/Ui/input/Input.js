import React from 'react';
import { ContectInput, TextArea } from './Input.style';

function Input(props) {
    return (
        <>
            <ContectInput {...props} />
            {/* <TextArea {...props} /> */}
        </>
    );
}

export default Input;