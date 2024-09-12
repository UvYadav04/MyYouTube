/* eslint-disable react/prop-types */
import { googleLogout } from '@react-oauth/google'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setcurrentuser } from '../../actions/currentuser'
import { Link, useNavigate } from 'react-router-dom'

export default function Auth({ user, setauthbtn, setcreatechannel, setprofile }) {
    console.log(user)
    const theme = useSelector(state => state.themereducer).theme
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(setcurrentuser(null))
        localStorage.clear()
        googleLogout()
        setauthbtn(false)
    }
    return (
        <div className={theme === 'light' ? ' z-50 absolute ... top-14 p-3 border-black border-2 flex place-content-start flex-col place-items-center end-0 text-black h-60 bg-white w-72' : ' z-50 absolute ... top-14 p-3 flex place-content-start flex-col place-items-center end-0 text-white border-white border-2 h-60 bg-black w-72'} >
            <button className=' text-white bg-slate-600 p-[1.7px] border-2 border-black rounded-full w-12 h-12 text-2xl'>
                {
                    user?.result?.name ? <>{user?.result.name.charAt(0).toUpperCase()}</>
                        : <>{user?.result.email.charAt(0).toUpperCase()}</>
                }
            </button>
            <h5>{user?.name ? <>{user?.result.name}</>
                : <>{user?.result.email}</>}</h5>
            <button className='text-2xl mt-4 ' onClick={() => {
                setauthbtn(false)
                navigate('/profile')
            }}>Your profile <hr /></button>
            <div className='mt-3'>
                {
                    user.result.name ? <button onClick={() => {
                        setauthbtn(false)
                        navigate(`/channel/${user.result._id}`)
                    }} className='text-2xl underline'>Go to your channel</button>
                        : <Link onClick={(() => {
                            setcreatechannel(true)
                            setauthbtn(false)
                        })} className='text-2xl underline' >Create Channel</Link>
                }
            </div>


            <button className='text-2xl mt-4 text-red-500' onClick={() => logout()}>Log Out <hr /></button>
        </div>
    )
}
