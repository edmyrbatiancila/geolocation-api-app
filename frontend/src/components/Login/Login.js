import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { users } from "../../userSeeder";
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const user = users.find((user) => user.email === email && user.password === password);

        if(user) {
            history("/home");
        } else {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="login" style={{ padding: "20px" }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label for="email">Email:</label>
                    <input id="email" value={email} type="email" onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input id="password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;