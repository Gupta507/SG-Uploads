import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider, Poster, Track, isYouTubeProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { useEffect, useRef, useState } from 'react';


function MyPlyrVideo({ movie }) {

    const [time, setTime] = useState(null)
    const [initialTime, setInitialTime] = useState(null)
    const ref = useRef()

    useEffect(() => {
        console.log(initialTime)

    }, [initialTime])

    return (<div>
        <MediaPlayer title={movie.title} src={{ src: movie.stream, type: "video/mp4" }}
            viewType='video'
            logLevel='warn'
            crossOrigin
            playsInline
            currentTime={initialTime}
            aspectRatio="16x9"
            ref={ref}
            poster={movie?.poster} artist="SG Uploads"
            onTimeUpdate={() => setTime(ref.current?.currentTime)}>
            <MediaProvider>
                {(movie.captions?.length > 0) && <Track kind="captions" lang="en-US" src={movie.captions[0].src} label="English" default />}
                <Poster className="vds-poster" />
            </MediaProvider>
            <DefaultVideoLayout
                icons={defaultLayoutIcons}
            />
        </MediaPlayer>
    </div>)
}
export default MyPlyrVideo

export function TrailerVideo({ movie, trailer }) {




    function onProviderChange(provider) {
        if (isYouTubeProvider(provider)) {
            provider.cookies = true;
        }
    }
    return trailer && (
        <MediaPlayer title={'Preview ' + movie?.title} src={trailer}
            viewType='video'
            logLevel='warn'
            crossOrigin
            playsInline
            aspectRatio="16x9"
            poster={movie?.poster} artist="SG Uploads" onProviderChange={onProviderChange}>
            <MediaProvider>
                <Poster className="vds-poster" />
            </MediaProvider>
            <DefaultVideoLayout
                icons={defaultLayoutIcons}
            />
        </MediaPlayer>
    )
}

