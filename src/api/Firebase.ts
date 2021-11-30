import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

export interface IProjectsFromDb {
  id: string,
  title: string,
  description: string,
  previewImgRef: string,
  previewMobileImgRef: string,
  isMobilePreview: boolean,
  raiting: number,
  sourceCodeRef: string,
  demoRef: string,
  prodDate: string,
}

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
const dataBase = getFirestore();

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

export const getProjectsFromDb = async () => {
  const projects = await getDoc(doc(dataBase, 'portfolio', 'projects'));

  return projects.data()?.list;
};

export const setProjectsToDb = async (projects: IProjectsFromDb[]) => {
  await setDoc(doc(dataBase, 'portfolio' , 'projects'), { list: projects } );
};
