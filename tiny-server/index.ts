import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";

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

io.on("connection", (socket: Socket) => {
    socket.on("join_room", (room: string) => {
        socket.join(room);
    });

    socket.on("send_message", (data: Message) => {
        const { iid, text, name, room } = data;

        if (!iid || !text || !room || !name) {
            return;
        }

        if (room.length > 5 || text.length > 200) {
            return;
        }

        const message: Message = { iid, text, name, room };
        io.to(room).emit("receive_message", message);
    });

    // socket.on("disconnect", () => {
    //     console.log(`User disconnected: ${socket.id}`);
    // });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Hello world! Running on port: ${PORT}`);
});
