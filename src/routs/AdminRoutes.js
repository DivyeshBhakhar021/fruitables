import React from 'react';
import Fruits from '../admin/component/Fruits/Fruits';
import { Route, Routes } from 'react-router-dom';
import Layout from '../admin/component/Layout/Layout';
import Vegetables from '../admin/component/coupon/Coupon';
import Category from '../admin/component/Category/Category';
import Facilities from '../user/container/facilities/Facilities';
import Product from '../user/container/product/Product';
import Counter from '../admin/component/counter/Counter';
import Favorite from '../admin/component/saleing/Saleing';
import Productdata from '../admin/component/productdata/Productdata';
import { ProductProvider } from '../context/reducer/salecontext';
import Contact from '../admin/component/Contact/Contact';

function AdminRoutes(props) {
  return (
    <>
      <ProductProvider>
        <Layout>
          <Routes >
            <Route exect path='/Fruits' element={<Fruits />} />
            <Route exect path='/coupon' element={< Vegetables />} />
            <Route exect path='/category' element={< Category />} />
            <Route exect path='/facilities' element={<Facilities />} />
            <Route exect path='/product' element={<Product />} />
            <Route exect path='/Counter' element={<Counter />} />
            <Route exect path='/favorite' element={<Favorite />} />
            <Route exect path='/productdata' element={<Productdata />} />
            <Route exect path='/contact' element={<Contact />} />
          </Routes>
        </Layout>
      </ProductProvider>
    </>
  );
}

export default AdminRoutes;