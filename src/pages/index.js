import { signIn, signOut, useSession } from 'next-auth/client'

const Home = () => {
	const [session, loading] = useSession()

	return (
		<div className="bg-gray-50 overflow-hidden min-h-screen flex items-center justify-center">
			<main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
				<div className="text-center">
					<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
						<span className="block xl:inline">
							A <span className="block text-[#1dd75f] xl:inline">Spotify Embed</span> for your Twitch Streams
						</span>
					</h1>
					<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-none">Let your listeners know what music you're playing right now by showing it on screen at all times!</p>
					{!loading && (
						<div className="mt-5 md:mt-8">
							{!session ? (
								<button onClick={() => signIn('spotify')} className="rounded-md shadow max-w-xs mx-auto w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#1dd75f] hover:bg-opacity-80 md:py-4 md:text-lg md:px-10 transition">
									Log in with Spotify
								</button>
							) : (
								<div className="bg-white shadow sm:rounded-lg w-full text-left">
									<div className="px-4 py-5 sm:p-6">
										<div className="flex items-center justify-between">
											<h3 className="text-xl leading-6 font-medium text-gray-900">Here's your Embed URL</h3>
											<button type="button" onClick={() => signOut()} className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
												Sign Out
											</button>
										</div>
										<div className="max-w-xl text-sm text-gray-500">
											<p>Create a new Browser source in OBS and add this URL to show your embed on stream.</p>
										</div>
										<div className="mt-1 w-full">
											<label htmlFor="url" className="sr-only">
												Embed URL
											</label>
											<input
												onClick={() => {
													navigator.clipboard.writeText(`${location.origin}/embed/${session.user.image}`)
												}}
												type="url"
												readOnly
												name="url"
												id="url"
												className="shadow-sm focus:outline-none text-gray-600 focus:ring-transparent focus:border-gray-400 focus:ring-none focus-visible:ring block w-full sm:text-sm border-gray-300 rounded-md transition cursor-[copy] select-all"
												value={`${location.origin}/embed/${session.user.image}`}
											/>
										</div>
									</div>
								</div>
							)}
						</div>
					)}
				</div>
			</main>
		</div>
	)
}

export default Home
