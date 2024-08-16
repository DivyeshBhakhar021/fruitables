import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { chekauth } from '../reduct/slice/auth.slice';

function PrivateRoutes(props) {
    const [isLoding, setisLoding] = useState(true);
    const { isAuthanticated, data } = useSelector(state => state.auth)

    console.log("isAuthanticated", isAuthanticated);


    const navigate = useNavigate();
    const dispatch = useDispatch()


    useEffect(() => {
        const isauthstate = async () => {
            try {
                await dispatch(chekauth())
            }
            catch {
                navigate('/login');
            } finally {
                setisLoding(false)
            }
        }
        isauthstate()
    }, [navigate, dispatch])

    if (isLoding) {
        return <div>Loding.....</div>
    }

return (
    <div>
        {
            isAuthanticated ? <Outlet /> : <Navigate to="/login" replace />
        }
    </div>
);
}

export default PrivateRoutes;

