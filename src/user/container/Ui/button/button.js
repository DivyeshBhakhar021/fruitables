import React from 'react';
import { BaseButton, PrimaryButton, SeconderyButton } from './button.style';

function Button({ children, btntype = "Primary", Btndisable = false, ...props }) {
    console.log(btntype);

    const Chektype = () => {
        switch (btntype) {
            case 'Primary':
                return PrimaryButton;
            case 'Secondery':
                return SeconderyButton;
            default:
                return PrimaryButton;
        }
    }


    const CustomButton = Chektype();


    return (
        <>
            <CustomButton disabled={Btndisable} {...props}>
                {children}
            </CustomButton>
        </>
    );
}

export default Button;
