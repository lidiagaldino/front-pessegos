
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvTPgxc9mXlqhXed2yo4q3Hm-4rsvO7pU",
  authDomain: "pessegos-ec695.firebaseapp.com",
  projectId: "pessegos-ec695",
  storageBucket: "pessegos-ec695.appspot.com",
  messagingSenderId: "786346541724",
  appId: "1:786346541724:web:79b9db2b92433bb25f6359"
};

const app = initializeApp(firebaseConfig);

import { getStorage, ref, uploadBytes, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js"

const uploadImage = async (image, name) => {

    const storage = getStorage(app)

    const mountainsRef = ref(storage, `image/${name}.jpg`);
    

    await uploadBytes(mountainsRef, image)

    return await getDownloadURL(mountainsRef)
}

export {
    uploadImage
}