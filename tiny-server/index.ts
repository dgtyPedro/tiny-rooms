import express, {Request, Response} from "express";
import {createServer} from "http";
import {Server, Socket} from "socket.io";
import cors from "cors";
import 'dotenv/config'

interface Message {
    iid: string;
    text: string;
    name: string;
    room: string;
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {cors: {origin: "*"}});

app.use(cors());
app.use(express.json());

io.on("connection", (socket: Socket) => {
    socket.on("join", (room: string) => {
        socket.join(room);
    });
});

app.get("/ping", (req: Request, res: Response) => {
    return res.send({success: true, message: `pong, ${req.ip}.`});
})

app.post("/send", (req: Request, res: Response) => {
    const {iid, text, name, room} = req.body as Message;

    if (!iid || !text || !room || !name) {
        return res.status(400).json({error: "Invalid message format"});
    }

    if (room.length > 5 || text.length > 200) {
        return res.status(400).json({error: "Message or room size exceeded"});
    }

    const message: Message = {iid, text, name, room};

    io.to(room).emit("talk", message);

    return res.json({success: true, message: `Copy that.`});
});

const port = process.env.PORT;
httpServer.listen(port, () => {
    console.log(`Message API running on port: ${port}`);
});
