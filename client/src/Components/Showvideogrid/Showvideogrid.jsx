import React from 'react'
import "./Showvideogrid.css"
import Showvideo from '../Showvideo/Showvideo'
const Showvideogrid = ({ vid }) => {
    // console.log(vid)
    return (
        <div className="Container_ShowVideoGrid  w-fit p-3 flex flex-wrap gap-5">
            {
                vid?.data.map((vi, i) => {
                    return (
                        <div key={vi._id + i} className="video_box_app w-[400px] border-none">
                            <Showvideo vid={vi} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Showvideogrid


