import express from 'express';
import { config } from "dotenv";
import cors from 'cors';
import bodyParser from 'body-parser';
import { connect } from "mongoose";
import http from "http"
import { Server } from "socket.io"
import passport from './middleware/auth.js';
import session from 'express-session';
import courses from "./routes/courseRoute.js"
import login from "./routes/login.js"
import register from "./routes/register.js"

const app = express();
config();
app.use(cors());
app.use(bodyParser.json());

app.use(
    session({
        secret: "Helloworld" || process.env.SECRET,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false,
    })
);

app.use(passport.initialize())

app.use(passport.session())

const PORT = process.env.PORT || 3000;

const dbCon = process.env.DB

connect(dbCon)
    .then((result) => {
        app.listen(PORT, () => {
            console.log(
                `Server Has Been Started on ${PORT} & DB is Connected Successfully`
            );
        });
    })
    .catch((err) => {
        console.log(`DB Connection Error ${err}`);
    });


app.use("/api", courses)
app.use("/api", login)
app.use("/api", register)

// WEB CHAT SOCKET

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
})

io.on('connection', (socket) => {
    socket.on("send-message", (message) => {
        console.log("message", message)
        io.emit("Received-message", message)

    })
    socket.on("disconnet", () => console.log("user disconnected"))

});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});