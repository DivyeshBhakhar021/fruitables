import React from 'react';
import Fruits from '../admin/component/Fruits/Fruits';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/component/Layout/Layout';
import Vegetables from '../admin/component/Vegetables/Vegetables';
import Category from '../admin/component/Category/Category';
import Facilities from '../user/container/facilities/Facilities';
import Product from '../user/container/product/Product';


function AdminRoutes(props) {
  return (
    <>
      <Layout>
        <Routes >
          <Route exect path='/Fruits' element={<Fruits />} />
          <Route exect path='/vegetables' element={< Vegetables />} />
          <Route exect path='/category'element={< Category/>}/>
          <Route exect path='/facilities'element={<Facilities />}/>
          <Route exect path='/product'element={<Product />}/>
        </Routes>
      </Layout>
    </>
  );
}

export default AdminRoutes;