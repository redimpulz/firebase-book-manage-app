import firebaseApp from "./firebaseApp";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from 'firebase/storage';

const storage = getStorage(firebaseApp);

export const addBookImage = async (image: File) => {
  console.log(image);
  try {
    // TODO: uuidで一意にしたい
    const imagePath = `images/${image.name}`;
    const result = await uploadBytes(ref(storage, imagePath), image);
    return result.metadata.fullPath;
  } catch (e) {
    console.error('! Error adding image: ', e);
  }
}

export const getBookImageURL = async (imagePath?: string) => {
  if (!imagePath) return '/200x283.png';
  try {
    const url = await getDownloadURL(ref(storage, imagePath));
    return url;
  } catch (e) {
    console.error('! Error getting image URL: ', e);
    return '/200x283.png';
  }
}

export const removeBookImage = async (imagePath: string) => {
  try {
    await deleteObject(ref(storage, imagePath));
  } catch (e) {
    console.error('! Error deleting image: ', e);
  }
}
