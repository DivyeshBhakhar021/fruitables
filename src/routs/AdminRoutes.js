import React from 'react';
import Product from '../admin/component/Product/Product';
import { Route, Routes } from 'react-router-dom';

function AdminRoutes(props) {
    return (
       <div>
        <h1>admin</h1>
       
        <Routes >
        <Route exect path='/product' element={<Product />} />
      </Routes>
      </div>
    );
}

export default AdminRoutes;