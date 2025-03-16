import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import Lobby from "@/Lobby.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Lobby/>}/>
                <Route path="/:room" element={<App/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
