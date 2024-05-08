import React from 'react';
import { ContectInput, SpanError, TextArea } from './Input.style';

function Input({ errorText, ...props }) {
    return (
        <>
            <ContectInput
            {...props}
            />
                
            <SpanError>
                {errorText}
            </SpanError>

            {/* <TextArea {...props} /> */}
        </>
    );
}

export default Input;