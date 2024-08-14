import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../user/component/Header/Header';
import Home from '../user/container/Home/Home';
import Shop from '../user/container/Shop/Shop';
import Shop_detail from '../user/container/Shop_detail/Shop_detail';
import Card from '../user/container/Page/Card/Card';
import Chackout from '../user/container/Page/Chackout/Chackout';
import Testimonial from '../user/container/Page/Testimonial/Testimonial';
import Contact from '../user/container/Contact/Contact';
import Error from '../user/container/Error/Error';
import Footer from '../user/component/Footer/Footer'
import Login from '../user/container/Login/Login';
import Register from '../user/container/Register/Register';
import { ThemeContext } from '../context/ThemeContext';
import Chat from '../user/container/Chat/Chat';
import { useDispatch } from 'react-redux';
import { chekauth } from '../reduct/slice/auth.slice';

function UserRoutes(props) {

  const themecontect = useContext(ThemeContext);
  console.log(themecontect);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(chekauth())
  })

  return (
    <div className={themecontect.theme}>

      <Header />
      <Routes >
        <Route exect path='/' element={<Home />} />
        <Route exect path='/shop' element={<Shop />} />
        <Route exect path='/shop_detail' element={<Shop_detail />} />
        <Route exect path='/shop/:id' element={<Shop_detail />} />
        <Route exect path='/card' element={<Card />} />
        <Route exect path='/chackout' element={<Chackout />} />
        <Route exect path='/testimonial' element={<Testimonial />} />
        <Route exect path='/error' element={<Error />} />
        <Route exect path='/contact' element={<Contact />} />
        <Route exect path='/login' element={<Login />} />
        <Route exect path='/register' element={<Register />} />
        <Route exect path='/chat' element={<Chat />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default UserRoutes;