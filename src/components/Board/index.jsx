import React, { useEffect, useState } from "react";
import "./style.css";
import Block from "../Block";
import io from "socket.io-client";

const socket = io("http://localhost:3001", {
    transports: ["websocket"],
});

function Board({ onGameOver }) {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [turn, setTurn] = useState("X");
    const [winner, setWinner] = useState(null);

    const isWin = (Arr) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        return winningCombinations.some(
            ([a, b, c]) => Arr[a] && Arr[a] === Arr[b] && Arr[a] === Arr[c]
        );
    };

    useEffect(() => {
        socket.on("updateBoard", ({ board, turn }) => {
            setBoard(board);
            setTurn(turn);
            setWinner(null);
        });
        
        socket.on("gameOver", ({ winner, board }) => {
            setWinner(winner);
            setBoard(board);
            onGameOver(winner);

            setTimeout(() => {
                resetGame();
            }, 4000);
        });

        return () => {
            socket.off("updateBoard");
            socket.off("gameOver");
        };
    }, []);

    const handleMove = (index) => {
        if (board[index] !== null || winner) return;
    
        const copyBoard = [...board];
        copyBoard[index] = turn;
    
        if (isWin(copyBoard)) {
            setBoard(copyBoard);
            setWinner(turn);
            onGameOver(turn); 
            
            socket.emit("gameOver", { winner: turn, board: copyBoard });
            return;
        }
    
        setBoard(copyBoard);
        const nextTurn = turn === "X" ? "O" : "X";
        setTurn(nextTurn);
        socket.emit("playerMove", { board: copyBoard, turn: nextTurn });
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setTurn("X"); 
        setWinner(null); 
    };

    return (
        <div className="game">
            <div className="card">
                <div className="row">
                    <Block onClick={() => handleMove(0)} value={board[0]} />
                    <Block onClick={() => handleMove(1)} value={board[1]} />
                    <Block onClick={() => handleMove(2)} value={board[2]} />
                </div>
                <div className="row">
                    <Block onClick={() => handleMove(3)} value={board[3]} />
                    <Block onClick={() => handleMove(4)} value={board[4]} />
                    <Block onClick={() => handleMove(5)} value={board[5]} />
                </div>
                <div className="row">
                    <Block onClick={() => handleMove(6)} value={board[6]} />
                    <Block onClick={() => handleMove(7)} value={board[7]} />
                    <Block onClick={() => handleMove(8)} value={board[8]} />
                </div>
            </div>
            {winner && <div className="winner-message">Winner: {winner}</div>}
        </div>
    );
}

export default Board;
