import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  // Add your Firebase configuration here
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
