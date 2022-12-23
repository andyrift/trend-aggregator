if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }

const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const passport = require("passport");

const cors = require('cors');
const helmet = require("helmet");
const socketio = require('socket.io');
const mongoose = require('mongoose');

const http = require('http');
const express = require('express');
const morgan = require('morgan');

require("./auth/passportGoogleSSO");
const middleware = require("./middleware");
const api = require("./api");

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true
    }
});

app.disable('etag');

app.use(express.static('../public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

const session = cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [process.env.COOKIE_KEY] });

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));

mongoose.set('strictQuery', false);

doMakeComment = async (req, res) => {
    if(req.user) {
        var Post = require('./models/post');
        var Comment = require('./models/comment');

        post = await Post.findById(req.msg.post_id);
        if(post && req.msg.message && req.msg.message.length) {
            const comment = new Comment({
                user_id: req.user._id,
                post_id: post._id,
                message: req.msg.message,
                picture: req.user.picture,
                displayName: req.user.displayName,
            });
            comment.save()
                .then(comment => {
                    io.to(comment.post_id).emit('message', comment);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
}

io.on('connection', socket => {
    let cookieString = socket.request.headers.cookie;

    let req = {connection: {encrypted: false}, headers: {cookie: cookieString}}
    let res = {getHeader: () =>{}, setHeader: () => {}};

    session(req, res, () => {
        passport.initialize()(req, res, () => {
            passport.session()(req, res, () => {
                socket.on('joinComments', ({ id }) => {
                    socket.join(id);
                });
                socket.on('chatMessage', msg => {
                    req.msg = msg;
                    doMakeComment(req, res);                    
                });
            })
        })
    }) 
})

app.use(middleware.throttle);
app.use("/api/v1", api);
app.get("/", (req, res) => {
    res.send("welcome");
})

app.use(middleware.notFound)

init = (port) => {
    console.log("Starting server...")
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        console.log('Connected to MongoDB');
        require.main.MDBclient = client;
        server.listen(port, () => {
            console.log(`Listening: http://localhost:${port}`);
        });
    })
    .catch(err => console.error(err));
}

module.exports = { init };
