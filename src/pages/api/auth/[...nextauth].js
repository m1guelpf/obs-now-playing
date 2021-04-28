import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import firebase from '../../../firebase'

const db = firebase.firestore()

export default NextAuth({
	// Configure one or more authentication providers
	providers: [
		Providers.Spotify({
			clientId: process.env.SPOTIFY_ID,
			clientSecret: process.env.SPOTIFY_SECRET,
			scope: ['user-read-currently-playing'],
			profile: async (profile, { accessToken, refreshToken }) => {
				await db.collection('users').doc(profile.id).set({
					id: profile.id,
					accessToken,
					refreshToken,
				})

				return {
					id: profile.id,
					name: profile.display_name,
					email: profile.email,
					image: profile.id,
				}
			},
		}),
	],

	// A database is optional, but required to persist accounts in a database
	database: process.env.DATABASE_URL,
})
