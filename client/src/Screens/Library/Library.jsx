import React from 'react'
import Leftsidebar from '../../Components/Sidebar/Leftsidebar'
import { FaHistory } from "react-icons/fa"
import { MdOutlineWatchLater } from "react-icons/md"
import { AiOutlineLike } from "react-icons/ai"
import vid from "../../Components/videos/vid.mp4"
import WHLvideolist from '../../Components/WHL/WHLvideolist'
import { useSelector } from 'react-redux'
import './Library.css'
const Library = () => {
    const currentuser = useSelector(state => state.currentuserreducer);

    const likedvideolist = useSelector(state => state.likedvideoreducer)
    const watchlatervideolist = useSelector((s) => s.watchlaterreducer)
    const watchhistoryvideolist = useSelector(s => s.historyreducer)
    console.log(likedvideolist)
    return (
        <div className="container_Pages_App flex w-full text-black">
            <Leftsidebar />
            <div className='container2_Pages_App '>
                <div className="container_libraryPage flex-col ">
                    <h1 className=" w-66 px-3 py-2 text-2xl bg-slate-500">
                        <b>
                            <FaHistory className='inline' />
                        </b>
                        <b className='ms-4'>History</b>
                    </h1>
                    <div className="container_videoList_LibraryPage flex place-content-start">
                        {
                            likedvideolist?.data?.length > 0 ? <WHLvideolist page={"History"} currentuser={currentuser?.result?._id} videolist={watchhistoryvideolist} />
                                : <h1>History Videos appear here</h1>
                        }
                    </div>
                </div>
                <div className="container_libraryPage flex-col">
                    <h1 className=" w-66 px-3 mt-5 py-2 text-2xl bg-slate-500">
                        <b>
                            <FaHistory className='inline' />
                        </b>
                        <b className='ms-4'>Watch Later</b>
                    </h1>
                    <div className="container_videoList_LibraryPage">
                        {
                            watchlatervideolist?.data?.length > 0 ? <WHLvideolist page={"History"} currentuser={currentuser?.result?._id} videolist={watchlatervideolist} />
                                : <h1>Watch later Videos appear here</h1>
                        }
                    </div>
                </div>
                <div className="container_libraryPage flex-col">
                    <h1 className=" w-66 px-3 mt-5 py-2 text-2xl bg-slate-500">
                        <b>
                            <FaHistory className='inline' />
                        </b>
                        <b className='ms-4'>Liked Videos</b>
                    </h1>
                    <div className="container_videoList_LibraryPage">
                        {
                            likedvideolist?.data?.length > 0 ? <WHLvideolist page={"History"} currentuser={currentuser?.result?._id} videolist={likedvideolist} />
                                : <h1>Liked Videos appear here</h1>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Library
