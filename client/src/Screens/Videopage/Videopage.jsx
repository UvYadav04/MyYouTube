import React, { useEffect, useRef } from 'react'
import "./Videopage.css"
// import moment from 'moment'
import Likewatchlatersavebtns from './Likewatchlatersavebtns'
import { useParams, Link } from 'react-router-dom'
import Comment from '../../Components/Comment/Comment'
import vidd from "../../Components/videos/vid.mp4"
import { viewvideo } from '../../actions/video'
import { addtohistory } from '../..//actions/history'
import { useSelector, useDispatch } from 'react-redux'
import { checkpoints } from '../../actions/userpoints'
import Videoplayer from '../../Components/videoplayer/Videoplayer'

const Videopage = () => {
    const { vid } = useParams();
    // console.log(parseInt(vid))
    const dispatch = useDispatch()
    const vids = useSelector((state) => state.videoreducer)
    const commentref = useRef()
    let vv = null
    for (let i = 0; i < vids.data.length; i++) {
        // console.log(vids.data[i]._id)
        // console.log(vid)
        if (vids.data[i]._id == vid)
            vv = vids.data[i]
    }
    // console.log(vv)

    const currentuser = useSelector(state => state.currentuserreducer);
    const handleviews = () => {
        dispatch(viewvideo({ id: vid }))
    }
    const handlehistory = () => {
        dispatch(addtohistory({
            videoid: vid,
            viewer: currentuser?.result._id,
        }))
    }



    useEffect(() => {
        if (currentuser) {
            handlehistory();
        }
        handleviews()

    }, [])
    return (
        <>
            <div className="container_videoPage">
                <div className="container2_videoPage flex flex-row">
                    <div className="video_display_screen_videoPage w-[90%] relative ...">
                        <div className="showvideo w-full h-[400px] relative ...">
                            <Videoplayer baseName={`${vv.baseName}/master.m3u8`} commentref={commentref} />

                        </div>
                        <div className="video_details_videoPage">
                            <div className="video_btns_title_VideoPage_cont">
                                {/* <p className="video_title_VideoPage">{vv?.title}</p> */}
                                <div className="views_date_btns_VideoPage">
                                    <div className="views_videoPage">
                                        {/* {vv?.views} views <div className="dot"></div>{" "}
                                        {moment(vv?.createdat).fromNow()} */}
                                    </div>
                                    <Likewatchlatersavebtns vv={vv} vid={vid} />
                                </div>
                            </div>
                            <Link to={'/'} className='chanel_details_videoPage'>
                                <b className="chanel_logo_videoPage">
                                    {/* <p>{vv?.uploader.charAt(0).toUpperCase()}</p> */}
                                </b>
                                {/* <p className="chanel_name_videoPage">{vv.uploader}</p> */}
                            </Link>
                            <div className="comments_VideoPage" ref={commentref}  >
                                <h2>
                                    <u>Comments</u>
                                </h2>
                                <Comment videoid={vv._id} />
                            </div>
                        </div>


                    </div>
                    <div className="moreVideoBar">More videos</div>
                </div>
            </div>
        </>
    )
}

export default Videopage

