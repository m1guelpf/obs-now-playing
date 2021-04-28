import url from 'url'
import { Buffer } from 'buffer'
import axios from 'axios'
import { db } from '../../firebase'

export default async function ({ query: { id } }, res) {
	if (!id) return res.status(404).json({ error: 'Not Found' })

	const user = await db.collection('users').doc(id).get()

	if (!user.exists) return res.status(404).json({ error: 'Not Found' })

	const { id: userId, refreshToken } = user.data()

	const { access_token } = await axios
		.post('https://accounts.spotify.com/api/token', new url.URLSearchParams({ grant_type: 'refresh_token', refresh_token: refreshToken }).toString(), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Basic ${new Buffer(`${process.env.SPOTIFY_ID}:${process.env.SPOTIFY_SECRET}`).toString('base64')}`,
			},
		})
		.then(res => res.data)

	await db.collection('users').doc(id).set({
		id: userId,
		accessToken: access_token,
		refreshToken,
	})

	res.status(200).json({ done: true })
}
