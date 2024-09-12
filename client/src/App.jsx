import { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Drawer from './Components/Sidebar/Drawer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './actions/auth';
import Createchannel from './Screens/Channel/Createchannel';
import Channel from './Screens/Channel/Channel';
import Uploadvideo from './Screens/Video/Uploadvideo';
import { fethchannels } from './actions/channel';
import Videopage from './Screens/Videopage/Videopage';
import { getallvideo } from './actions/video';
import Library from './Screens/Library/Library';
import Likedvideo from './Screens/Likedvideo/Likedvideo';
import Watchhistory from './Screens/Watchhistory/Watchhistory';
import Watchlater from './Screens/Watchlater/Watchlater';
import Yourvideo from './Screens/Yourvideo/Yourvideo';
import { getallhistory } from './actions/history';
import { getalllikedvideo } from './actions/likedvideo';
import { getallwatchlater } from './actions/watchlater';
import { getallcomment } from './actions/comment';
import Profile from './Screens/Profile/Profile';
import Upgrade from './Screens/Plan/Upgrade';
import { checkvalidity, upgrade } from './actions/plan';
import { theme } from './actions/theme';
import Chat from './Screens/Chat/Chat';
import { fetchallgroups, getgroupdata } from './actions/group';
import { updateusers, getactiveusers } from './actions/users';
import { fetchmessages } from './actions/messages';
import SocketProvider, { useSocket } from '../Context/SocketProvider';
import Videocall from './Screens/Videocall/Videocall';
import { PeerProvider } from '../Context/PeerProvider';
import { usePeer } from '../Context/PeerProvider';
import Authentication from './Screens/Auth/Aunthentication'
import R from './photos/R (1).jpeg'

const AppContent = () => {
  const dispatch = useDispatch();
  const socket = useSocket(); // Access socket instance
  const { peer, peerId } = usePeer()
  const [maintainence, setmaintainence] = useState(false)
  const [userstate, setuserstate] = useState()

  // console.log(peerId)
  // Auto-login logic
  useEffect(() => {
    const autologin = () => {
      const profile = JSON.parse(localStorage.getItem("Profile"));
      if (profile) {
        dispatch(login({ email: profile.result.email, peerId }, socket)); // Pass socket to login action
        // dispatch(checkvalidity({ id: profile.result._id }));
        setuserstate(profile.result.state)
        settheme(profile.result.state);
        socket.emit("connectuser", profile.result)
      }
    };

    autologin();
  }, [dispatch, socket, peerId]);



  // Fetch initial data
  useEffect(() => {
    dispatch(fethchannels());
    dispatch(getallvideo());
    dispatch(getallhistory());
    dispatch(getalllikedvideo());
    dispatch(getallwatchlater());
    dispatch(getallcomment());
    dispatch(updateusers());
    dispatch(fetchallgroups());
    dispatch(fetchmessages());
    dispatch(getactiveusers()); // Ensure this is correctly placed
  }, [dispatch]);

  const [toggledrawerbar, settoggledrawerbar] = useState({ display: "none" });
  const [createchannel, setcreatechannel] = useState(false);
  const [uploadvideopage, setuploadvideopage] = useState(false);


  const toggledrawer = () => {
    if (toggledrawerbar.display === "none") {
      settoggledrawerbar({ display: "flex" });
    } else {
      settoggledrawerbar({ display: "none" });
    }
  };

  const hour = new Date().getHours()
  const settheme = () => {
    if (
      (userstate === "Andhra Pradesh" || userstate === "Karnataka" || userstate === "Kerala" || userstate === "Telangana" || userstate === "Tamil Nadu") ||
      (hour >= 10 && hour <= 12)
    ) {
      document.body.style.backgroundColor = "white"
      dispatch(theme("light"));
    } else {
      document.body.style.backgroundColor = "black"
      dispatch(theme("dark"));
    }
  };

  useEffect(() => {
    if (hour >= 13 && hour < 14) {
      alert("Website is under Maintainence you can login after 2pm")
      setmaintainence(true)
    }
    else
      setmaintainence(false)
  }, [hour])

  if (maintainence)
    return (
      <div className='w-[70%] mx-auto text-center'>
        <img src={R} alt="" />
      </div>
    )
  else
    return (
      <div className='light-theme'>
        <Navbar
          toggledrawer={toggledrawer}
          setcreatechannel={setcreatechannel}
          setuploadvideopage={setuploadvideopage}
        />
        <Drawer toggledrawerbar={toggledrawerbar} />
        {createchannel && <Createchannel setcreatechannel={setcreatechannel} />}
        {uploadvideopage && <Uploadvideo setuploadvideopage={setuploadvideopage} />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/channel/:id' element={<Channel setcreatechannel={setcreatechannel} setuploadvideopage={setuploadvideopage} />} />
          <Route path='/videopage/:vid' element={<Videopage />} />
          <Route path='/Library' element={<Library />} />
          <Route path='/Likedvideo' element={<Likedvideo />} />
          <Route path='/Watchhistory' element={<Watchhistory />} />
          <Route path='/Watchlater' element={<Watchlater />} />
          <Route path='/Yourvideo' element={<Yourvideo />} />
          <Route path='/upgrade' element={<Upgrade />} />
          <Route path='/chat/:id' element={<Chat />} />
          <Route path='/videocall' element={<Videocall />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/Authenticate' element={<Authentication />} />
        </Routes>
      </div>
    );
};

function App() {
  return (
    <SocketProvider>
      <PeerProvider>
        <Router>
          <AppContent />
        </Router>
      </PeerProvider>
    </SocketProvider>
  );
}

export default App;
