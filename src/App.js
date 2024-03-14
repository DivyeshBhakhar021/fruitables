import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserRoutes from './routs/UserRoutes';
import AdminRoutes from './routs/AdminRoutes';

function App() {
  return (
    <>
      <Routes >
        <Route exect path='/*' element={<UserRoutes />} />
        <Route exect path='/admin/*' element={<AdminRoutes />} />
      </Routes>
    </>
  );
}

export default App;

// nested routing
  {/* <Route exect path='/card' element={<Card />}>
          <Route exect path='/card' element={<Card />} />
          <Route exect path='/chackout' element={<Chackout />} />
          <Route exect path='/testimonial' element={<Testimonial />} />
          <Route exect path='/error' element={<Error />} />
        </Route> */}




// import { Routes, Route, useParams } from 'react-router-dom';

// function ProfilePage() {
//   // Get the userId param from the URL.
//   let { userId } = useParams();
//   // ...
// }

// function App() {
//   return (
//     <Routes>
//       <Route path="users">
//         <Route path=":userId" element={<ProfilePage />} />
//         <Route path="me" element={...} />
//       </Route>
//     </Routes>
//   );
// }