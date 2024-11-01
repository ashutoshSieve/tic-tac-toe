import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Board from "../Board";

function Game() {
    const location = useLocation();
    const { users } = location.state || { users: [] };
    const [winner, setWinner] = useState(null);

    const handleGameOver = (winner) => {
        setWinner(winner);
    };

    return (
        <div className="game-container">
            <h2 className="game-title">Participants</h2>
            <ul className="participants-list">
                {users.map((user, index) => (
                    <h3 className="participant-item" key={index}>{user.name}</h3>
                ))}
            </ul>
            {winner && <div className="winner-message">Winner: {winner}</div>}
            <Board onGameOver={handleGameOver} />
        </div>
    );
}

export default Game;
