import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { CiBellOff, CiSearch } from "react-icons/ci";
import { BsFillRecordCircleFill } from "react-icons/bs";
import { FcVideoCall } from "react-icons/fc";

import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { IoIosMic } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { ImYoutube } from "react-icons/im";


import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../../Screens/Auth/Auth';

export default function Navbar({ setcreatechannel, toggledrawer, setuploadvideopage }) {

    const [authbtn, setauthbtn] = useState(false);
    const currentUser = useSelector(state => state.currentuserreducer);
    const [disablevideocall, setdisablevideocall] = useState(false)


    const navigate = useNavigate()
    const theme = useSelector(state => state.themereducer).theme

    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);

    const startRecording = async () => {
        try {
            // The user will still need to choose the screen, window, or tab
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: 'always', // Shows cursor in the recording
                },
                audio: false, // Set to true if you want to capture audio as well
            });

            mediaRecorderRef.current = new MediaRecorder(stream, {
                mimeType: 'video/webm; codecs=vp9',
            });

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(recordedChunksRef.current, {
                    type: 'video/webm',
                });
                const url = URL.createObjectURL(blob);

                // Automatically download the recording
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'screen-recording.webm';
                document.body.appendChild(a);
                a.click();

                // Clean up
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                recordedChunksRef.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Error starting screen recording:', err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    // useEffect(() => {
    //     const date = new Date()
    //     const hours = date.getHours()
    //     if (hours < 11)
    //         setdisablevideocall(true)
    //     else
    //         setdisablevideocall(false)
    // }, [])

    return (
        <div className={theme === "light" ? 'flex w-full bg-white h-14 place-content-center place-items-center' : 'flex w-full bg-black h-14 place-content-center place-items-center'}>
            <div className="logo flex-none flex place-content-start ps-5 gap-1 place-items-center w-1/6 h-full ">
                <GiHamburgerMenu className='flex-initial me-3' style={{ color: theme === 'light' ? 'black' : 'white', fontSize: 30, fontWeight: "200" }} onClick={() => toggledrawer()} />
                <Link to={'/'} className='h-fit flex-initial m-0 '> <ImYoutube style={{ color: "red", fontSize: 28, fontWeight: "200" }} /></Link>
                <Link to={'/'} className='h-fit flex-initial m-0 '>  <h1 className='text-black text-2xl'>YouTube</h1></Link>
            </div>
            <div className="searchbar flex-auto flex gap-2 place-content-center place-items-center w-2/4 h-full text-white">
                <div className="w-1/2 h-2/3  border-2 border-black rounded-3xl overflow-hidden text-center text-md py-0 flex place-content-center place-items-center">
                    <input type="text" className='w-full flex-auto  h-full focus:border-none px-3 text-black text-lg ' />
                    <CiSearch style={{ color: theme === 'light' ? 'black' : 'white', fontSize: 28, fontWeight: "200" }} className='flex-none w-1/12 bg-slate-500 h-full' />
                </div>
                <IoIosMic style={{ color: theme === 'light' ? 'black' : 'white', fontSize: 32, fontWeight: "200" }} />
            </div>
            <div className="userinfo flex-none flex gap-4  place-content-center px-3 place-items-center w-1/8 h-full text-white">
                <RiVideoAddLine onClick={() => setuploadvideopage(true)} style={{ color: theme === 'light' ? 'black' : 'white', fontSize: 25, fontWeight: "200" }} className='cursor-pointer' />
                <BsFillRecordCircleFill style={{ color: theme === 'light' ? 'black' : 'white', fontSize: 25, fontWeight: "200" }} onClick={isRecording ? stopRecording : startRecording} />
                {currentUser ? <IoChatboxEllipsesOutline style={{ color: theme === 'light' ? 'black' : 'white', fontSize: 25, fontWeight: "200" }} onClick={() => navigate(`/chat/${currentUser.result._id}`)} /> : null}
                {currentUser && !disablevideocall ? <FcVideoCall style={{ color: theme === 'light' ? 'black' : 'white', fontSize: 25, fontWeight: "200" }} onClick={() => navigate(`/videocall`)} /> : null}

                <CiBellOff style={{ color: theme === 'light' ? 'black' : 'white', fontSize: 25, fontWeight: "200" }} />
                {
                    currentUser ? <div className={theme === 'light' ? "info rounded-full bg-black w-[35px] h-[35px] text-white flex place-content-center place-items-center cursor-pointer relative ..." : "info rounded-full bg-white w-[35px] h-[35px] text-black flex place-content-center place-items-center cursor-pointer relative ..."} onClick={() => setauthbtn(!authbtn)}>
                        {currentUser?.name ? (
                            <>{currentUser?.result?.name?.charAt(0).toUpperCase()}</>
                        ) : (
                            <>{currentUser?.result?.email?.charAt(0).toUpperCase()}</>
                        )}</div>
                        : <div className="signin border-white py-0 rounded-sm w-fit box-border bg-blue-500 px-3 text-lg cursor-pointer" onClick={() => {
                            navigate('/authenticate')
                        }} ><h6>Signin</h6></div>
                }
            </div>

            {authbtn && <Auth user={currentUser} setauthbtn={setauthbtn} setcreatechannel={setcreatechannel} />}




        </div>
    );
}
