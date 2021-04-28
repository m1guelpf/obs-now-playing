# Spotify Embed for Twitch

This app allows users to login with their Spotify account to generate "now playing" real-time widgets that can be added to OBS or other streaming apps.

## Usage

There's a public instance of this application running at `https://spotify.m1guelpf.me`.

## Development

-   Clone this repo in a local directory
-   Install dependencies (`yarn install` or `npm install`)
-   Copy `.env.example` to `.env.local` and add your Spotify and Firebase API keys
-   Start the server! (`yarn dev` or `npm run dev`)

# Deployment

You can deploy to [Vercel](https://vercel.com/home) by clicking below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fm1guelpf%2Fobs-now-playing&env=SPOTIFY_ID,SPOTIFY_SECRET,NEXTAUTH_URL,FIREBASE_KEY,FIREBASE_ID,FIREBASE_PROJECT&project-name=obs-now-playing&repo-name=obs-now-playing)

# License

This project is open-sourced software licensed under the MIT license. See the [License file](LICENSE.md) for more information.
