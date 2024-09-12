import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaEdit, FaUpload } from "react-icons/fa";
import Showvideogrid from '../../Components/Showvideogrid/Showvideogrid';

export default function Channel({ setcreatechannel, setuploadvideopage }) {
    const { id } = useParams();
    const channels = useSelector(state => state.channelreducer);
    console.log(channels)
    const user = useSelector(state => state.currentuserreducer);
    const currentchannel = channels.find(c => c._id === id);
    const vids = useSelector(state => state.videoreducer)?.data?.filter(q => q?.videochanel === id).reverse()
    const newvid = {
        data: vids
    }
    console.log(newvid)
    console.log(currentchannel)
    return (
        <>
            <div className="channelinfo h-72 w-full bg-slate-500 flex flex-row place-content-start place-items-end ">
                {currentchannel &&
                    <div className='flex flex-row place-content-start place-items-end gap-5'>
                        <div className='bg-slate-900 rounded-full text-white w-[170px] h-[170px] p-0 text-center place-content-center text-9xl'>
                            {currentchannel.name.charAt(0).toUpperCase()}
                        </div>
                        <div className='mb-2'>
                            <h1 className='text-6xl text-white'>{currentchannel.name}</h1>
                            <h1 className='text-md mt-4 text-white'>{currentchannel.desc}</h1>

                            {currentchannel._id === user.result._id && (
                                <div className='right-24 flex'>
                                    <h1 onClick={() => setcreatechannel(true)} className='cursor-pointer'><FaEdit className='inline ' /> Edit Channel</h1>
                                    <h1 onClick={() => setuploadvideopage(true)} className='cursor-pointer'><FaUpload className='inline ' /> Upload Video</h1>
                                </div>
                            )}
                        </div>
                    </div>
                }
            </div>
            <div className="channelvideos">
                {newvid?.data?.length > 0 ? <Showvideogrid vid={newvid} /> : <h1 className='text-7xl opacity-50 text-center mt-24'>Your videos here</h1>}

            </div>
        </>
    );
}
