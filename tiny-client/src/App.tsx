import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useUserName from "@/hooks/useUserName.ts";
import { useNavigate, useParams } from "react-router";
import React, {useEffect, useRef, useState, useCallback} from "react";
import MessageComponent from "@/components/message.tsx";
import { io, Socket } from "socket.io-client";

interface Message {
    room: string;
    text: string;
    name: string;
    iid: string;
}

const server = import.meta.env.VITE_SERVER;
const socket: Socket = io(server);

export default function App() {
    const { room } = useParams();
    const userName = useUserName();
    const navigate = useNavigate();
    const [roomToGo, setRoomToGo] = useState<string>(room || "");
    const [messageToSend, setMessageToSend] = useState<string>("");
    const [messages, setMessages] = useState<Message[]>([]);
    const bottom = useRef<null | HTMLDivElement>(null);

    const listen = useCallback((message: Message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }, []);

    useEffect(() => {
        if (room) {
            socket.emit("join", room);
            setMessages([])
        }
    }, [room]);

    useEffect(() => {
        socket.on("talk", listen);

        return () => {
            socket.off("talk");
        };
    }, [listen]);

    useEffect(() => {
        requestAnimationFrame(() => {
            bottom.current?.scrollIntoView({ behavior: 'smooth' });
        });
        if(messages && messages.length > 50) {
            const newMessages = [...messages];
            newMessages.shift();
            setMessages(newMessages);
        }
    }, [messages]);

    const goToRoom = () => {
        navigate(`/${roomToGo}`);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, fn: () => void) => {
        if (event.key === 'Enter') {
            fn();
        }
    }

    const sendMessage = async () => {
        const iid = localStorage.getItem("iid") || "";
        if (!messageToSend || !room || !iid) return;

        const message: Message = { iid, text: messageToSend, name: userName, room };

        try {
            const response = await fetch(`${server}/send`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(message),
            });

            if (!response.ok) {
                console.error("Failed to send message:", await response.json());
            } else {
                setMessageToSend("");
            }
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <main className="h-screen w-screen p-20">
            <div className="flex flex-col w-full h-full border-2">
                <header className="flex items-center justify-between px-4 py-2 border-b">
                    <h1 className="text-lg font-semibold">Tiny Rooms</h1>
                    <h2 className="text-sm">{userName} (you)</h2>
                </header>
                <section className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <MessageComponent key={index} iid={message.iid} name={message.name} text={message.text}/>
                    ))}
                    <div ref={bottom} style={{margin: 0, height: 0}}/>
                </section>
                <footer className="flex items-center space-x-2 p-2 border-t">
                    <div className="flex items-center w-1/6">
                        <Input
                            value={roomToGo}
                            onChange={(e) => setRoomToGo(e.target.value)}
                            className="rounded-r-none border-r-0"
                            placeholder="Room"
                            onKeyDown={(e) => handleKeyDown(e, goToRoom)}
                            maxLength={5}
                        />
                        <Button variant="outline" className="rounded-l-none border-l-0" onClick={goToRoom}>
                            Go
                        </Button>
                    </div>
                    <Input
                        className="flex-1"
                        placeholder="Type a message"
                        value={messageToSend}
                        onChange={(e) => setMessageToSend(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, sendMessage)}
                        maxLength={200}
                    />
                    <Button variant="outline" onClick={sendMessage}>
                        Send
                    </Button>
                </footer>
            </div>
        </main>
    );
}