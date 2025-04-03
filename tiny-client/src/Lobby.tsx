import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function Lobby() {
    const navigate = useNavigate();

    const enterRoom = () => {
        navigate((Math.random() + 1).toString(36).substring(5).substring(0, 5));
    };

    return (
        <main className="h-full w-screen flex flex-col items-center justify-center">
            <Button variant="default" onClick={enterRoom}>
                Enter
            </Button>
        </main>
    );
}
