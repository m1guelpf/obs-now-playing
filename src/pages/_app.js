import Head from 'next/head'
import '../styles/tailwind.css'

function MyApp({ Component, pageProps }) {
	const meta = {
		title: 'A Spotify Embed for your Twitch Streams',
		description: "Let your listeners know what music you're playing right now by showing it on screen at all times!",
		image: 'https://spotify.m1guelpf.me/card.jpg',
	}
	return (
		<>
			<Head>
				<title>{meta.title}</title>
				<meta name="title" content={meta.title} />
				<meta name="description" content={meta.description} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="https://spotify.m1guelpf.me/" />
				<meta property="og:title" content={meta.title} />
				<meta property="og:description" content={meta.description} />
				<meta property="og:image" content={meta.image} />

				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:url" content="https://spotify.m1guelpf.me/" />
				<meta property="twitter:title" content={meta.title} />
				<meta property="twitter:description" content={meta.description} />
				<meta property="twitter:image" content={meta.image} />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default MyApp
