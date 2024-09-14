const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const userroute = require('./routes/user')
const videoroute = require('./routes/video')
const commentroute = require('./routes/comment')
const grouproute = require('./routes/group')
const messageroute = require('./routes/messages')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require("http")
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser')
dotenv.config()
const port = process.env.PORT
const path = require('path')


let emailtosocket = new Map()
let sockettoemail = new Map()
let emailtopeer = new Map()
let activeusers = []

const server = http.createServer(app)
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("database connected")
    })
    .catch((error) => {
        console.log("error : ", error)
    })


const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PATCH", "DELETE"],
    },
    transports: ['websocket'],
    cookie: true,
    // allowEIO3: true
})


io.use((socket, next) => {
    const req = socket.request
    cookieParser()(req, null, () => {
        next();
    });
})

app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(express.json({ limit: "30mb", extended: true }))
app.use(
    cors({
        origin: "*",
        credentials: true
    })
)


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,Accept,X-Requested-With,Content-Type,authorisation');
    res.setHeader('Access-Control-Allow-Credentials', true);
    req.io = io
    next();
})

app.use(('/user'), (req, res, next) => {
    if (req.body.peerId) {
        emailtopeer.set(req.body.email, req.body.peerId)
    }
    next()
})


app.use('/user', (req, res, next) => [
    req.activeusers = activeusers,
    next()
])

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.get('/', (req, res) => {
    res.send("welcome to backend")
})

app.use('/user', userroute)
app.use('/video', videoroute)
app.use('/comment', commentroute)
app.use('/groups', grouproute)
app.use('/messages', messageroute)

// ***********************************************************




io.on("connection", async (socket) => {
    // console.log(`new user connected : ${socket.id} `)
    socket.on('connectuser', (data) => {
        // console.log(`new data : `, data)
        let found = false;
        activeusers.forEach((user) => {
            if (user._id === data._id) {
                // console.log('fournd for :', data)
                found = true;
            }
        })
        if (!found)
            activeusers.push(data)
        // console.log(activeusers)
        emailtosocket.set(data.email, socket.id)
        sockettoemail.set(socket.id, data.email)
        // console.log(emailtosocket, sockettoemail)
    })
    socket.on('connectgroup', (data) => { socket.join(data.name) })
    socket.on("send message", (data) => io.to(data.roomname).emit('receive', { message: data.message, sender: data.sender, roomname: data.roomname }))

    // *****************videocalling**************
    socket.on("VideoCall", ({ from, to }) => io.to(emailtosocket.get(to.email)).emit("receive_call", { from: { username: from.username, email: from.email } }))
    socket.on("call_accepted", ({ to, from, peerId }) => {
        io.to(emailtosocket.get(to.email)).emit("call_accepted", { from: { username: from.username, email: from.email }, peerId })
    })
    socket.on("call_rejected", ({ to }) => {
        io.to(emailtosocket.get(to.email)).emit("call_rejected")
    })

    socket.on("endcall", ({ selected }) => {
        // console.log(selected)
        io.to(emailtosocket.get(selected.email)).emit("endcall")
    })

    socket.on("mistake", ({ to }) => {
        io.to(emailtosocket.get(to.email)).emit("mistake")
    })


    socket.on('disconnecting', () => activeusers = activeusers.filter(user => user.email !== sockettoemail.get(socket.id)))
    socket.on('disconnect', (reason) => console.log(`user disconnected : ${socket.id} due to : ${reason} `))
})


server.listen(port, () => {
    console.log(`listening on port ${port}`)
})