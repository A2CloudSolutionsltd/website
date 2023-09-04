import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import backgroundImage from '/public/assets/images/bgg.avif';

function Empdashboard() {
  const divStyle = {
    backgroundImage: `url(${backgroundImage})`,

    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };
  const navigate = useNavigate();
  const { email } = useParams();
  const [employee, setEmployee] = useState({});
  useEffect(() => {
    axios.get('http://localhost:8081/Empdashboard')
      .then(res => {
        if (res.data.Status === "Success") {
          console.log(res.data);
        } else {
          navigate("/Employee-SignUp");
        }
      })
      .catch(err => {
        console.error("Error:", err);
      });
  }, []);

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/Employee-SignUp');
        } else {
          console.error("Logout failed");
        }
      })
      .catch(err => {
        console.error("Logout failed:", err);
      });
  }

  useEffect(() => {
    axios.get(`http://localhost:8081/employee/${email}`)
      .then(res => setEmployee(res.data.Result[0]))
      .catch(err => console.log(err));
  }, [email]);

  return (
    <div>

      <div>
      <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to={`/Employee-dashboard/${email}`}>
                <i className="fs-4 bi-speedometer2"></i> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/Employee-profile/${email}`}>
                <i className="fs-4 bi-person"></i>  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={`/Employee-profile/${email}`}>
                <i className="fs-4 bi-book"></i>  Task
                </Link>
              </li>
              <li className="nav-item1">
                <button className="nav-link" onClick={handleLogout}>
                <i className="fs-4 bi-power"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div style={divStyle}>
          <h1>Welcome, {employee.name} <span className='subtitle'>{employee.role}</span></h1>
        </div>
      </div>
    </div>
  );
}

export default Empdashboard;
