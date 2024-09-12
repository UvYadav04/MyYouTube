import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import youtube from '../../photos/youtube.jpeg'
export default function Profile() {
    const navigate = useNavigate()
    const currentuser = useSelector(state => state.currentuserreducer)
    // console.log(currentuser)
    const theme = useSelector(state => state.themereducer).theme
    //     style = {{ backgroundImage: `url(${youtube})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }
    // } 
    return (
        <div className={theme === 'light' ? 'w-full h-72 pt-44 flex justify-center bg-slate-300' : 'w-full h-72 pt-44 flex justify-center bg-slate-700'} >
            <div className='w-72 h-[300px] flex-col gap-2 bg-slate-500 p-5  flex place-items-center z-10 border-4'>
                <p className='text-6xl text-center pt-1 bg-white rounded-full w-[70px] h-[70px]'>{
                    currentuser.result.username ? currentuser.result.username.charAt(0).toUpperCase() : currentuser.result.email.charAt(0).toUpperCase()
                }</p>

                {currentuser?.result?.username ? <h2 className='text-4xl'> {currentuser?.result?.username}  </h2>
                    : <h2> {currentuser?.result?.email}  </h2>
                }

                <h2>{currentuser?.result?.points} Points</h2>
                <h2 className='text-lg '>Current Plan : {currentuser?.result?.subscription} </h2>
                <button onClick={() => {
                    navigate('/upgrade')
                }} className='text-orange-400 inline w-auto'>Upgrade Plan</button>
                {
                    currentuser?.result?.name ? <button onClick={() => {
                        navigate(`/channel/${currentuser.result._id}`)
                    }} className='text-xl bg-blue-700 w-full border-2 border-white mt-auto text-white' >Go to your Channel</button> : <button>Create new channel</button>
                }
            </div>
        </div>
    )
}
