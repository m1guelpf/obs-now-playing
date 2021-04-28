import axios from 'axios'
import { useRouter } from 'next/router'
import useSWR from 'swr'

const Embed = () => {
	const router = useRouter()
	const { id } = router.query

	const { data, revalidate } = useSWR(
		() => `/api/now-playing?id=${id}`,
		url => axios.get(url).then(res => res.data),
		{
			initialData: {
				is_playing: false,
				progress: 0,
				title: '',
				artist: null,
				album: '',
				cover_image: null,
			},
			revalidateOnFocus: false,
			refreshInterval: 100,
			refreshWhenHidden: true,
			shouldRetryOnError: false,
			onError: async error => {
				if (error.response.status !== 401) throw error

				await axios.get(`/api/refresh-token?id=${id}`)

				revalidate()
			},
		}
	)

	if (!data.is_playing) return null

	return (
		<div className="flex items-center justify-end p-5">
			<div className="relative inline-flex flex-col overflow-hidden text-white border border-white border-opacity-20 rounded-lg shadow">
				<div className="inline-flex items-center py-2 pl-2 pr-4">
					<div class="absolute bg-center filter blur-sm bg-cover inset-0 w-full h-full z-[-1]" style={{ background: `linear-gradient(to right, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.2) 50%), url(${data.cover_image})` }}></div>
					{data?.cover_image && <img className="rounded-lg w-24 h-24 mr-4" src={data.cover_image} />}
					<div>
						<h1 className="text-2xl mb-1">{data.title}</h1>
						<h2 className="text-gray-100 text-lg">{data.artist}</h2>
					</div>
				</div>
				<div className="max-w-full h-1 bg-[#1cd861]" style={{ width: `${data.progress * 100}%`, transition: 'width 1s linear' }} />
			</div>
		</div>
	)
}

export default Embed
