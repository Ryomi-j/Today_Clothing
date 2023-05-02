import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
	GoogleAuthProvider,
	browserSessionPersistence,
	createUserWithEmailAndPassword,
	getAuth,
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
		const userData = {
			uid: user.uid,
			userId: email,
			userPw: password,
		};
		const newUser = doc(db, "users", "user");
		setDoc(newUser, userData, { merge: true });
	} catch (error) {
		console.error(error);
	}
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
			console.log(errorMessage);
		});
};

const provider = new GoogleAuthProvider();
export const loginGoogle = () => {
	return signInWithPopup(auth, provider)
		.then((result) => {
			// This gives you a Google Access Token. You can use it to access the Google API.
			const credential = GoogleAuthProvider.credentialFromResult(result);
			const token = credential?.accessToken;
			const userId = result.user.uid;
			return userId;
		})
		.catch((error) => {
			console.log(error);
		});
};

export const logout = () => {
	signOut(auth)
		.then(() => {
			alert("로그아웃 되었습니다.");
		})
		.catch(() => {
			alert("로그아웃 과정에서 문제가 발생했습니다.");
		});
};

export default app;
