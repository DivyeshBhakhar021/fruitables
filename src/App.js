import React from 'react';
import Home from './user/container/Home/Home';
import Header from './user/component/Header/Header';
import Footer from './user/component/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Shop from './user/container/Shop/Shop';
import Shop_detail from './user/container/Shop_detail/Shop_detail';
import Contact from './user/container/Contact/Contact';
import Card from './user/container/Page/Card/Card';
import Chackout from './user/container/Page/Chackout/Chackout';
import Testimonial from './user/container/Page/Testimonial/Testimonial';
import Error from './user/container/Error/Error';

function App() {
  return (
    <>
    
    <Header />
      <Routes >
      <Route  exect path='/' element={<Home/>}/>
      <Route  exect path='/shop' element={<Shop/>}/>
      <Route  exect path='/shop_detail' element={<Shop_detail />}/>
      <Route  exect path='/contact' element={<Contact />}/>
      <Route  exect path='/card' element={<Card />}/>
      <Route  exect path='/chackout' element={<Chackout />}/>
      <Route  exect path='/testimonial' element={<Testimonial />}/>
      <Route  exect path='/error' element={<Error />}/>
      </Routes>
    <Footer />
    </>
  );
}

export default App;
