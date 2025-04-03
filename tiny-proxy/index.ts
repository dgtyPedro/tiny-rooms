import express, { Request } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { io as ClientIo } from "socket.io-client";

interface Message {
    iid: string;
    text: string;
    name: string;
    room: string;
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const socket = ClientIo("http://localhost:3000");

app.post("/send", (req: Request, res: any) => {
    console.log(req.ip)
    const { iid, text, name, room } = req.body as Message;

    if (!iid || !text || !room || !name) {
        return res.status(400).json({ error: "Invalid message format" });
    }

    if (room.length > 5 || text.length > 200) {
        return res.status(400).json({ error: "Message or room size exceeded" });
    }

    const message: Message = { iid, text, name, room };

    socket.emit("send_message", message);

    return res.json({ success: true, message: "Message sent via WebSocket" });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
    console.log(`Message API running on port: ${PORT}`);
});
