import React from 'react'
import { NavLink } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import Home from '../../Screens/Home/Home';
import { SiYoutubeshorts } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";
import { MdOutlineExplore, MdOutlineVideoLibrary, MdOutlineWatchLater } from "react-icons/md"
import { FaHistory } from 'react-icons/fa'
import { AiFillPlaySquare, AiOutlineHome, AiFillLike } from 'react-icons/ai'
import { FaRegUserCircle } from "react-icons/fa";


import './Drawer.css'
import { useSelector } from 'react-redux';

export default function Drawer({ toggledrawerbar }) {
    const theme = useSelector(state => state.themereducer).theme
    return (
        <div className={theme === 'light' ? ' z-50 w-60 absolute ... left-0 top-14 bg-white  drawer text-black flex flex-col' : ' z-50 w-60 absolute ... left-0 top-14 bg-black  drawer text-white flex flex-col'} style={toggledrawerbar}>

            <div className='top flex flex-col text-xl gap-5 px-4 py-2'>
                <ul >
                    <li>
                        <IoMdHome style={{ fontSize: 25 }} />
                        <NavLink to={'/'} className={"ms-5 text-[1.2rem]"}>
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <SiYoutubeshorts style={{ fontSize: 25, padding: "2px" }} />
                        <NavLink to={'/'} className={"ms-5 text-[1.2rem]"}>
                            Shorts
                        </NavLink>
                    </li>

                    <li>
                        <MdSubscriptions style={{ fontSize: 25 }} />
                        <NavLink to={'/'} className={"ms-5 text-[1.2rem]"}>
                            Subscriptions
                        </NavLink>
                    </li>
                </ul>
                <hr />
            </div>
            <div className='top flex flex-col text-xl gap-5 px-4 py-2'>

                <ul >
                    <li className='mb-3'>
                        <h6 className='text-md  '><b>You</b> &gt;</h6>
                    </li>
                    <li>
                        <MdOutlineVideoLibrary style={{ fontSize: 25 }} />
                        <NavLink to={'/Library'} className={"ms-5 text-[1.2rem]"}>
                            Library
                        </NavLink>
                    </li>

                    <li>
                        <FaHistory style={{ fontSize: 25, padding: "2px" }} />
                        <NavLink to={'/Watchhistory'} className={"ms-5 text-[1.2rem]"}>
                            History
                        </NavLink>
                    </li>

                    <li>
                        <MdOutlineWatchLater style={{ fontSize: 25 }} />
                        <NavLink to={'/Watchlater'} className={"ms-5 text-[1.2rem]"}>
                            Watch Later
                        </NavLink>
                    </li>
                    <li>
                        <AiFillPlaySquare style={{ fontSize: 25 }} />
                        <NavLink to={'/Yourvideo'} className={"ms-5 text-[1.2rem]"}>
                            Your Videos
                        </NavLink>
                    </li>
                    <li>
                        <AiFillLike style={{ fontSize: 25 }} />
                        <NavLink to={'/Likedvideo'} className={"ms-5 text-[1.2rem]"}>
                            Liked videos
                        </NavLink>
                    </li>
                </ul>
                <hr />
            </div>
            <div className='top flex flex-col text-xl gap-5 px-4 py-2'>

                <ul >
                    <li className='mb-3'>
                        <h6 className='text-md  '>subscriptions &gt;</h6>
                    </li>
                    <li>
                        <FaRegUserCircle style={{ fontSize: 25 }} />
                        <NavLink to={'/'} className={"ms-5 text-[1.2rem]"}>
                            Dinesh Yadav
                        </NavLink>
                    </li>

                    <li>
                        <FaRegUserCircle style={{ fontSize: 25, padding: "2px" }} />
                        <NavLink to={'/'} className={"ms-5 text-[1.2rem]"}>
                            T-series
                        </NavLink>
                    </li>

                    <li>
                        <FaRegUserCircle style={{ fontSize: 25 }} />
                        <NavLink to={'/'} className={"ms-5 text-[1.2rem]"}>
                            Nitish Rajput
                        </NavLink>
                    </li>
                    <li>
                        <FaRegUserCircle style={{ fontSize: 25 }} />
                        <NavLink to={'/'} className={"ms-5 text-[1.2rem]"}>
                            Carry Minati
                        </NavLink>
                    </li>
                </ul>
                <hr />
            </div>


        </div >
    )
}
