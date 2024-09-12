import { combineReducers } from "redux";
import authreducer from "./auth";
import currentuserreducer from "./currentuser";
import channelreducer from './channel'
import videoreducer from './video'
import likedvideoreducer from "./likedvideo";
import historyreducer from "./history";
import commentreducer from "./comment";
import watchlaterreducer from "./watchlater";
import themereducer from "./theme";
import pointreducer from "./userpoints";
import usersreducer from "./users";
import groupreducer from "./group";
import messagereducer from "./message";
import activeuserreducer from "./activeusers";
import otpreducer from "./Otp";
const rootreducer = combineReducers({
    authreducer,
    currentuserreducer,
    channelreducer,
    videoreducer,
    likedvideoreducer,
    historyreducer,
    commentreducer,
    watchlaterreducer,
    themereducer,
    pointreducer,
    usersreducer,
    groupreducer,
    messagereducer,
    activeuserreducer,
    otpreducer
})
export default rootreducer