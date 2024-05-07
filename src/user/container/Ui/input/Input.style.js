import styled from "styled-components";

export const ContectInput = styled.input`
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
    margin-bottom: 1rem !important;
    width: 100% !important;
    border: 0 !important;
    display: block;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #747d88;
    background-color: #fff;
    background-clip: padding-box;
    -moz-appearance: none;
    appearance: none;
    border-radius: 10px;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;


    &:focus {
            color: #747d88;
            background-color: #fff;
            border-color: #c0e284;
            outline: 0;
            box-shadow: 0 0 0 .25rem rgba(129,196,8,.25);
        }
`;

// export const TextArea = styled.TextArea`

//         min-height: calc(1.5em + 0.75rem + 2px);
//         margin-bottom: 1rem !important;
//         width: 100% !important;
//         border: 0 !important;
//         display: block;
//         width: 100%;
//         padding: .375rem .75rem;
//         font-size: 1rem;
//         font-weight: 400;
//         line-height: 1.5;
//         color: #747d88;
//         background-color: #fff;
//         background-clip: padding-box;
//         border: 1px solid #ced4da;
//         -webkit-appearance: none;
//         -moz-appearance: none;
//         appearance: none;
//         border-radius: 10px;
//         transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
//         resize: vertical;

//         // &:visited {
//         //     outline-offset: 0px;
//         // }

//     &:focus {
//         color: #747d88;
//         background-color: #fff;
//         border-color: #c0e284;
//         outline: 0;
//         box-shadow: 0 0 0 .25rem rgba(129,196,8,.25);
//     }


// `;