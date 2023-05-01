// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
	GoogleAuthProvider,
	User,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import "firebase/database";
// import { SetterOrUpdater } from "recoil";

const firebaseConfig = {
	apiKey: "AIzaSyDpUao1XcGxU6g0x7bBELobfO1Tu611VgU",
	authDomain: "today-clothing.firebaseapp.com",
	projectId: "today-clothing",
	storageBucket: "today-clothing.appspot.com",
	messagingSenderId: "289564630722",
	appId: "1:289564630722:web:4d96dca6d0005c10a3a55b",
	measurementId: "G-MSJBXTPKP2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth();

export const signUp = async (email: string, password: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		console.log(user);
	} catch (error) {
		console.error(error);
	}
};

export const loginId = (id: string, password: string) => {
	return signInWithEmailAndPassword(auth, id, password);
};

// export const getLoginState = async (cb: Function) => {
// 	return onAuthStateChanged(auth, (user) => {
// 		if (user) {
// 			cb(user);
// 		} else {
// 			cb(null);
// 		}
// 	});
// };

// export const signIn = async (email: string, password: string) => {
// 	try {
// 		const userCredential = await signInWithEmailAndPassword(auth, email, password);
// 		const user = userCredential.user;
// 		return user;
// 	} catch (error) {
// 		console.error(3333, error);
// 	}
// 	return false;
// };

const provider = new GoogleAuthProvider();
export const loginGoogle = () => {
	return signInWithPopup(auth, provider);
};

// export const logout = () => {
// 	signOut(auth)
// 		.then(() => {
// 			alert("로그인 되었습니다.");
// 		})
// 		.catch((error) => {
// 			alert("에러가 발생했다");
// 			console.log(1111, error);
// 		});
// };

export default app;
