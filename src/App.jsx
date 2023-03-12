import React, { useEffect, useState } from 'react';
import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import {
  collection, query, where, getDocs,
} from 'firebase/firestore';
import { db } from './firebase';
// eslint-disable-next-line import/no-cycle
import Home from './Components/Home';
import ModalLink from './Components/ModalLink';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

export const UserContext = React.createContext(undefined);

function App() {
  useEffect(() => {
    const uid = localStorage.getItem('uid');
    if (uid) {
      const q = query(collection(db, 'userInfo'), where('uid', '==', uid));
      getDocs(q).then((querySnapshot) => {
        let result = '';

        if (querySnapshot.docs[0]) {
          result = querySnapshot.docs[0].data().summonerName;
        }

        // eslint-disable-next-line no-use-before-define
        setContext(result);

        // eslint-disable-next-line no-use-before-define
        console.log('ici', context);
      });
    }
  }, []);

  const [context, setContext] = useState('');

  return (
    <UserContext.Provider value={context}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="blogs" element={<ModalLink />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
