import React, { useState, useEffect } from "react";
import "./style.css";
import Block from "../Block";

function Board({ board, onMove, turn, users, setBoard, setTurn }) {
    const [showModal, setShowModal] = useState(false);
    const [winner, setWinner] = useState("");

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

    const resetGame = () => {
        setBoard(Array(9).fill(null)); // Reset the board to empty
        setTurn('X'); // Reset the turn to player X
        setShowModal(false); // Close the modal
        setWinner(""); // Clear the winner name
    };

    const closeModal = () => {
        resetGame(); // Reset the game state and close the modal
    };

    useEffect(() => {
        if (isWin(board)) {
            const currentWinner = turn === "X" ? users[1].name : users[0].name;
            setWinner(currentWinner); // Store the winner name
            setShowModal(true); // Show the modal
        }
    }, [board, turn, users]);

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

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Congratulations {winner}, you win!</h2>
                        <button onClick={closeModal}>Play Again</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Board;
