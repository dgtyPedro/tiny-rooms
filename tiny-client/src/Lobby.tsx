import {useNavigate} from "react-router";

export default function Lobby() {
    const navigate = useNavigate();
    const enterRoom = () => {
        navigate((Math.random() + 1).toString(36).substring(7));
    }
    return (
        <main className="h-full w-screen flex flex-col items-center justify-centerxw">
            <button onClick={enterRoom}>Enter</button>
        </main>
    );
}
