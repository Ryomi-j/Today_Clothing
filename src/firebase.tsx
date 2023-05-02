import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
	GoogleAuthProvider,
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	setPersistence,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import "firebase/database";

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

// 가입
export const signUp = async (email: string, password: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		console.log(user);
	} catch (error) {
		console.error(error);
	}
};

export const getLoginState = () => {
	onAuthStateChanged(auth, (user) => {
		console.log(user);
		if (user) {
			const uid = user.uid;
			return uid;
		}
		return null;
	});
};

// 로그인
export const signIn = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			const user = userCredential.user;
			return user;
		})
		.catch(() => {
			alert("아이디와 비밀번호를 확인하세요");
		});
};

export const persistenceLogin = (email: string, password: string) => {
	setPersistence(auth, browserSessionPersistence)
		.then(() => {
			return signInWithEmailAndPassword(auth, email, password);
		})
		.catch((error) => {
			const errorMessage = error.message;
			console.log(1111, errorMessage);
		});
};

const provider = new GoogleAuthProvider();
export const loginGoogle = () => {
	return signInWithPopup(auth, provider);
};

export const logout = () => {
	signOut(auth)
		.then(() => {
			alert("로그아웃 되었습니다.");
		})
		.catch(() => {
			alert("로그아웃 과정에서 문제가 발생했습니다.")
		});
};

export default app;
