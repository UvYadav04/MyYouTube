import React, { useEffect, useState } from 'react';
import { BsThreeDots } from "react-icons/bs";
import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { MdPlaylistAddCheck } from "react-icons/md";
import { RiHeartAddFill, RiPlayListAddFill, RiShareForwardLine } from "react-icons/ri";
import "./Likewatchlatersavebtn.css";
import { useSelector, useDispatch } from 'react-redux';
import { likevideo } from '../../actions/video';
import { addtolikedvideo, deletelikedvideo, getalllikedvideo } from "../../actions/likedvideo";
import { addtowatchlater, deletewatchlater, getallwatchlater } from '../../actions/watchlater';

const Likewatchlatersavebtns = ({ vv, vid }) => {
  // console.log(vv, vid)
  const dispatch = useDispatch();
  const [savevideo, setsavevideo] = useState(false);
  const [dislikebtn, setdislikebtn] = useState(false);
  const [likebtn, setlikebtn] = useState(false);
  const currentuser = useSelector(state => state.currentuserreducer);
  const likedvideolist = useSelector((state) => state.likedvideoreducer);
  const watchlaterlist = useSelector((s) => s.watchlaterreducer);
  // console.log(currentuser.result)s
  useEffect(() => {
    for (let i = 0; i < likedvideolist?.data?.length; i++) {
      if (likedvideolist.data[i]._id == vid)
        setlikebtn(true)
    }
    for (let i = 0; i < watchlaterlist?.data?.length; i++) {
      if (watchlaterlist.data[i]._id == vid)
        setsavevideo(true)
    }

  }, [likedvideolist, watchlaterlist, vid, currentuser]);

  const togglesavedvideo = () => {
    if (currentuser) {
      if (savevideo) {
        setsavevideo(false);
        dispatch(deletewatchlater({ videoid: vid, viewer: currentuser?.result?._id }));
      } else {
        setsavevideo(true);
        dispatch(addtowatchlater({ videoid: vid, viewer: currentuser?.result?._id }));
      }
    } else {
      alert("please login to save video");
    }
  };

  const togglelikevideo = (e, lk) => {
    if (currentuser) {
      if (likebtn) {
        setlikebtn(false);
        dispatch(likevideo({ id: vid, Like: lk - 1 }));
        dispatch(deletelikedvideo({ videoid: vid, viewer: currentuser?.result?._id }));
      } else {
        setlikebtn(true);
        dispatch(likevideo({ id: vid, Like: lk + 1 }));
        dispatch(addtolikedvideo({ videoid: vid, viewer: currentuser?.result?._id }));
        setdislikebtn(false);
      }
    } else {
      alert("please login to save video");
    }
  };

  const toggledislikevideo = (e, lk) => {
    if (currentuser) {
      if (dislikebtn) {
        setdislikebtn(false);
      } else {
        setdislikebtn(true);
        if (likebtn) {
          dispatch(likevideo({ id: vid, Like: lk - 1 }));
          dispatch(deletelikedvideo({ videoid: vid, viewer: currentuser?.result?._id }));
        }
        setlikebtn(false);
      }
    } else {
      alert("please login to save video");
    }
  };



  return (
    <div className="btns_cont_videoPage">
      <div className="btn_VideoPage">
        <BsThreeDots />
      </div>
      <div className="btn_VideoPage">
        <div className="like_videoPage" onClick={(e) => togglelikevideo(e, vv.Like)}>
          {likebtn ? (
            <AiFillLike size={22} className='btns_videoPage' />
          ) : (
            <AiOutlineLike size={22} className='btns_videoPage' />
          )}
        </div>
        <div className="like_videoPage" onClick={(e) => toggledislikevideo(e, vv.Like)}>
          {dislikebtn ? (
            <AiFillDislike size={22} className='btns_videoPage' />
          ) : (
            <AiOutlineDislike size={22} className='btns_videoPage' />
          )}
          <b>DISLIKE</b>
        </div>
        <div className="like_videoPage" onClick={togglesavedvideo}>
          {savevideo ? (
            <>
              <MdPlaylistAddCheck size={22} className='btns_videoPage' />
              <b>Saved</b>
            </>
          ) : (
            <>
              <RiPlayListAddFill size={22} className='btns_videoPage' />
              <b>Save</b>
            </>
          )}
        </div>
        <div className="like_videoPage">
          <>
            <RiHeartAddFill size={22} className="btns_videoPage" />
            <b>Thanks</b>
          </>
        </div>
        <div className="like_videoPage">
          <>
            <RiShareForwardLine size={22} className='btns_videoPage' />
            <b>Share</b>
          </>
        </div>
      </div>
    </div>
  );
};

export default Likewatchlatersavebtns;
