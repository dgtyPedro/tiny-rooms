import express, {Request} from "express";
import {createServer} from "http";
import {Server, Socket} from "socket.io";
import rateLimit from "express-rate-limit";
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

const rateLimiter = rateLimit({
    windowMs: 10 * 1000,
    limit: 50,
    message: { error: "Too many requests, please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket: Socket) => {
    socket.on("join", (room: string) => {
        socket.join(room);
    });
});

app.get("/", rateLimiter, (req: Request, res: any) => {
    return res.send({success: true, message: `Hello World.`});
})


app.get("/ping", rateLimiter, (req: Request, res: any) => {
    return res.send({success: true, message: `pong, ${req.ip}.`});
})

app.post("/send", rateLimiter, async (req: Request, res: any) => {
    try {
        const { iid, text, name, room } = req.body as Message;

        if (!iid || !text || !room || !name) {
            return res.status(400).json({ error: "Invalid message format" });
        }

        if (room.length > 5 || text.length > 200) {
            return res.status(400).json({ error: "Message or room size exceeded" });
        }

        const message: Message = { iid, text, name, room };

        io.to(room).emit("talk", message);

        return res.json({ success: true, message: `Copy that.` });
    } catch (err) {
        console.error("Error in /send:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
});


const port = process.env.PORT;

httpServer.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
