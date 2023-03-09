// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-extraneous-dependencies
import { initializeApp } from 'firebase/app';
// eslint-disable-next-line import/no-extraneous-dependencies
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCNdXRsWM_bV6iVwD-gDO6RebcBllsGVCY',
  authDomain: 'coucou-7eea3.firebaseapp.com',
  projectId: 'coucou-7eea3',
  storageBucket: 'coucou-7eea3.appspot.com',
  messagingSenderId: '996818988874',
  appId: '1:996818988874:web:02dec4e1f7e18be4b51bb3',
  measurementId: 'G-9J2J7Y70GC',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;

const db = getFirestore(app);
export { db };
