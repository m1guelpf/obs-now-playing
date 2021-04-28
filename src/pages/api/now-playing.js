import axios from 'axios'
import { db } from '../../firebase'

export default async function ({ query: { id } }, res) {
	if (!id) return res.status(404).json({ error: 'Not Found' })

	const user = await db.collection('users').doc(id).get()

	if (!user.exists) return res.status(404).json({ error: 'Not Found' })

	const { accessToken } = user.data()

	try {
		const response = await axios
			.get('https://api.spotify.com/v1/me/player/currently-playing', {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			.then(res => res.data)

		res.json({
			is_playing: response.is_playing,
			progress: response.progress_ms / response.item?.duration_ms,
			title: response.item?.name,
			artist: response.item?.artists?.map(artist => artist.name)?.join(', '),
			album: response.item?.album?.name,
			cover_image: response?.item?.album?.images?.filter(img => img.width)?.[0]?.url,
		})
	} catch (error) {
		console.log(error)
		if (error.response.status === 401) return res.status(401).json({ error: 'Token Expired' })

		throw error
	}
}
