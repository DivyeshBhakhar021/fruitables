import {  useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../../reduct/slice/alert.slice';

function Alert(props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { color, message } = useSelector(state => state.alert)
    const dispatch=useDispatch()
    console.log("color", color);
    console.log("meassge", message);

    useEffect(() => {
        if (message != '') {
            enqueueSnackbar(message, {
                variant: color,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
            })

            const timeOut = setTimeout(()=>{dispatch(resetAlert)},2000);

            return () => clearInterval(timeOut)
        }

    }, [message])


    return (
        <div>

        </div>
    );
}

export default Alert;