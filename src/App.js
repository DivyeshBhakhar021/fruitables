import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UserRoutes from './routs/UserRoutes';
import AdminRoutes from './routs/AdminRoutes';
import PrivateRoutes from './routs/PrivateRoutes';
import { Provider } from 'react-redux';
import { configestore } from './reduct/Store';
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from './context/ThemeContext';
import { ContaxtProvider } from './context/Contactcantext';

function App() {
  const { store, persistor } = configestore()
  return (
    <>
      <ContaxtProvider>
        <ThemeProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Routes >
                <Route exect path='/*' element={<UserRoutes />} />
                <Route element={<PrivateRoutes />}>
                  <Route exect path='/admin/*' element={<AdminRoutes />} />
                </Route>
              </Routes>
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </ContaxtProvider>
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