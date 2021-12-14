import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

export interface IProjectsFromDb {
  id: string,
  category: string,
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
export const dataBase = getFirestore();

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

export const changeProjectLikeInDb = async (projectId: string, isLiked: boolean) => {
  const projectsList: IProjectsFromDb[] = await getProjectsFromDb();
  const updatedProjectsList = projectsList.map(project => {
    return project.id !== projectId ? project : { ...project, raiting: isLiked ? project.raiting + 1 : project.raiting - 1 > 0 ? project.raiting - 1 : 0 };
  });

  await setDoc(doc(dataBase, 'portfolio' , 'projects'), { list: updatedProjectsList } );
  return { projectId, isLiked };
};
