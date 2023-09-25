import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Teams() {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false);
        }, 1500)
        return () => {
            clearTimeout(loadingTimeout);
        }
    })
    const navigate = useNavigate();
    const handleLogout = () => {
        axios
            .get("http://localhost:8081/logout")
            .then((res) => {
                if (res.data.Status === "Success") {
                    navigate("/Login");
                } else {
                    console.error("Logout failed");
                }
            })
            .catch((err) => {
                console.error("Logout failed:", err);
            });
    };
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8081/getEmployee")
            .then((res) => {
                if (res.data.Status === "Success") {
                    setData(res.data.Result);
                } else {
                    alert("Error");
                }
            })
            .catch((err) => console.log(err));
    }, []);
    const teams = {};

    data.forEach((employee) => {
      if (!teams[employee.team]) {
        teams[employee.team] = [];
      }
      teams[employee.team].push(employee.name);
    });
  
    return (

        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light" >
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/Feed">Feed</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">
                                        Dashboard
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/CRUD-employee">
                                        Manage Employee
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link">Events</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link">Calendar</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">
                                        Profile
                                    </Link>
                                </li>
                                <li className="nav-item1">
                                    <button className="nav-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>

                
                    <div className='Leave-List'>
                        <div className='display-teams'>
                            {Object.entries(teams).map(([team, members]) => (
                                <div className='team' key={team}>
                                    <h2>{team}</h2>
                                    <hr />
                                    <ul>
                                        {members.map((member, index) => (
                                            <li key={index}>{member}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Teams