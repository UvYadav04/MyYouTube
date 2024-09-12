import React, { useEffect, useState } from 'react'
import Leftsidebar from '../../Components/Sidebar/Leftsidebar'
import "./Home.css"
import Showvideogrid from '../../Components/Showvideogrid/Showvideogrid'
import vid from '../../Components/videos/vid.mp4'
import { useDispatch, useSelector } from 'react-redux'
import { getallvideo } from '../../actions/video'
import { useSocket } from '../../../Context/SocketProvider'
export default function Home() {
    const theme = useSelector(state => state.themereducer).theme
    const dispatch = useDispatch()
    const socket = useSocket()
    const currentuser = dispatch(state => state.currentuserreducer)
    const videos = useSelector(state => state.videoreducer)
    // console.log(videos)
    // const vids = [
    //     {
    //         _id: 1,
    //         video_src: vid,
    //         chanel: "wvjwenfj3njfwef",
    //         title: "video 1",
    //         uploader: "abc",
    //         description: "description of video 1"
    //     },
    //     {
    //         _id: 1,
    //         video_src: vid,
    //         chanel: "wvjwenfj3njfwef",
    //         title: "video 1",
    //         uploader: "abc",
    //         description: "description of video 1"
    //     },
    //     {
    //         _id: 2,
    //         video_src: vid,
    //         chanel: "wvjwenfj3njfwef",
    //         title: "video 2",
    //         uploader: "abc",
    //         description: "description of video 2"
    //     },
    //     {
    //         _id: 3,
    //         video_src: vid,
    //         chanel: "wvjwenfj3njfwef",
    //         title: "video 3",
    //         uploader: "abc",
    //         description: "description of video 3"
    //     },
    //     {
    //         _id: 4,
    //         video_src: vid,
    //         chanel: "wvjwenfj3njfwef",
    //         title: "video 4",
    //         uploader: "abc",
    //         description: "description of video 4"
    //     },
    // ]
    // console.log(videos)
    const navlist = [
        "All",
        "Python",
        "Java",
        "C++",
        "Movies",
        "Science",
        "Animation",
        "Gaming",
        "Comedy"
    ];

    useEffect(() => {
        if (currentuser?.result)
            socket.emit("connect_user", currentuser.result)
    }, [currentuser])

    return (
        <>
            <div className={`container_Pages_App flex w-[100vw] `}>
                <Leftsidebar />
                <div className="container2_Pages_App ">
                    <div className={theme === 'light' ? "navigation_Home bg-white" : "navigation_Home bg-black text-white"}>
                        {navlist.map((m) => {
                            return (
                                <p key={m} className={theme === 'light' ? 'btn_nav_home bg-slate-800 text-white' : 'btn_nav_home bg-slate-400 text-black'}>{m}</p>
                            );
                        })}
                    </div>
                    <Showvideogrid vid={videos} />
                </div>
            </div>
        </>
    )
}
