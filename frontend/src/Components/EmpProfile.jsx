import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EmpProfile() {
  const handleLogout = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/Employee-SignUp");
        } else {
          console.error("Logout failed");
        }
      })
      .catch((err) => {
        console.error("Logout failed:", err);
      });
  };
  const navigate = useNavigate();

  const { email } = useParams();
  const [employee, setEmployee] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8081/employee/${email}`)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [email]);
  return (
    <div>
      <div className="bg-content">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link">Feed</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/Employee-dashboard/${email}`}>
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/TaskandProject">
                  Task & Projects
                </Link>
              </li>
              <li className="nav-item"></li>
              <Link className="nav-link">Events</Link>
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
        <div className="bg-content">
          <div className="overall-profile">
            <div className="pro-prfile">
              <div className="border-shadow1">
                <img
                  src={`http://localhost:8081/images/` + employee.image}
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
                <p>{employee.name}</p>
              </strong>
              <label>Address:</label>
              <strong>
                {" "}
                <p>{employee.address}</p>
              </strong>
              <label>Email:</label>
              <strong>
                {" "}
                <p>{employee.email}</p>
              </strong>
              <label>Title:</label>
              <strong>
                {" "}
                <p>{employee.role}</p>
              </strong>
            </div>
            <div className="Right-profile">
              <label>DOB:</label>
              <strong>
                {" "}
                <p>{employee.dob}</p>
              </strong>
              <label>Mobile Number :</label>
              <strong>
                {" "}
                <p>{employee.mobile}</p>
              </strong>
              <label>Highest Education:</label>
              <strong>
                {" "}
                <p>{employee.education}</p>
              </strong>

              <Link
                to={"/EmployeeEditOption/" + encodeURIComponent(employee.email)}
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
  );
}

export default EmpProfile;
