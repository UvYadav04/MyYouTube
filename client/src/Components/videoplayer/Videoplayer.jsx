// src/components/VideoPlayer.jsx
import React, { useRef, useEffect, useState } from 'react';
import { useGeolocated } from "react-geolocated";
import videojs from 'video.js';
import './video.css'
import 'video.js/dist/video-js.css';
import 'videojs-contrib-quality-levels';
import '@videojs/http-streaming';
import './CustomQualityButton'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"
import { checkpoints } from '../../actions/userpoints';

const Videoplayer = ({ baseName, commentref }) => {
    const url = `http://localhost:3000/uploads/${baseName}`;
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [qualityLevels, setQualityLevels] = useState([]);
    const [timelimit, settimelimit] = useState(null)
    const currentuser = useSelector(state => state.currentuserreducer)
    console.log(currentuser)
    const [poster, setposter] = useState(false)
    const dispatch = useDispatch()


    const getLocation = async () => {

        alert("Wait a little please...")
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude
                    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=Asia%2FSingapore&forecast_days=1`)
                    const data = await response.json()

                    alert(`latitude : ${latitude}, longitude : ${longitude}, Temperature : ${data.current.temperature_2m}°C`,)
                },
                (error) => {
                    alert(error.message)
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };


    useEffect(() => {
        if (videoRef.current) {
            const player = videojs(videoRef.current, {
                sources: [{
                    src: url,
                    type: 'application/x-mpegURL'
                }],
                controlBar: {
                    volumePanel: { inline: false }
                }
            });

            playerRef.current = player;
            player.on('loadedmetadata', () => {
                const levels = player.qualityLevels();
                levels.on('addqualitylevel', () => {
                    const qualityArray = [];
                    for (let i = 0; i < levels.levels_.length; i++) {
                        qualityArray.push(levels[i].height);
                    }
                    setQualityLevels(qualityArray);
                });

                const initialLevelsArray = [];
                for (let i = 0; i < levels.levels_.length; i++) {
                    const level = levels[i];
                    initialLevelsArray.push({
                        height: level.height,
                        enabled: level.enabled
                    });
                }
                setQualityLevels(initialLevelsArray);
            });

        }
    }, [url]);

    const changeQuality = (index) => {
        // console.log("buttonhit")
        if (playerRef.current) {
            const levels = playerRef.current.qualityLevels();

            console.log(levels.levels_)
            for (let i = 0; i < levels.levels_.length; i++)
                levels.levels_[i].enabled = i === index;

        }
    };

    const seekForward = (seconds) => {
        if (videoRef.current) {
            videoRef.current.currentTime += seconds;
        }
    };

    const seekBackward = (seconds) => {
        if (videoRef.current) {
            videoRef.current.currentTime -= seconds;
        }
    };

    const [backclickCount, setbackClickCount] = useState(0);
    const [forclickCount, setforClickCount] = useState(0);
    const [centerclickCount, setcenterClickCount] = useState(0);
    const clickTimeoutRef = useRef(null);
    // console.log("coutns: ", forclickCount)


    const handlebackClick = () => {
        setbackClickCount(prev => prev + 1);

        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
        }

        clickTimeoutRef.current = setTimeout(() => {
            if (backclickCount === 1) {
                {
                    seekBackward(10)
                }

            } else if (backclickCount === 2) {
                {
                    console.log("3 times")
                    commentref.current.scrollIntoView({ behavior: 'smooth' });
                }
            }
            setbackClickCount(0);
        }, 500);
    };
    const handleforClick = () => {
        setforClickCount(prev => prev + 1);

        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
        }

        clickTimeoutRef.current = setTimeout(() => {
            if (forclickCount === 1) {
                {
                    console.log("2 times")
                    seekForward(10)
                    setforClickCount(0)
                }
            } else if (forclickCount === 2) {
                {
                    console.log("3 times")
                    close()
                    setforClickCount(0)

                }
            }
            else
                console.log(forclickCount)
            setforClickCount(0);
        }, 500);
    };
    const handlecenterClick = () => {
        setcenterClickCount(prev => prev + 1);

        if (clickTimeoutRef.current) {
            clearTimeout(clickTimeoutRef.current);
        }

        clickTimeoutRef.current = setTimeout(() => {
            if (centerclickCount === 0) {
                if (videoRef.current) {
                    if (videoRef.current.paused) {
                        videoRef.current.play();
                    } else {
                        videoRef.current.pause();
                    }
                }

            }
            setcenterClickCount(0);
        }, 500);
    };




    useEffect(() => {
        if (!currentuser)
            settimelimit(5)
        else {
            if (currentuser?.result?.subscription === "free")
                settimelimit(5)
            else if (currentuser?.result?.subscription === "Bronze")
                settimelimit(7)
            else if (currentuser?.result?.subscription === "Silver")
                settimelimit(10)
            else if (currentuser?.result?.subscription === "Gold")
                settimelimit(null)
        }
        console.log("done done")
    }, [currentuser])

    const handlepoints = () => {
        dispatch(checkpoints({
            viewer: currentuser?.result._id
        }))
    }


    return (
        <div className='w-[100%] h-[100%]'>
            <div className={!poster ? 'relative ...' :
                "hidden"
            }>
                <video
                    ref={videoRef}
                    className="video-js w-full"
                    controls
                    preload='auto'
                    autoPlay

                    onTimeUpdate={() => {
                        if (timelimit && videoRef.current.currentTime >= timelimit) {
                            videoRef.current.pause()
                            setposter(true)
                        }
                    }}
                    onEnded={() => {
                        handlepoints()
                    }}
                // on
                />
                <div className="absolute w-full h-[84%] top-0 left-0 flex flex-row">
                    <div className="w-1/3 h-full bg-transparent" onClick={() => handlebackClick()} ></div>
                    <div className="w-1/3 h-full bg-transparent" onClick={() => handlecenterClick()} ></div>
                    <div className="w-1/3 h-full bg-transparent relative ..." onClick={() => handleforClick()} >
                        <div className="h-1/4 w-1/3 top-0 right-0 absolute" onClick={() => getLocation()} ></div>
                    </div>
                </div>
            </div>

            <div className={!poster ? "quality-controls" : "hidden"}>
                {qualityLevels.map((level, index) => (
                    <button className='bg-black border-2  border-white me-2' key={index} onClick={() => changeQuality(index)}>
                        {level.height}
                    </button>
                ))}
            </div>

            <div className={poster ? "w-full  h-full flex flex-col gap-3 place-items-center place-content-center" : "hidden"}>
                <h1 className='text-5xl text-blue-600' ><Link to={"/upgrade"} >Upgrade</Link ></h1>
                <h2 >your current plan to see full video.</h2>
            </div>
        </div >
    );
};

export default Videoplayer;
