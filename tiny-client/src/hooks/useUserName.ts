import {useState, useEffect} from "react";

const adjectives = [
    "Swift", "Brave", "Clever", "Fierce", "Loyal", "Mighty", "Silent", "Witty", "Bold", "Noble",
    "Fearless", "Cunning", "Radiant", "Daring", "Vigilant", "Majestic", "Resilient", "Elegant", "Valiant", "Tenacious",
    "Agile", "Furious", "Epic", "Stealthy", "Shrewd", "Glorious", "Thunderous", "Serene", "Invincible", "Mystic",
    "Ferocious", "Nimble", "Stalwart", "Heroic", "Dominant", "Merciless", "Regal", "Unyielding", "Gallant", "Elusive",
    "Dauntless", "Determined", "Astute", "Vengeful", "Luminous", "Imperial", "Prudent", "Audacious", "Persistent", "Stoic",
    "Sagacious", "Versatile", "Fearsome", "Tactical", "Indomitable", "Resolute", "Pioneering", "Masterful", "Tenebrous", "Virtuous",
    "Spectral", "Formidable", "Seraphic", "Zealous", "Ethereal", "Unbreakable", "Arcane", "Boundless", "Phantom", "Celestial",
    "Eccentric", "Enigmatic", "Omniscient", "Adept", "Mysterious", "Zephyr", "Unstoppable", "Steadfast", "Fabled", "Transcendent",
    "Perceptive", "Invigorated", "Energetic", "Glacial", "Runic", "Altruistic", "Unconquered", "Reckless", "Empowered", "Otherworldly",
    "Sinister", "Enchanted", "Sovereign", "Ingenious", "Vortex", "Miraculous", "Torrential", "Lustrous", "Spectacular", "Euphoric"
];

const nouns = [
    "Wolf", "Falcon", "Tiger", "Panther", "Eagle", "Fox", "Lion", "Raven", "Bear", "Cobra",
    "Jaguar", "Owl", "Bison", "Leopard", "Viper", "Hawk", "Griffin", "Puma", "Lynx", "Stallion",
    "Dragon", "Kraken", "Phoenix", "Shark", "Tornado", "Cyclone", "Scorpion", "Gladiator", "Samurai", "Sentinel",
    "Warrior", "Titan", "Golem", "Sphinx", "Gryphon", "Centaur", "Wraith", "Specter", "Paladin", "Sorcerer",
    "Knight", "Assassin", "Valkyrie", "Rogue", "Champion", "Druid", "Monarch", "Behemoth", "Wyvern", "Nemesis",
    "Manticore", "Basilisk", "Chimera", "Pegasus", "Reaper", "Wizard", "Overlord", "Jester", "Colossus", "Invoker",
    "Archmage", "Predator", "Hurricane", "Frost", "Inferno", "Zeppelin", "Titanium", "Comet", "Starfire", "Shadow",
    "Ghost", "Nebula", "Quasar", "Storm", "Void", "Blackhole", "Meteor", "Striker", "Thunder", "Blizzard",
    "Avalanche", "Nomad", "Seeker", "Wanderer", "Oracle", "Prophet", "Sage", "Lurker", "Juggernaut", "Guardian",
    "Crusader", "Raider", "Tempest", "Destroyer", "Mastermind", "Arbiter", "Vanquisher", "Executioner", "Protector", "Ranger"
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
        const adjectiveIndex = parseInt(uuidParts[0].slice(0, 2), 16) % adjectives.length;
        const nounIndex = parseInt(uuidParts[1].slice(0, 2), 16) % nouns.length;

        const generatedName = `${adjectives[adjectiveIndex]} ${nouns[nounIndex]}`;
        setUserName(generatedName);
    }, []);

    return userName;
};

export default useUserName;
