import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Card from "../Card";

function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('https://backend-sw6b.onrender.com/', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.users) {
                    setData(data.users);
                }
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const groupData = {
            Gname: e.target.Gname.value,
            Yname: e.target.Yname.value,
            password: e.target.password.value,
        };

        fetch('https://backend-sw6b.onrender.com/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(groupData),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.message === "Group Created Successfully") {
                    navigate("/game",{ state: { users: data.Data } });
                } else {
                    alert(data.message);
                }
            })
            .catch((error) => console.error('Error creating group:', error));
    };

    return (
        <div className="container">
            <h1 className="title">Create Group</h1>
            <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Gname">Group Name:</label>
                    <input type="text" name="Gname" id="Gname" className="input" placeholder="Enter group name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="Yname">Your Name:</label>
                    <input type="text" name="Yname" id="Yname" className="input" placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" className="input" placeholder="Enter password" required />
                </div>
                <button type="submit" className="submit-button">Create</button>
            </form>

            <div className="cards-container">
                {data.map((item, index) => (
                    <Card key={index} name={item} />
                ))}
            </div>
        </div>
    );
}

export default Home;
