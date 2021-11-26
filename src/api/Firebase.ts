import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
};

export const app = initializeApp(firebaseConfig);

const storage = getStorage();

export const getUrlFromDb = async (filePath: string): Promise<string> => {
  const url = await getDownloadURL(ref(storage, filePath));
  return url;
};

export const getBlobFromDb = async (filePath: string): Promise<Blob> => {
  const url = await getUrlFromDb(filePath);
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
};
