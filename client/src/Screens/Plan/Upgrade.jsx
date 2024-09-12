import React, { useState } from 'react'
import { CiCircleCheck } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { upgrade } from '../../actions/plan';
import { useNavigate } from 'react-router-dom';
import coupon from '../../photos/coupon.png'
import './upgrade.css'

export default function Upgrade() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.currentuserreducer)
    console.log(currentUser)
    const id = currentUser?.result?._id
    const [loading, setloading] = useState(false)
    const theme = useSelector(state => state.themereducer).theme
    const checkcoupon = () => {
        console.log(couponcode)
        if (couponcode == "")
            setvalid(false)
        if (couponcode === couponvalue) {
            console.log('Hisfsdf')
            setvalid(true)
            setfinalprice(finalprice - (finalprice / 10))
            setactive(false)
        }
    }
    const handlevalue = (plan, price) => {
        setplan(plan)
        setprice(price)
        setfinalprice(price)
        setform(true)
    }
    const handlebuyplan = () => {
        setloading(true)
        setTimeout(() => {
            dispatch(upgrade(plan, id));
            alert(`Succefully Bought ${plan} model.
            Check your mail for more information.`)
            navigate('/')
            setloading(false)
        }, 3000);
    }

    const [form, setform] = useState(false)
    const [active, setactive] = useState(true)
    const [plan, setplan] = useState("")
    const [price, setprice] = useState(0)
    const [finalprice, setfinalprice] = useState(0)
    const [valid, setvalid] = useState(false)
    const [couponcode, setcouponcode] = useState("")
    const [couponvalue, setcouponvalue] = useState("UTube3610")

    return (
        <div className={!loading ? 'bg-sky-100 pt-24 relative ...' : 'bg-sky-100 pt-24 relative ... opacity-25'}>
            <div className='absolute ... top-9 left-0 h-32 w-52 text-center text-white  coupon bg-red-600'>
                <h1 className='mt-6 text-lg'>Coupon Code : {couponvalue}</h1>
                <h2 className='text-lg'>for 10% discount</h2>
            </div>
            {
                currentUser?.result?.subscription == "Free" ? <h1 className='text-3xl text-center '>CHOOSE THE BEST PLAN FOR YOU</h1> : <h1 className='text-3xl  text-center '>Current Plan : {currentUser?.result?.subscription}</h1>
            }
            <div className={theme === 'light' ? "w-[100vw] h-[100vh] fixed ... flex place-content-center place-items-start pt-5 gap-10  bg-sky-100 " : "w-[100vw] h-[100vh] fixed ... flex place-content-center place-items-start pt-5 gap-10  bg-slate-400 "}>
                <div className="flex-initial py-8 rounded-lg w-1/4 text-center  bg-white  hover:scale-[1.1] " style={{ background: `linear-gradient(to bottom,gold,white)`, transitionDuration: "0.5s" }}>
                    <h1 className='text-5xl py-5'>Gold</h1>
                    <h1 className='text-7xl pt-2 font-bold'>₹100 </h1>
                    <h1 className='text-lg '>per month</h1>
                    <ul className='text-start mt-10 px-5'>
                        <hr className='border-black my-2' />
                        <li> <CiCircleCheck fontSize={18} className='inline mb-1 text-cyan-500' /> Use all features</li>
                        <li><CiCircleCheck fontSize={18} className='inline mb-1 text-cyan-500' /> Chat support</li>
                        <li><CiCircleCheck fontSize={18} className='inline mb-1 text-cyan-500' /> Video upto 20mins</li>
                    </ul>
                    <button className='py-2 px-4 bg-black text-white mt-5 rounded-md' onClick={() => handlevalue("Gold", 100)}>Buy Now</button>
                </div>
                <div className="flex-initial py-8 rounded-lg w-1/4 text-center  bg-white hover:scale-[1.1]  " style={{ background: `linear-gradient(to bottom,silver,white)`, transitionDuration: "0.5s" }}>
                    <h1 className='text-5xl py-5 '>Silver</h1>
                    <h1 className='text-7xl pt-2 font-bold'>₹80 </h1>
                    <h1 className='text-lg '>per month</h1>
                    <ul className='text-start mt-10 px-5'>
                        <hr className='border-black my-2' />
                        <li> <CiCircleCheck fontSize={18} className='inline mb-1 text-cyan-500' /> Use all features</li>
                        <li><CiCircleCheck fontSize={18} className='inline mb-1 text-cyan-500' /> Chat support</li>
                        <li><CiCircleCheck fontSize={18} className='inline mb-1 text-cyan-500' /> Video upto 20mins</li>
                    </ul>
                    <button className='py-2 px-4 bg-black text-white mt-5 rounded-md' onClick={() => handlevalue("Silver", 80)}>Buy Now</button>
                </div>
                <div className="flex-initial py-8 rounded-lg w-1/4 text-center  bg-white hover:scale-[1.1]  " style={{ background: `linear-gradient(to bottom,#CD7F32,white)`, transitionDuration: "0.5s" }}>
                    <h1 className='text-5xl py-5 '>Bronze</h1>
                    <h1 className='text-7xl pt-2 font-bold'>₹50 </h1>
                    <h1 className='text-lg '>per month</h1>
                    <ul className='text-start mt-10 px-5'>
                        <hr className='border-black my-2' />
                        <li> <CiCircleCheck fontSize={18} className='inline mb-1 text-cyan-500' /> Use all features</li>
                        <li><CiCircleCheck fontSize={18} className='inline mb-1 text-cyan-500' /> Chat support</li>
                        <li><CiCircleCheck fontSize={18} className='inline mb-1 text-cyan-500' /> Video upto 20mins</li>
                    </ul>
                    <button className='py-2 px-4 bg-black text-white mt-5 rounded-md' onClick={() => handlevalue("Bronze", 50)} >Buy Now</button>
                </div>
            </div>
            <div className={form ? 'fixed w-84 h-72 top-60 left-[40%] bg-black text-zinc-300 rounded-md p-4' : 'hidden'}>
                <h1>PLAN : <span className='float-right'>{plan}</span></h1>
                <h1>Total price : <span className='float-right'>{price}</span></h1>
                <div><input type="text" value={couponcode} onChange={(e) => setcouponcode(e.target.value)} placeholder='coupon code' className='my-2 rounded-sm' />
                    <button disabled={!active} className='inline bg-green-400' onClick={() => checkcoupon()} >Appy Coupon</button></div>
                <h1>Discount :<span className='float-right'>{valid ? (price / 10)
                    : 0}</span></h1>

                <h1>Final price : <span className='float-right'>{finalprice}</span></h1>
                <button className='px-10 w-full mt-16 rounded-lg py-1 text-black bg-white' onClick={() => handlebuyplan()}>Buy Plan</button>
            </div>
        </div>
    )
}