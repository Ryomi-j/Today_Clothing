import { initializeApp } from "firebase/app";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import {
	GoogleAuthProvider,
	User,
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
			creactedAt: user.metadata.creationTime,
			userId: user.email,
			name: user.displayName,
		};
		const newUser = doc(db, "users", user.uid);
		setDoc(newUser, userData, { merge: true });
	} catch (error: any) {
		const errorMessage = error.message;
		if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
			alert("이미 사용중인 아이디입니다.");
		}
	}
};

export const isDuplicateId = async (id: string): Promise<boolean> => {
	try {
		const users = collection(db, "users");
		const q = query(users, where("userId", "==", id));
		const userInfo = await getDocs(q);
		return !userInfo.empty;
	} catch (error) {
		console.error(error);
		return false;
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
			const user = result.user;
			const userData = {
				uid: user.uid,
				creactedAt: user.metadata.creationTime,
				userId: user.email,
				name: user.displayName,
			};
			const newUser = doc(db, "users", user.uid);
			setDoc(newUser, userData, { merge: true });
			return user.uid;
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

export const getUserData = async(uid: string): Promise<User | null> => {
	try {
	  const userDoc = doc(db, "users", uid); // "users" 컬렉션에서 uid에 해당하는 문서를 가져옵니다.
	  const userSnapshot = await getDoc(userDoc); // 문서 스냅샷을 가져옵니다.
	  if (userSnapshot.exists()) {
		const userData = userSnapshot.data() as User; // 문서 데이터를 User 타입으로 캐스팅합니다.
		return userData;
	  } else {
		console.log("No such document!");
		return null;
	  }
	} catch (error) {
	  console.error(error);
	  return null;
	}
  }

export default app;
