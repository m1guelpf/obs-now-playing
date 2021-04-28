import firebase from 'firebase/app'
import 'firebase/firestore'

if (firebase.apps.length == 0) {
	firebase.initializeApp({
		apiKey: process.env.FIREBASE_KEY,
		projectId: process.env.FIREBASE_PROJECT,
		appId: process.env.FIREBASE_ID,
	})
}

export default firebase
export const db = firebase.firestore()
