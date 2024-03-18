import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserRoutes from './routs/UserRoutes';
import AdminRoutes from './routs/AdminRoutes';
import PrivateRoutes from './routs/PrivateRoutes';

function App() {
  return (
    <>
      <Routes >
        <Route exect path='/*' element={<UserRoutes />} />
        <Route element={<PrivateRoutes />}>
          <Route exect path='/admin/*' element={<AdminRoutes />} />
        </Route>

      </Routes>
    </> 
  );
}


export default App;






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