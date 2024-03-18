import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoutes(props) {
    const auth = true;
    return (
        <div>
            {
                auth ? <Outlet /> : <Navigate to="/" replace/>
            }
        </div>
    );
}

export default PrivateRoutes;