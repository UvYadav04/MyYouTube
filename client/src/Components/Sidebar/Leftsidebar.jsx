import React from 'react'
import "./Leftsidebar.css"
import { SiYoutubeshorts } from "react-icons/si";
import { AiOutlineHome } from "react-icons/ai"
import { MdOutlineExplore, MdOutlineSubscriptions, MdOutlineVideoLibrary } from "react-icons/md"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
const Leftsidebar = () => {
    const theme = useSelector(state => state.themereducer)

    return (
        <div className={theme.theme === "light" ? "container_leftSidebar w-fit bg-white" : "container_leftSidebar w-fit bg-black"}>
            <NavLink to={'/'} className="icon_sidebar_div">
                <AiOutlineHome size={22} color={theme.theme === "light" ? 'black' : 'white'} className='icon_sidebar' />
                <div className={theme.theme === "light" ? "text_sidebar_icon text-black" : "text_sidebar_icon text-white"}>Home</div>
            </NavLink>
            <div className="icon_sidebar_div">
                <MdOutlineExplore size={22} color={theme.theme === "light" ? 'black' : 'white'} className='icon_sidebar' />
                <div className={theme.theme === "light" ? "text_sidebar_icon text-black" : "text_sidebar_icon text-white"}>Explore</div>
            </div>
            <div className="icon_sidebar_div">
                <MdOutlineExplore size={22} color={theme.theme === "light" ? 'black' : 'white'} className='icon_sidebar' />
                <div className={theme.theme === "light" ? "text_sidebar_icon text-black" : "text_sidebar_icon text-white"}>Shorts</div>
            </div>
            <div className="icon_sidebar_div">
                <MdOutlineSubscriptions size={22} color={theme.theme === "light" ? 'black' : 'white'} className='icon_sidebar' />
                <div className={theme.theme === "light" ? "text_sidebar_icon text-black" : "text_sidebar_icon text-white"} style={{ fontSize: "12px" }}>Subscription</div>
            </div>
            <NavLink to={'/Library'} className="icon_sidebar_div">
                <MdOutlineVideoLibrary size={22} color={theme.theme === "light" ? 'black' : 'white'} className='icon_sidebar' />
                <div className={theme.theme === "light" ? "text_sidebar_icon text-black" : "text_sidebar_icon text-white"}>Library</div>
            </NavLink>
        </div>
    )
}

export default Leftsidebar