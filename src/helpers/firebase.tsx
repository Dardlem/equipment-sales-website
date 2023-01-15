// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { get, getDatabase, ref, onValue } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAO9f2J-h9t3ro2LANAXNmCvFWGhxO3pQ8",
    authDomain: "equipment-sales-website.firebaseapp.com",
    projectId: "equipment-sales-website",
    storageBucket: "equipment-sales-website.appspot.com",
    messagingSenderId: "272670022312",
    appId: "1:272670022312:web:3f5773b541012fc6f2809d",
    databaseURL : "https://equipment-sales-website-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

// Get data from Firebase
// Args are passed to get specific data from Firebase
export const storeDB = async (args: string) => {
    const snapshot = await get(ref(database, args));
    const res = snapshot.val();
    return res;
}