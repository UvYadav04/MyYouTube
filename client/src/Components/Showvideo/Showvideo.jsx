import React from 'react'
import './Showvideo.css'
import { Link } from 'react-router-dom'
// import moment from "moment"
import video from '../videos/vid.mp4'

const Showvideo = ({ vid }) => {
  // console.log(vid);

  return (
    <div className='bg-white p-2'>
      <Link to={`/videopage/${vid._id}`}>
        <video src={`https://my-you-tube-sigma.vercel.app/${vid?.filepath}`} className='video_ShowVideo' />
      </Link>
      <div className="video_description mt-2">
        <div className="Chanel_logo_App">
          <div className="fstChar_logo_App border-2 border-black w-[30px] h-[30px] text-center rounded-full text-xl pt-[0px] bg-slate-500">
            {vid?.uploader?.charAt(0).toUpperCase()}
          </div>
        </div>

        <div className="video_details">
          <p className="title_vid_ShowVideo">{vid?.videotitle}</p>
          <pre className="vid_views_UploadTime">{vid?.uploader}</pre>
          {/* <pre className="vid_views_UploadTime">
            {vid?.views} views <div className="dot"></div>{moment(vid?.createdat).fromNow()}
          </pre> */}
        </div>
      </div>
    </div>
  )
}

export default Showvideo
