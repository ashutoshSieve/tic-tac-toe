import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import Board from "../Board";

function Game() {
    
    const location = useLocation();
    const { users } = location.state || { users: [] };
    const [ws, setWs] = useState(null);
    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState('X');

    useEffect(() => {
        const webSocket = new WebSocket('wss://backend-sw6b.onrender.com/'); 

        webSocket.onopen = () => {
            webSocket.send(JSON.stringify({ type: 'join', roomId: 'room1' }));
        };

        webSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            switch (data.type) {
                case 'joined':
                    console.log(`Joined room: ${data.roomId}`);
                    break;

                case 'update':
                    setBoard(data.board);
                    setTurn(data.turn);
                    break;

                default:
                    break;
            }
        };

        setWs(webSocket);

        return () => {
            webSocket.close();
        };
    }, []);

    const makeMove = (index) => {
        if (board[index] === null) {
            ws.send(JSON.stringify({ type: 'move', index }));
        }
    };


    return (
        <div className="game-container">
            <h2 className="game-title">Participants</h2>
            <ul className="participants-list">
                {users.map((user, index) => (
                    <h3 className="participant-item" key={index}>{user.name}</h3>
                ))}
            </ul>
            <Board 
            board={board} 
            onMove={makeMove} 
            turn={turn} 
            users={users}
            setBoard={setBoard}
            setTurn={setTurn}
             />
        </div>
    );
}

export default Game;