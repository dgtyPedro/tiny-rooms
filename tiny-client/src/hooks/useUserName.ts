import { useState, useEffect } from "react";

const adjectives = [
    "Swift", "Brave", "Clever", "Fierce", "Loyal", "Mighty", "Silent", "Witty", "Bold", "Noble",
    "Fearless", "Cunning", "Radiant", "Daring", "Vigilant", "Majestic", "Resilient", "Elegant", "Valiant", "Tenacious"
];

const nouns = [
    "Wolf", "Falcon", "Tiger", "Panther", "Eagle", "Fox", "Lion", "Raven", "Bear", "Cobra",
    "Jaguar", "Owl", "Bison", "Leopard", "Viper", "Hawk", "Griffin", "Puma", "Lynx", "Stallion"
];

const getOrCreateUUID = () => {
    let uuid = localStorage.getItem("iid");
    if (!uuid) {
        uuid = crypto.randomUUID();
        localStorage.setItem("iid", uuid);
    }
    return uuid;
};

const useUserName = (): string => {
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const uuid = getOrCreateUUID();

        const uuidParts = uuid.split("-");
        const adjectiveIndex = parseInt(uuidParts[0].slice(0, 2), 16) % adjectives.length; // Converter os dois primeiros caracteres para índice
        const nounIndex = parseInt(uuidParts[1].slice(0, 2), 16) % nouns.length; // Converter os dois primeiros caracteres para índice

        const generatedName = `${adjectives[adjectiveIndex]} ${nouns[nounIndex]}`;
        setUserName(generatedName);
    }, []);

    return userName;
};

export default useUserName;
