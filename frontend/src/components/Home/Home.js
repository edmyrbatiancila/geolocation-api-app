import React, { useState, useEffect } from 'react';
import './Home.css'

const Home = () => {
    const [currentIp, setCurrentIp] = useState("");
    const [geoInfo, setGeoInfo] = useState(null);
    const [newIp, setNewIp] = useState("");
    const [history, setHistory] = useState([]);
    const [error, setError] = useState("");

    const fetchGeoInfo = async(ip) => {
        try {
            const response = await fetch(`https://ipinfo.io/${ip}?token=c51b50a51d611d`);
            const data = await response.json();

            if(data.error) {
                throw new Error(data.error.message);
            }

            setGeoInfo(data);
            setHistory((prevHistory) => [...prevHistory, ip]);
            setError("");
        } catch (err) {
            setError("Invalid IP Address or fetch error!");
        }
    };

    useEffect(() => {
        const getCurrentIp = async() => {
            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();

                setCurrentIp(data.ip);
                fetchGeoInfo(data.ip);
            } catch (err) { 
                setError("Could not fetch current IP!");
            }
        };

        getCurrentIp();
    },[]);

    const handleIPSubmit = (e) => {
        e.preventDefault();
        const ipPattern = /^(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}$/;

        if (!ipPattern.test(newIp)) {
        setError("Please enter a valid IP address.");
        return;
        }

        fetchGeoInfo(newIp);
        setNewIp("");
    };

    const handleHistoryClick = (ip) => {
        fetchGeoInfo(ip);
    }

    return (
        <div className='home'>
            <h2>Welcome Home</h2>
            <h4>Your current IP: {currentIp}</h4>
            {geoInfo && (
                <div>
                    <h5>Geolocation Information</h5>
                    <p><strong>IP:</strong>{geoInfo.ip}</p>
                    <p><strong>City:</strong>{geoInfo.city}</p>
                    <p><strong>Region:</strong>{geoInfo.region}</p>
                    <p><strong>Country:</strong>{geoInfo.country}</p>
                    <p><strong>Location:</strong>{geoInfo.loc}</p>
                    <p><strong>Organization:</strong>{geoInfo.org}</p>
                </div>
            )}
            <form onSubmit={handleIPSubmit}>
                <input 
                    type='text'
                    value={newIp}
                    onChange={(e) => setNewIp(e.target.value)}
                    placeholder='Enter new IP address'
                    required
                />
                <button type='submit'>Get Geo Info</button>
            </form>
            {error && <p className='error'>{error}</p>}
            <h5>Search History:</h5>
            <ul>
                {history.map((ip, index) => (
                    <li className='history' key={index} onClick={() => handleHistoryClick(ip)}>{ip}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;