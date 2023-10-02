import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import axios from "axios";
function Profile() {
  const [isLoading, setIsLoading] = useState(true);
  const [manager, setManager] = useState({});
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);
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
  const {email} = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8081/manager/${email}`)
      .then((res) => {
        console.log('API Response:', res.data); // Log the entire response
        if (res.data && res.data.Result && res.data.Result.length > 0) {
          setManager(res.data.Result[0]);
        } else {
          console.error("Manager data not found");
        }
      })
      .catch((err) => console.log(err));
  }, [email]);
  
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-content1">
<nav className="navbar navbar-expand-lg navbar-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
      
                    <li className="nav-item">
                      <Link className="nav-link"to={`/dashboard/${email}`}>
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link"  to={`/CRUD-employee/${email}`}>
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
                      <Link className="nav-link" to={`/profile/${email}`}>
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                  <Link className="nav-link" to="/Time-Sheet-Employee">
                    Time Sheet
                  </Link>
                </li>
                    <li className="nav-item3">
                      <button className="nav-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
<div>
<div className="bg-content">
          <div className="overall-profile">
            <div className="pro-prfile">
              <div className="border-shadow1">
                <img
                  src={`http://localhost:8081/images/` + manager.image}
                  alt="Upload Image"
                  className="pro-picbyeemployee"
                />
              </div>
            </div>
            {/* <img src={`http://localhost:8081/images/`+employee.image} alt="" className='empImg'/> */}

            <div className="left-profile">
              <h1>Profile,</h1>
              <label>Name:</label>
              <strong>
                {" "}
                <p>{manager.name}</p>
              </strong>
              <label>Address:</label>
              <strong>
                {" "}
                <p>{manager.address}</p>
              </strong>
              <label>Email:</label>
              <strong>
                {" "}
                <p>{manager.email}</p>
              </strong>
              <label>Title:</label>
              <strong>
                {" "}
                <p>{manager.role}</p>
              </strong>
            </div>
            <div className="Right-profile">
              <label>DOB:</label>
              <strong>
                {" "}
                <p>{manager.dob}</p>
              </strong>
              <label>Mobile Number :</label>
              <strong>
                {" "}
                <p>{manager.mobile}</p>
              </strong>
              <label>Highest Education:</label>
              <strong>
                {" "}
                <p>{manager.education}</p>
              </strong>

              <Link
                to={"/Manager-Profile/" + encodeURIComponent(manager.email)}
              >
                <button className="Edit-Employee-Option">
                  {" "}
                  <i className="fs-4 bi-pencil-square"></i>
                </button>
              </Link>
            </div>
          </div>  
        </div>
</div>
        </div>
      )}
    </div>
  );
}

export default Profile;
