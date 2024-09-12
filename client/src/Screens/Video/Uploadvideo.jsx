import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Videoupload.css'
import { buildStyles, CircularProgressbar } from "react-circular-progressbar"

import { uploadvideo } from '../../actions/video'
export default function Uploadvideo({ setuploadvideopage }) {
    const [title, settitle] = useState("")
    const [videofile, setvideofile] = useState("")
    const [progress, setprogress] = useState(0)
    const dispatch = useDispatch()
    const handlesetvideofile = (e) => {
        console.log(e.target.files)
        setvideofile(e.target.files[0])
    }
    const currentuser = useSelector(state => state.currentuserreducer);
    const fileoption = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setprogress(percentage)
            if (percentage === 100) {
                setTimeout(function () { }, 3000);
                setuploadvideopage(false)
            }
        },
    };
    const uploadvideofile = () => {
        console.log(videofile.size)
        if (!title) {
            alert("plz enter a title of the video")
        } else if (!videofile) {
            alert("plz attach a video file");
        } else if (videofile.size > 10000000) {
            alert("Plz attach video file less than 1 kb")
        } else {
            let filedata = new FormData()
            filedata.append("file", videofile)
            filedata.append("title", title)
            filedata.append("chanel", currentuser?.result?._id)
            filedata.append("uploader", currentuser?.result.name)
            // console.log(videofile)
            // for (let pair of filedata.entries()) {
            //     console.log(pair[0] + ': ' + pair[1]);
            // }
            dispatch(uploadvideo({ filedata: filedata, fileoption: fileoption }))
        }
    }

    return (
        <div className="container_VidUpload bg-transparent">
            <div className="container2_VidUpload bg-slate-500">
                <button className=' w-fit ms-[90%] text-black' onClick={() => setuploadvideopage(false)}>close</button>
                <div className="ibox_div_vidupload">
                    <input type="text" maxLength={30} placeholder='Enter title of your video' className="ibox_vidupload w-full p-[0.5px]" onChange={(e) => {
                        settitle(e.target.value);
                    }} />
                    <label htmlFor="file" className='ibox_cidupload btn_vidUpload'>
                        <input type="file" name='file' style={{ fontSize: "1rem" }} onChange={(e) => { handlesetvideofile(e) }} className="ibox_vidupload w-full" />
                    </label>
                </div>
                <div className="ibox_div_vidupload">
                    <button className='bg-black text-white px-3 py-1 mt-4 rounded-md' onClick={() => uploadvideofile()} >Upload</button>
                    <div className="loader ibox_div_vidupload">
                        <CircularProgressbar
                            value={progress}
                            text={`${progress}`}
                            styles={buildStyles({
                                rotation: 0.25,
                                strokeLinecap: "butt",
                                textSize: "20px",
                                pathTransitionDuration: 0.5,
                                pathColor: `rgba(255,255,255,${progress / 100})`,
                                textColor: "#f88",
                                trailColor: "#adff2f",
                                backgroundColor: "#3e98c7",
                            })}

                        />
                    </div>
                </div>
            </div>
        </div >
    )
}
