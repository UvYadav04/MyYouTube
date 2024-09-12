import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updatechannel } from '../../actions/channel'
import { login } from '../../actions/auth'

export default function Createchannel({ setcreatechannel }) {
    const currentUser = useSelector(state => state.currentuserreducer)
    const [chanelname, setchanelname] = useState(currentUser?.result?.name)
    const [description, setdescription] = useState(currentUser?.result?.description)
    const dispatch = useDispatch()

    const createchannel = () => {
        if (chanelname === "" || description === "") {
            alert("fill complete information")
        }
        dispatch(updatechannel(currentUser.result._id, { name: chanelname, description }))
        setcreatechannel(false)
        setTimeout(() => {
            dispatch(login({ email: currentUser.result.email }))
        }, 3000);
    }
    return (
        <div className='absolute ... px-4 top-[40%] left-[40%] flex flex-col bg-slate-400 h-72 w-80 z-10 place-content-center place-items-center'>
            <h6 className='w-fit left-[48%] text-black mt-0 relative top-[-10px] cursor-pointer' onClick={() => setcreatechannel(false)}>close</h6>
            <h1 className='text-3xl text-white mb-10'>Create your channel</h1>
            <div className="channelform flex-col flex gap-5 w-full">
                <input type="text" name="channelname" className='w-[100%] text-lg px-1' placeholder='Channel Name' value={chanelname} onChange={(event) => setchanelname(event.target.value)} />
                <textarea name="description" placeholder='Channel description (atleast 10 words) px-1' rows={3} id="" value={description} onChange={(event) => setdescription(event.target.value)} ></textarea>
                <button className='px-3 py-1 bg-green-500 text-white' onClick={createchannel}>Create</button>
            </div>
        </div>
    )
}
