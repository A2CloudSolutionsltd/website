import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

function Empdashboard() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [employee, setEmployee] = useState({});
  useEffect(() => {
    axios
      .get("http://localhost:8081/Empdashboard")
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res.data);
        } else {
          navigate("/Login");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

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

  useEffect(() => {
    axios
      .get(`http://localhost:8081/employee/${email}`)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [email]);

  const [isLoading , setIsLoading] = useState(true);
  useEffect(()=>{
    const loadingTimeout = setTimeout(()=>{
      setIsLoading(false)
    },1500)
    return() =>{
      clearTimeout(loadingTimeout)
    }
  })

  return (
    <div>
      {isLoading ? (
        <Loader />
      ): (
      <div>
              <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={`/Employee-Feed/${email}`}>Feed</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to={`/Employee-dashboard/${email}`}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/Task-Project/${email}`}>
                  Task & Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">Events</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">Calendar</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/Employee-profile/${email}`}>
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
        <div>
          <div className="rounded-profile">
            <img
              src={`http://localhost:8081/images/` + employee.image}
              alt="Upload Image"
              className="nav-image"
            />
          </div>
          <h2>
            {employee.name} <span className="subtitle">({employee.role})</span>
          </h2>
        </div>
      </div>
      </div>
      )}

    </div>
  );
}

export default Empdashboard;
