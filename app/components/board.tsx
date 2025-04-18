"use client";
import React, {useState} from 'react';
import {Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Info} from 'lucide-react';

const MonopolyBoard = () => {
    const [dice1, setDice1] = useState(1);
    const [dice2, setDice2] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [players, setPlayers] = useState([
        {id: 0, name: "Player 1", position: 0, color: "red", money: 1500},
        {id: 1, name: "Player 2", position: 0, color: "blue", money: 1500},
        {id: 2, name: "Player 3", position: 0, color: "green", money: 1500},
        {id: 3, name: "Player 4", position: 0, color: "orange", money: 1500}
    ]);

    // Define the board spaces
    const boardSpaces = [
        {id: 0, name: "GO", color: "white", type: "corner"},
        {id: 1, name: "Mediterranean Ave", price: "$60", color: "brown", type: "property"},
        {id: 2, name: "Community Chest", price: "", color: "white", type: "chest"},
        {id: 3, name: "Baltic Ave", price: "$60", color: "brown", type: "property"},
        {id: 4, name: "Income Tax", price: "Pay $200", color: "white", type: "tax"},
        {id: 5, name: "Reading Railroad", price: "$200", color: "black", type: "railroad"},
        {id: 6, name: "Oriental Ave", price: "$100", color: "lightblue", type: "property"},
        {id: 7, name: "Chance", price: "", color: "white", type: "chance"},
        {id: 8, name: "Vermont Ave", price: "$100", color: "lightblue", type: "property"},
        {id: 9, name: "Connecticut Ave", price: "$120", color: "lightblue", type: "property"},
        {id: 10, name: "JAIL", color: "white", type: "corner"},
        {id: 11, name: "St. Charles Place", price: "$140", color: "purple", type: "property"},
        {id: 12, name: "Electric Company", price: "$150", color: "white", type: "utility"},
        {id: 13, name: "States Ave", price: "$140", color: "purple", type: "property"},
        {id: 14, name: "Virginia Ave", price: "$160", color: "purple", type: "property"},
        {id: 15, name: "Pennsylvania Railroad", price: "$200", color: "black", type: "railroad"},
        {id: 16, name: "St. James Place", price: "$180", color: "orange", type: "property"},
        {id: 17, name: "Community Chest", price: "", color: "white", type: "chest"},
        {id: 18, name: "Tennessee Ave", price: "$180", color: "orange", type: "property"},
        {id: 19, name: "New York Ave", price: "$200", color: "orange", type: "property"},
        {id: 20, name: "FREE PARKING", color: "white", type: "corner"},
        {id: 21, name: "Kentucky Ave", price: "$220", color: "red", type: "property"},
        {id: 22, name: "Chance", price: "", color: "white", type: "chance"},
        {id: 23, name: "Indiana Ave", price: "$220", color: "red", type: "property"},
        {id: 24, name: "Illinois Ave", price: "$240", color: "red", type: "property"},
        {id: 25, name: "B&O Railroad", price: "$200", color: "black", type: "railroad"},
        {id: 26, name: "Atlantic Ave", price: "$260", color: "yellow", type: "property"},
        {id: 27, name: "Ventnor Ave", price: "$260", color: "yellow", type: "property"},
        {id: 28, name: "Water Works", price: "$150", color: "white", type: "utility"},
        {id: 29, name: "Marvin Gardens", price: "$280", color: "yellow", type: "property"},
        {id: 30, name: "GO TO JAIL", color: "white", type: "corner"},
        {id: 31, name: "Pacific Ave", price: "$300", color: "green", type: "property"},
        {id: 32, name: "North Carolina Ave", price: "$300", color: "green", type: "property"},
        {id: 33, name: "Community Chest", price: "", color: "white", type: "chest"},
        {id: 34, name: "Pennsylvania Ave", price: "$320", color: "green", type: "property"},
        {id: 35, name: "Short Line", price: "$200", color: "black", type: "railroad"},
        {id: 36, name: "Chance", price: "", color: "white", type: "chance"},
        {id: 37, name: "Park Place", price: "$350", color: "blue", type: "property"},
        {id: 38, name: "Luxury Tax", price: "Pay $100", color: "white", type: "tax"},
        {id: 39, name: "Boardwalk", price: "$400", color: "blue", type: "property"}
    ];

    // Dice component
    const DiceComponent = ({value}: { value: number }) => {
        const DiceIcons = [<Dice1 key={1}/>, <Dice2 key={2}/>, <Dice3 key={3}/>, <Dice4 key={4}/>, <Dice5 key={5}/>,
            <Dice6 key={6}/>];
        return (
            <div className="bg-white p-2 rounded-lg shadow-md h-12 w-12 flex items-center justify-center">
                {DiceIcons[value - 1]}
            </div>
        );
    };

    // Roll dice function
    const rollDice = () => {
        if (isRolling) return;

        setIsRolling(true);

        // Simulate dice animation
        const rollInterval = setInterval(() => {
            setDice1(Math.floor(Math.random() * 6) + 1);
            setDice2(Math.floor(Math.random() * 6) + 1);
        }, 100);

        // Stop rolling after 1 second
        setTimeout(() => {
            clearInterval(rollInterval);
            const finalDice1 = Math.floor(Math.random() * 6) + 1;
            const finalDice2 = Math.floor(Math.random() * 6) + 1;
            setDice1(finalDice1);
            setDice2(finalDice2);

            // Move player
            movePlayer(finalDice1 + finalDice2);

            setIsRolling(false);
        }, 1000);
    };

    // Move player function
    const movePlayer = (steps: number) => {
        const playersCopy = [...players];
        const player = playersCopy[currentPlayer];

        // Calculate new position
        let newPosition = (player.position + steps) % 40;

        // Check if passing GO
        if (newPosition < player.position) {
            playersCopy[currentPlayer].money += 200;
        }

        // Special case: Go to Jail
        if (newPosition === 30) {
            newPosition = 10;
        }

        // Update player position
        playersCopy[currentPlayer].position = newPosition;
        setPlayers(playersCopy);

        // Next player's turn
        setCurrentPlayer((currentPlayer + 1) % players.length);
    };

    // Helper function to get color for property cards
    const getPropertyColor = (color: string) => {
        const colorMap: Record<string, string> = {
            "brown": "bg-amber-950",
            "lightblue": "bg-sky-300",
            "purple": "bg-purple-500",
            "orange": "bg-orange-500",
            "red": "bg-red-600",
            "yellow": "bg-yellow-400",
            "green": "bg-green-600",
            "blue": "bg-blue-800",
            "black": "bg-gray-800",
            "white": "bg-white"
        };
        return colorMap[color] || "bg-white";
    };

    // Helper function to get player token color
    const getPlayerTokenColor = (color: string) => {
        const colorMap: Record<string, string> = {
            "red": "bg-red-600",
            "blue": "bg-blue-600",
            "green": "bg-green-600",
            "orange": "bg-orange-500"
        };
        return colorMap[color] || "bg-gray-500";
    };

    // Get space orientation based on position
    const getSpaceOrientation = (index: number) => {
        if (index >= 0 && index <= 9) return "bottom";
        if (index >= 10 && index <= 19) return "left";
        if (index >= 20 && index <= 29) return "top";
        return "right";
    };

    // Render spaces for each section
    const renderSpaces = () => {
        // Create an array of all spaces with their positions
        return boardSpaces.map((space, index) => {
            const isCorner = space.type === "corner";
            const position = getSpaceOrientation(index);

            // Determine players on this space
            const playersOnSpace = players.filter(player => player.position === index);

            // Determine orientation based on position
            let orientationClass: string;
            let colorBarClass = "";

            switch (position) {
                case "bottom":
                    orientationClass = "flex-col";
                    colorBarClass = "w-full h-6";
                    break;
                case "left":
                    orientationClass = "flex-row";
                    colorBarClass = "h-full w-6";
                    break;
                case "top":
                    orientationClass = "flex-col-reverse";
                    colorBarClass = "w-full h-6";
                    break;
                case "right":
                    orientationClass = "flex-row-reverse";
                    colorBarClass = "h-full w-6";
                    break;
                default:
                    orientationClass = "flex-col";
            }

            if (isCorner) {
                // Render corner space
                let rotation = 0;
                if (index === 10) rotation = 90;
                if (index === 20) rotation = 180;
                if (index === 30) rotation = 270;

                return (
                    <div
                        key={`corner-${index}`}
                        className="border border-gray-400 h-24 w-24 flex flex-col justify-center items-center relative"
                    >
                        <div
                            className={`font-bold text-sm text-center p-2 ${rotation > 0 ? `rotate-${rotation}` : ""}`}>
                            {space.name}
                        </div>

                        {/* Player tokens */}
                        <div className="absolute bottom-1 right-1 flex flex-wrap max-w-12 gap-1">
                            {playersOnSpace.map(player => (
                                <div
                                    key={`token-${player.id}-${index}`}
                                    className={`${getPlayerTokenColor(player.color)} h-4 w-4 rounded-full border border-black`}
                                    title={player.name}
                                />
                            ))}
                        </div>
                    </div>
                );
            } else {
                // Render regular space
                return (
                    <div
                        key={`space-${index}`}
                        className={`border border-gray-400 flex ${orientationClass} overflow-hidden relative ${position === "left" || position === "right" ? "h-16 w-24" : "h-24 w-16"}`}
                    >
                        {space.color !== "white" && (
                            <div className={`${getPropertyColor(space.color)} ${colorBarClass}`}></div>
                        )}
                        <div className="flex-1 flex flex-col justify-center items-center p-1 text-center">
                            <div
                                className={`text-xs font-bold ${position === "top" || position === "right" ? "rotate-180" : ""}`}>
                                {space.name}
                            </div>
                            {space.price && (
                                <div
                                    className={`text-xs ${position === "top" || position === "right" ? "rotate-180" : ""}`}>
                                    {space.price}
                                </div>
                            )}
                        </div>

                        {/* Player tokens */}
                        <div className="absolute bottom-1 right-1 flex flex-wrap max-w-12 gap-1">
                            {playersOnSpace.map(player => (
                                <div
                                    key={`token-${player.id}-${index}`}
                                    className={`${getPlayerTokenColor(player.color)} h-4 w-4 rounded-full border border-black`}
                                    title={player.name}
                                />
                            ))}
                        </div>
                    </div>
                );
            }
        });
    };

    // Arrange spaces in the correct order
    const bottomRow = renderSpaces().slice(0, 11);
    const leftColumn = renderSpaces().slice(11, 20);
    const topRow = renderSpaces().slice(20, 31);
    const rightColumn = renderSpaces().slice(31, 40);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">MONOPOLY</h1>

            {/* Player info */}
            <div className="w-full max-w-4xl mb-4 flex flex-wrap justify-center gap-4">
                {players.map((player, index) => (
                    <div
                        key={`player-info-${player.id}`}
                        className={`p-2 rounded-lg shadow-md ${index === currentPlayer ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className={`${getPlayerTokenColor(player.color)} h-6 w-6 rounded-full border border-black`}></div>
                            <div>
                                <div className="font-bold">{player.name}</div>
                                <div className="text-sm">${player.money}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Dice and roll button */}
            <div className="mb-4 flex gap-4 items-center">
                <DiceComponent value={dice1}/>
                <DiceComponent value={dice2}/>
                <button
                    onClick={rollDice}
                    disabled={isRolling}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
                >
                    {isRolling ? "Rolling..." : "Roll Dice"}
                </button>
                <div className="text-lg font-bold">
                    {dice1 + dice2}
                </div>
            </div>

            {/* Board */}
            <div className="bg-green-100 p-4 rounded-lg shadow-lg">
                <div className="flex">
                    {/* Top row */}
                    {topRow.reverse()}
                </div>

                <div className="flex">
                    {/* Left column */}
                    <div className="flex flex-col">
                        {leftColumn.reverse()}
                    </div>

                    {/* Center area */}
                    <div className="h-full w-full flex justify-center items-center p-6">
                        <div className="rotate-45 text-4xl font-bold text-red-600">MONOPOLY</div>
                    </div>

                    {/* Right column */}
                    <div className="flex flex-col">
                        {rightColumn}
                    </div>
                </div>

                <div className="flex">
                    {/* Bottom row */}
                    {bottomRow}
                </div>
            </div>

            <div className="mt-4 flex items-center text-sm text-gray-600">
                <Info size={16} className="mr-1"/>
                Roll the dice to move your player token around the board
            </div>
        </div>
    );
};

export default MonopolyBoard;