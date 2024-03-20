import React from 'react';
import Fruits from '../admin/component/Fruits/Fruits';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/component/Layout/Layout';
import Vegetables from '../admin/component/Vegetables/Vegetables';
import Category from '../admin/component/Category/Category';

function AdminRoutes(props) {
  return (
    <div>
      <h1>admin</h1>
      <Layout>
        <Routes >
          <Route exect path='/Fruits' element={<Fruits />} />
          <Route exect path='/vegetables' element={< Vegetables />} />
          <Route exect path='/category'element={< Category/>}/>
        </Routes>
      </Layout>
    </div>
  );
}

export default AdminRoutes;