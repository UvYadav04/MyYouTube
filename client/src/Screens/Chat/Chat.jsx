import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MdOutlineGroupAdd } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { CiCircleRemove } from "react-icons/ci";
import { newgroup } from '../../actions/group';
import { current } from '@reduxjs/toolkit';
import io from 'socket.io-client'
import { updatemessages } from '../../actions/messages';
// const socket = io.connect("https://localhost:3000")
import { useSocket } from '../../../Context/SocketProvider';

export default function Chat() {
    const currentuser = useSelector(state => state.currentuserreducer)
    // console.log(currentuser)
    const socket = useSocket()
    // console.log(socket)
    const theme = useSelector(state => state.themereducer).theme
    const dispatch = useDispatch()
    const [creategroup, setcreategroup] = useState(false)
    const allusersdata = useSelector(state => state.usersreducer)
    const groupsdata = useSelector(state => state.groupreducer)
    // console.log(groupsdata)
    const [groups, setgroups] = useState([])




    //    ******************messages***************
    const [search, setsearch] = useState("")
    const [selected, setselected] = useState(null)
    const [message, setmessage] = useState("")
    const [messagelist, setmessagelist] = useState([])
    const allmessages = useSelector(state => state.messagereducer)
    // console.log(allmessages)

    //    ******************messages***************
    // ***********newgroupdata******************
    const [newgroupname, setnewgroupname] = useState("")
    const [members, setmembers] = useState([])
    const addnewmember = membername => setmembers([...members, membername])
    const removemember = name => setmembers(members.filter((member) => member !== name))
    const createnewgroup = () => {
        if (newgroupname == "")
            alert("Please enter group name")
        else if (members.length == 0)
            alert("Please add members")
        else {
            groupsdata.map((item) => {
                if (item.name === newgroupname) {
                    alert("Group name already exists")
                    return
                }
            })
            const newlist = [...members, currentuser.result.email]
            dispatch(newgroup({ newgroupname, members: newlist, id: currentuser.result._id }))
            setmembers([])
            setnewgroupname("")
        }
    }

    // ************************
    const scroll = useRef()
    useEffect(() => {
        if (messagelist && messagelist.length > 0)
            scroll.current.scrollIntoView({ behavior: 'smooth' });
    }, [messagelist])
    // ************************

    const sendmessage = () => {
        if (message !== "") {
            socket.emit("send message", {
                sender: currentuser,
                message: message,
                roomname: selected.name
            })
            setmessage("")
        }
    }

    const usergroups = () => {
        const tmap = {}
        currentuser.result.groupsIn.map(item => tmap[item] = true)
        // console.log(tmap)
        const temp = []
        groupsdata.map(item => {
            if (tmap[item._id])
                temp.push(item)
        })
        setgroups(temp)
        // console.log(groups)
    }

    const handleselect = (item) => {
        socket.emit("connectgroup", item)
        // socket.emit("send message", {
        //     sender: currentuser,
        //     message: "hello",
        //     roomname: item.name
        // })
        setselected(item)
        if (allmessages[item.name]) {
            setmessagelist(allmessages[item.name])
        }
    }

    const getmonth = (x) => {
        switch (x) {
            case 1:
                return "Jan"
            case 2:
                return "Feb"
            case 3:
                return "Mar"
            case 4:
                return "Apr"
            case 5:
                return "May"
            case 6:
                return "June"
            case 7:
                return "July"
            case 8:
                return "Aug"
            case 9:
                return "Sep"
            case 10:
                return "Oct"
            case 11:
                return "Nov"
            case 12:
                return "Dec"

        }
    }

    const getdate = (x) => {
        x = parseInt(x)
        const date = new Date(x * 1000)
        const hours = date.getHours()
        const minutes = date.getMinutes()
        const dte = date.getDate()
        const month = getmonth(date.getMonth() + 1)
        // console.log(month)
        return `${dte} ${month} ${hours}:${minutes}`
    }

    useEffect(() => {
        // console.log('hitt')
        usergroups()
    }, [groupsdata])

    useEffect(() => {
        if (selected) {
            // console.log(allmessages)
            // console.log(allmessages[selected.name])
            setmessagelist(allmessages[selected.name])
        }
    }, [allmessages])


    useEffect(() => {
        const receiveMessageHandler = (data) => {
            // alert(data.message)
            // console.log(data);
            dispatch(updatemessages({ roomname: data.roomname, sender: data.sender, message: data.message }))
        };

        socket.on('receive', receiveMessageHandler);
        // Cleanup function to remove the listener
        return () => {
            socket.off('receive', receiveMessageHandler);
        };
    }, []);

    // ***********newgroupdata******************

    return (
        <div className='w-[100vw] h-[93vh] relative flex'>
            {/* **********************grouplist************************* */}
            <div className={theme === 'light' ? "friends w-1/5 bg-slate-300 h-full px-3 py-2" : "friends w-1/5 bg-slate-800 h-full px-3 py-2"}>
                <div className="upper">
                    <input type="text" className='border-[2px] border-black rounded-full w-4/5 px-2' placeholder='search groups' onChange={(e) => setsearch(e.target.value)} />
                    <MdOutlineGroupAdd color={theme === 'light' ? 'black' : 'white'} className='inline mb-1 ms-5' size={32} onClick={() => setcreategroup(true)} />
                </div>

                <div className="list">
                    {
                        groups.map((item, i) => {
                            return item.name.includes(search) ?
                                <li className='w[90%] mb-3 rounded-md py-2 px-2  list-none bg-slate-400' key={i} onClick={() => handleselect(item)} >{item.name}</li> : null
                        })
                    }
                </div>
            </div>
            {/* **********************grouplist************************* */}

            {/* ************************chat section ************************  */}
            <div className="chat w-4/5 inline h-full bg-white overflow-y-scroll"  >
                {selected ?
                    <div className={theme === 'light' ? "chatsection bg-slate-200 h-full relative" : "chatsection bg-slate-500 h-full relative"}>
                        <div className={theme === 'light' ? "chat-header fixed w-full h-12 bg-slate-100 flex place-content-start px-5 text-xl place-items-center" : "chat-header fixed w-full h-12 bg-slate-700 text-white flex place-content-start px-5 text-xl place-items-center"}>
                            <h1>{selected.name.toUpperCase()}</h1>
                        </div>

                        <div className="messages">
                            <ul className={theme === 'light' ? "messages pt-14 pb-12 flex flex-col place-content-start place-items-start px-10  bg-slate-200" : "messages pt-14 pb-12 flex flex-col place-content-start place-items-start px-10  bg-slate-500"}>
                                {
                                    messagelist ?
                                        messagelist.map((item, i) => {

                                            return <li style={{ minWidth: "200px" }} className={item.sender.result.username === currentuser.result.username ? 'bg-slate-400 mb-3 rounded-md p-0 flex flex-col gap-0 overflow-hidden ps-2 pe-4 ms-auto' : 'bg-slate-400 mb-3 rounded-md p-0 flex flex-col gap-0 overflow-hidden ps-2 pe-4 '} key={i}>
                                                <h1 className='text-[15px] text-amber-400'>{item.sender.result.username}  </h1>
                                                <h1 className='m-0 text-xl mt-[-6px] '>{item.message}</h1>
                                                <h1 className='text-[12px] float-right text-end'>{getdate(item.time)}</h1>
                                            </li>
                                        }) : <h1 className='text-6xl text-center w-full opacity-50 text-slate-600 mt-20'>Be the first one to send message</h1>
                                }
                            </ul>
                            <div ref={scroll} />

                        </div>

                        <div className={theme === 'light' ? "message w-[80%] bg-slate-400 py-2 flex place-content-center place-items-center gap-5 mx-auto fixed bottom-0 " : "message w-[80%] bg-slate-700 py-2 flex place-content-center place-items-center gap-5 mx-auto fixed bottom-0 "}> <input type="text" className='w-[80%] text-lg bg-blue-100 border-black border-[1px] rounded-full px-2' onKeyDown={(e) => {
                            switch (e.key) {
                                case "Enter":
                                    sendmessage()
                            }
                        }} value={message} onChange={(e) => setmessage(e.target.value)} placeholder='type a message' />
                            <button className='bg-slate-300 px-3 py-1 rounded-full' onClick={() => sendmessage()} >send</button></div>
                    </div> :
                    <div className="h-full w-full flex  place-content-center place-items-center text-5xl opacity-50">Tap on groups to chat</div>
                }
            </div>

            {/* ************************chat section ************************  */}

            {/* *******************form*********************** */}
            <div className={creategroup ? "creategroup absolute w-72 py-3 px-2 h-80 bg-white top-[35%] left-[40%] border-black border-2" : "hidden"}>
                <CiCircleRemove className='absolute top-[-30px] right-[-25px]' fontSize={34} onClick={() => setcreategroup(false)} />

                <input type="text" className='w-full bg-slate-800 px-1 text-white' placeholder='newgroupname' onChange={(e) => setnewgroupname(e.target.value)} value={newgroupname} />

                <div className="addmembers text-black mt-5 h-56 ">
                    <p className='border mb-2 h-20 overflow-y-scroll py-2 px-2' style={{ scrollbarWidth: "none" }}>
                        {members.length > 0 ?
                            members.map((item, i) => {
                                return <li style={{ listStyle: "none" }} key={i} className=' bg-slate-400 rounded-full px-2 py-1 mb-1 w-[100%]'>{item}<CiCircleRemove className='float-right inline z-20' fontSize={22} onClick={() => removemember(item)} /></li>
                            }) :
                            <p className='text-center'>Click on users to add them</p>
                        }

                    </p>
                    <div className='h-32 py-2 overflow-y-scroll border-2 border-black px-2' style={{ scrollbarWidth: "none" }}>
                        {
                            allusersdata.map((item, i) => {
                                return currentuser.result.email !== item.email ?
                                    <li key={i} style={{ listStyle: "none" }
                                    } className='w-full bg-slate-500 text-black px-3 mb-2 rounded-sm' onClick={() => addnewmember(item.email)} >
                                        <p className='m-0'>{item.email}</p>
                                        <p className='m-0'>{item.state}</p>
                                    </li>
                                    : null
                            })
                        }
                    </div>
                </div>

                <button className='w-full bg-black text-gray-50 py-1' onClick={() => createnewgroup()}>CREATE GROUP</button>
            </div>
            {/* *******************form*********************** */}

        </div >
    )
}


