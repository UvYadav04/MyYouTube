import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSocket } from '../../../Context/SocketProvider';
import ReactPlayer from 'react-player';
import { usePeer } from '../../../Context/PeerProvider';
import { MdOutlineCallEnd, MdScreenShare, MdStopScreenShare } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

export default function Videocall() {
    const { peer, peerId } = usePeer()
    const socket = useSocket();
    const activeusers = useSelector(state => state.activeuserreducer);
    const currentuser = useSelector(state => state.currentuserreducer);
    const hours = new Date().getHours()
    const navigate = useNavigate()

    const [incomingcall, setIncomingCall] = useState(false);
    const [currentcall, setcurrentcall] = useState();
    const [mystream, setMyStream] = useState(null);
    const [remoteStream, setremoteStream] = useState(null);
    const [fromuser, setFromUser] = useState(null);
    const [selected, setselected] = useState(null);
    const [calling, setcalling] = useState(false);
    const [isScreenSharing, setIsScreenSharing] = useState(false);

    const handleSelect = async (item) => {
        setselected(item);
        setcalling(true);
        socket.emit("VideoCall", { from: currentuser.result, to: item });
    };

    console.log(fromuser);

    useEffect(() => {
        socket.on("receive_call", (data) => {
            setFromUser(data.from);
            setselected(data.from);
            setIncomingCall(true);
        });

        socket.on("endcall", () => {
            alert("Call ended");
            endCall();
        });

        const initiatePeerConnection = (peerId, stream) => {
            const call = peer.call(peerId, stream);
            setcurrentcall(call);
            call.on('stream', remoteStream2 => {
                setremoteStream(remoteStream2);
            });
        };

        socket.on("call_accepted", (data) => {
            setcalling(false);
            startCall(data.peerId);
        });

        const startCall = (peerId) => {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then(stream => {
                    setMyStream(stream);
                    initiatePeerConnection(peerId, stream);
                })
                .catch(error => {
                    console.error('Error accessing media devices.', error);
                });
        };

        socket.on("call_rejected", () => {
            setcalling(false);
            alert("Call rejected");
        });

        socket.on("mistake", () => {
            setIncomingCall(false);
        });

        if (peer) {
            peer.on('call', call => {
                navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                    .then(stream => {
                        setcurrentcall(call);
                        setMyStream(stream);
                        call.answer(stream); // Answer the call with your own stream
                        call.on('stream', remoteStream2 => {
                            setremoteStream(remoteStream2);
                        });
                    })
                    .catch(error => {
                        console.error('Error accessing media devices.', error);
                    });
            });
        }

        return () => {
            socket.off("receive_call");
            socket.off("call_accepted");
        };
    }, [socket, peer]);






    const handleScreenShare = () => {
        if (!isScreenSharing) {
            navigator.mediaDevices.getDisplayMedia({ video: true })
                .then(screenStream => {
                    setMyStream(screenStream);
                    if (currentcall) {
                        const sender = currentcall.peerConnection.getSenders().find(s => s.track.kind === 'video');
                        sender.replaceTrack(screenStream.getVideoTracks()[0]);
                    }
                    setIsScreenSharing(true);

                    screenStream.getVideoTracks()[0].onended = () => {
                        stopScreenShare();
                    };
                })
                .catch(error => {
                    console.error('Error sharing screen:', error);
                });
        } else {
            stopScreenShare();
        }
    };

    const stopScreenShare = () => {
        navigate('/videocall')
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(stream => {
                setMyStream(stream);
                if (currentcall) {
                    const sender = currentcall.peerConnection.getSenders().find(s => s.track.kind === 'video');
                    sender.replaceTrack(stream.getVideoTracks()[0]);
                }
                setIsScreenSharing(false);
            })
            .catch(error => {
                console.error('Error switching back to camera:', error);
            });
    };

    const endCall = () => {
        // stopRecording()
        if (mediaRecorder && isRecording) {
            stopRecording();
        }
        if (peer && peer.connections) {
            Object.values(peer.connections).forEach(connections => {
                connections.forEach(connection => {
                    connection.close(); // Close individual connections
                });
            });
        }
        if (mystream) {
            mystream.getTracks().forEach(track => track.stop());
            setMyStream(null); // Reset the local stream state
        }
        setMyStream(null)
        setremoteStream(null);
        setcurrentcall(null);
        setFromUser(null);
        setselected(null);
        setIsScreenSharing(false);
        setcalling(false)
    };

    const handleAccept = async () => {
        try {
            socket.emit("call_accepted", {
                from: currentuser.result,
                to: fromuser,
                peerId
            });
            setIncomingCall(false);
            // startCall(peerId);
        } catch (error) {
            console.error("Error accepting call:", error);
        }
    };

    const handleReject = () => {
        socket.emit("call_rejected", {
            to: fromuser
        });
        setIncomingCall(false);
    };

    window.addEventListener('beforeunload', () => {
        if (currentcall) {
            socket.emit('endcall', { selected })
            endCall()
        }
    });





    return (
        <div className='w-[100vw] h-[93vh] flex'>
            <div className="list w-1/5 border-2 border-black">
                <ul className='h-full w-full overflow-y-scroll overflow-x-hidden px-2 py-4' style={{ scrollbarWidth: 'none' }}>
                    {activeusers.map((item, index) => (
                        item._id !== currentuser.result._id && (
                            <li key={index} className='text-black text-lg px-2 bg-slate-400 rounded-md mb-3' onClick={() => {
                                if (!currentcall)
                                    handleSelect(item)
                            }}>
                                <p>{item.username}</p>
                                <p className='text-[10px] mt-[-8px]'>Tap to video call</p>
                            </li>
                        )
                    ))}
                </ul>
            </div>

            <div className="callpage w-4/5 bg-slate-500 h-full ">
                <div className="mystream absolute bottom-0 right-0 z-10">
                    {mystream ? <ReactPlayer url={mystream} playing width={"300px"} height={"300px"} /> : null}
                </div>
                <div className="remotestream w-full h-full p-0 z-20">
                    {remoteStream ? <ReactPlayer url={remoteStream} playing width={"100%"} height={"100%"} /> : null}
                </div>
                <div className={currentcall ? "controls flex absolute bottom-5 justify-center w-4/5" : "hidden"}>
                    <button className="bg-red-700 px-8 py-2 text-2xl rounded-2xl" onClick={() => {
                        socket.emit("endcall", { selected })
                        endCall()
                    }}>
                        <MdOutlineCallEnd color='white' />
                    </button>
                    <button className="bg-blue-700 px-8 py-2 text-2xl rounded-2xl ml-4" onClick={handleScreenShare}>
                        {isScreenSharing ? <MdStopScreenShare color='white' /> : <MdScreenShare color='white' />}
                    </button>
                </div>

                <div className={currentcall || calling ? "hidden" : "text-center absolute top-56 w-4/5 text-5xl opacity-50 "}>
                    Tap on users to video call them
                </div>
            </div>

            {incomingcall && (
                <div style={{ background: `linear-gradient(to right,rgba(0,128,0,0.7),rgba(255,0,0,0.7))` }} className="px-5 py-2 bg-red absolute top-[40%] left-[40%] rounded-md">
                    <p className='mb-3'>Incoming video call from: {fromuser?.username}</p>
                    <button className="border-white border-[1px] bg-green-500 text-white px-2" onClick={handleAccept}>Accept</button>
                    <button className="border-white border-[1px] bg-red-500 text-white px-2 float-right" onClick={handleReject}>Decline</button>
                </div>
            )}

            {calling && (
                <div style={{ background: `linear-gradient(to right,rgba(0,128,0,0.7),rgba(255,0,0,0.7))` }} className="px-5 py-2 bg-red absolute top-[40%] left-[40%] rounded-md">
                    <p className='mb-3'>Calling: {selected?.username}</p>
                    <button className="border-white border-[1px] bg-green-500 text-white px-2 me-5" onClick={() => endCall()}>Cancel</button>
                </div>
            )}
        </div>
    );
}
