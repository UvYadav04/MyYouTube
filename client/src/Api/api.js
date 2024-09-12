import axios from 'axios'
const API = axios.create({ baseURL: "http://localhost:3000" })

API.interceptors.request.use((req) => {

    if (localStorage.getItem("Profile")) {
        req.headers.authorisation = `Bearer ${JSON.parse(localStorage.getItem("Profile")).token}`
    }
    return req;
})

export const sendotp = ({ email }) => API.post('/user/sendotp', { email: email })

export const login = (authdata) => API.post('/user/login', authdata)
export const updatechannel = (id, data) => API.patch(`/user/update/${id}`, data)
export const fetchchannel = () => API.get('/user/fetchallchannels')
export const checkvalidity = (id) => API.patch('/user/checkvalidity', id)
export const checkpoints = (data) => API.patch('/user/checkpoints', data)
export const getallusers = () => API.get('/user/getusers')
export const getactiveusers = () => API.get('/user/activeusers')

export const uploadvideo = (filedata, fileoption) => API.post('/video/uploadvideo', filedata, fileoption)
export const getvideos = () => API.get("/video/getvideos");
export const likevideo = (id, Like) => API.patch(`/video/like/${id}`, { Like });
export const viewsvideo = (id) => API.patch(`/video/view/${id}`);

export const postcomment = (commentdata) => API.post('/comment/post', commentdata)
export const deletecomment = (id) => API.delete(`/comment/delete/${id}`)
export const editcomment = (id, commentbody) => API.patch(`/comment/edit/${id}`, { commentbody })
export const getallcomment = () => API.get('/comment/get')

export const addtohistory = (historydata) => API.post("/video/history", historydata)
export const getallhistory = () => API.get('/video/getallhistory')
export const deletehistory = (userid) => API.delete(`/video/deletehistory/${userid}`)

export const addtolikevideo = (likedvideodata) => API.post('/video/likevideo', likedvideodata)
export const getalllikedvideo = () => API.get('/video/getalllikevide')
export const deletelikedvideo = (videoid, viewer) => API.delete(`/video/deletelikevideo/${videoid}/${viewer}`)

export const addtowatchlater = (watchlaterdata) => API.post('/video/watchlater', watchlaterdata)
export const getallwatchlater = () => API.get('/video/getallwatchlater')
export const deletewatchlater = (videoid, viewer) => API.delete(`/video/deletewatchlater/${videoid}/${viewer}`)


export const newgroup = (data) => API.post('/groups/newgroup', data)
export const fetchallgroups = () => API.get('/groups/fetchallgroups')

export const updateMessage = (data) => API.patch('/messages/update', data)
export const fetchallmessage = () => API.get('/messages/allmessages')

export const upgradeplan = (plan, id) => API.patch(`/user/upgradeplan`, { plan, id })