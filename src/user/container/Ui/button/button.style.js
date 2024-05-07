import styled from "styled-components";

export const BaseButton = styled.button`
    transition: 0.5s;
    cursor: pointer;
    font-weight: 600;
    transition: .5s;
    border-radius: 50rem !important;
    color: #81c408 !important;
    text-transform: uppercase !important;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
    padding-right: 1.5rem !important;
    padding-left: 1.5rem !important;
    margin-left: 1.5rem !important;
    margin-bottom: 1.5rem !important;
    border-color: #ffb524 !important;
    display: inline-block;
    line-height: 1.5;
    text-align: center;
    vertical-align: middle;
    -moz-user-select: none;
    user-select: none;
    background-color: rgba(0,0,0,0);
    border: 1px solid rgba(0,0,0,0);
    font-size: 1rem;
      

    &:hover {
        background: var(--bs-secondary) !important;
        color: var(--bs-white) !important;
      }
    
    }
`;


export const AddButton = styled.button`
    border: 1px solid #dee2e6 !important;
    display: inline-block;
    line-height: 1.5;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    -moz-user-select: none;
    user-select: none;
    background-color: rgba(0,0,0,0);
    padding: .375rem .75rem;
    font-size: 1rem;
    text-decoration: none;
    box-sizing: border-box;
    --bs-gutter-y: 1.5rem;
    border-radius: 50rem !important;
    color: #81c408 !important;
    
    &:hover {
        background: var(--bs-secondary) !important;
        color: var(--bs-white) !important;
      }

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 .25rem rgba(129, 196, 8, .25);
      }
}
`;