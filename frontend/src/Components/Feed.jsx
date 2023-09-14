import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Feed() {
    const [isLoading , setIsLoading] = useState(true);
    useEffect(()=>{
        const loadingTimeout = setTimeout(()=>{
     setIsLoading(false);
        },1500)
    return () =>{
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
  return (
    <div>
        {isLoading ? (
            <Loader />
        ): (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                      <Link className="nav-link" to="/Feed">Feed</Link>
                    </li>
      
                    <li className="nav-item">
                      <Link className="nav-link"to="/dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link"  to="/CRUD-employee">
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
            </div>
        )}
    </div>
  )
}

export default Feed