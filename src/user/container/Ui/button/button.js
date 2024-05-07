import React from 'react';
import { AddButton, BaseButton } from './button.style';

function Button({ children }) {
    return (
        <>
            <BaseButton>
            <AddButton>
                {children}
                </AddButton>
            </BaseButton>
        </>
    );
}

export default Button;
