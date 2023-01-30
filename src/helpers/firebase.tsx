// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { get, getDatabase, ref, set } from "firebase/database";
import { Product } from "../interfaces";
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

export const auth = getAuth(app);

// Get data from Firebase
// Args are passed to get specific data from Firebase
export const storeDB = async (args: string) => {
    const dbRef = await get(ref(database, args));
    const res = dbRef.val();
    return res;
}

export const updateDatabaseRecord = async (args: string, data: Product) =>{
    const dbRef = ref(database, args);
    await set(dbRef, data);
}

export const removeFromDatabase = async (args: string) => {
    const dbRef = ref(database, args);
    await set(dbRef, null);
}

export const placeOrderToDatabase = async (args: string, data: any) => {
    const dbRef = ref(database, args);
    await set(dbRef, data);
}
