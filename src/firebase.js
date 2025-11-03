import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDGcHvB5BfQFplnrtGdAUivRi42sz6bsHk",
  authDomain: "ana-nery-sistema.firebaseapp.com",
  projectId: "ana-nery-sistema",
  storageBucket: "ana-nery-sistema.firebasestorage.app",
  messagingSenderId: "682299592081",
  appId: "1:682299592081:web:820e12e62e3d808e2ade30"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
