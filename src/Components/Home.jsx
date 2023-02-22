import React, { useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Link, useNavigate } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Home() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const { uid } = user;
        // ...
        console.log('uid', uid);
      } else {
        // User is signed out
        // ...
        console.log('user is logged out');
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate('/login');
      console.log('Signed out successfully');
    }).catch((error) => {
      // An error happened.
      console.error(error);
    });
  };

  return (
    <section>
      <Link to="/Detail">Detail</Link>
      {/* eslint-disable-next-line react/button-has-type */}
      <button onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
}

export default Home;
