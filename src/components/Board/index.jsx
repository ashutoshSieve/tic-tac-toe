import React, { useEffect } from "react";
import "./style.css";
import Block from "../Block";

function Board({ board, onMove, turn }) {
    
    const isWin = (Arr) => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombinations.some(([a, b, c]) => 
            Arr[a] && Arr[a] === Arr[b] && Arr[a] === Arr[c]
        );
    };

    const handleMove = (index) => {
        if (board[index] || isWin(board)) {
            return;
        }
        onMove(index);
    };

    useEffect(() => {
        if (isWin(board)) {
            setTimeout(() => {
                alert(`Congratulations ${turn === "X" ? "O" : "X"} wins!`);
            }, 0);
        }
    }, [board, turn]);

    return (
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
    );
}

export default Board;
