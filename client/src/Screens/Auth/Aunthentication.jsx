import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { login as loginAction, sendotp } from '../../actions/auth';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
export default function Aunthentication() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [stateactive, setstateactive] = useState(false)
    const [logindata, setlogindata] = useState()
    const [existing, setexisting] = useState()
    const [rawdata, setrawdata] = useState()
    const [username, setusername] = useState("")
    const [state, setstate] = useState("Haryana")
    const [user, setUser] = useState(null);
    const otpstatus = useSelector(state => state.otpreducer)
    // console.log(otpstatus)
    const [otp, setotp] = useState()
    const [uotp, setuotp] = useState()
    const [otpactive, setotpactive] = useState(false)
    const allusers = useSelector(state => state.usersreducer)
    const checkexistinguser = (email) => {
        let found = null
        allusers.map((item) => {
            if (item.email === email) {
                found = item
            }
        })
        return found
    }

    useEffect(() => {
        setotp(null)
        dispatch({ type: "Reset" })
        login()
    }, [])

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                try {
                    const res = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    });
                    handlenewuser(res.data);
                } catch (error) {
                    console.log("Error fetching user data", error);
                }
            };

            fetchUserData();
        }
    }, [user]);

    const handlenewuser = (data) => {
        try {
            setrawdata(data)
            const exist = checkexistinguser(data.email)
            console.log(exist)
            if (exist) {
                console.log(exist)
                setexisting(null)
                setlogindata(() => {
                    return { ...data, username: exist.username, state: exist.state }
                })
            }
            else {
                setstateactive(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlestate = () => {
        if (username == "") {
            alert("fill username please")
            return
        }
        let found = false
        allusers.map((item) => {
            if (item.username == username) {
                found = true
            }
        })
        if (found)
            return alert("username already exists")
        setstateactive(false)
        const newdata = { ...rawdata, state: state, username }
        setlogindata(newdata)
    }


    useEffect(() => {
        console.log("logindtaa on")
        console.log(logindata)
        console.log(otpstatus)
        if (logindata) {
            if (otpstatus.status == null)
                dispatch(sendotp({ email: logindata.email }))
        }
    }, [logindata])

    useEffect(() => {
        console.log("otpstatus on")
        if (logindata) {
            if (otpstatus.status == true) {
                console.log(otpstatus)
                setotp(parseInt(otpstatus.otp))
                setotpactive(true)
            }
            else if (otpstatus.status == false) {
                alert("something went wrong please try again in some time")
                dispatch({ type: "Reset" })
                setlogindata(null)
            }
        }
    }, [otpstatus])

    const handleotp = () => {
        try {
            if (parseInt(uotp) !== otp) {
                alert("otp do not match")
                return
            }
            else {
                if (existing) {
                    dispatch(loginAction({ email: logindata.email }));
                    setexisting(null)
                }
                else {
                    dispatch(loginAction({ email: logindata.email, state: logindata.state, username }));
                }
                dispatch({ type: "Reset" })
                setlogindata(null)
                setotp(null)
                setuotp(null)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }


    const login = useGoogleLogin({
        onSuccess: tokenResponse => setUser(tokenResponse),
        onError: (error) => console.log("Login Failed", error)
    });



    return (
        <div className='w-full flex justify-center'>
            <div className="w-80 mt-10 border-2 border-black py-4 px-5 flex flex-column place-items-center place-content-center bg-slate-100">
                <div className={otpactive ? "w-72 left-[40%] top-[40%] bg-white border-2 border-black px-2 py-3" : "hidden"}>
                    <p className='text-red-600 text-[10px]'>*An otp has been sent to your login email.</p>
                    <input type='number' placeholder='otp' className='w-full bg-blue-300 border-2' value={uotp} onChange={(e) => setuotp(e.target.value)} />
                    <button className='bg-green-400 mt-5 w-full' onClick={() => {
                        if (uotp && uotp.length == 6) {
                            handleotp()
                        }
                    }} >Verify</button>
                </div>
                <div className={stateactive ? "state w-72 h-54 bg-slate-300 py-2      px-5 z-30" : "hidden"}>
                    <h1 className='text-sm text-red-500 mt-10'>*Do not refresh or close the page. </h1>
                    <div className=' bg-white '>
                        <label htmlFor="country" className='text-center'>Country : </label>
                        <input className='w-[50%] text-center float-right bg-slate-500' type="text" value={"India"} />
                    </div>
                    <div className=' bg-white mt-5 flex'>
                        <label htmlFor="country" className='text-center'>State : </label>
                        <select className='text-center w-[80%]' onChange={(e) => setstate(e.target.value)} >
                            <option value="Andhra Pradesh">Andhra Pradesh</option>
                            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana" selected>Haryana</option>
                            <option value="Himachal Pradesh">Himachal Pradesh</option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                        </select>
                    </div>
                    <input type="text" className='mt-4 w-full text-lg' placeholder='username' value={username} onChange={(e) => setusername(e.target.value)} />
                    <button onClick={() => handlestate()} className="mt-5 px-10 py-2 text-center ms-[10%] w-fit  bg-black text-white">Create account</button>
                </div>
            </div>
        </div>
    )
}
