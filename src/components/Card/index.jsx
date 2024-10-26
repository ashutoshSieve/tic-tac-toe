import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Card(props) {
    const navigate = useNavigate();

    const handleSubmit = (e)=>{
        e.preventDefault();
        const Data={
            Gname:props.name,
            Yname:e.target.Yname.value,
            password:e.target.pass.value
        };

        fetch("https://backend-sw6b.onrender.com/Enter", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Data),
        })
        .then((response) => response.json())
            .then((data) => {
                if (data.message === "User Verified" || data.message === "User Added to Group Successfully") {
                    navigate("/game", { state: { users: data.result.User } });
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => console.error('Error creating group:', error));
    };

    return (
        <div className="card" onSubmit={handleSubmit}>
            <h3 className="card-title">{props.name}</h3>
            <form className="card-form">
                <div className="form-group">
                    <label htmlFor="pass">Password:</label>
                    <input type="password" name="pass" id="pass" className="input" placeholder="Enter password" required />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Your Name:</label>
                    <input type="text" name="Yname" id="Yname" className="input" placeholder="Enter your name" required />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
}

export default Card;
