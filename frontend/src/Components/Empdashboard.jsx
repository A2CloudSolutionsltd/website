import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";

function Empdashboard() {
  const navigate = useNavigate();
  const { email } = useParams();
  const [employee, setEmployee] = useState({});
  const [employeeCount, setEmployeeCount] = useState();

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

  axios.get('http://localhost:8081/employeeCount')
    .then(res => {
      setEmployeeCount(res.data[0].employee)
    }).catch(err => console.log(err));

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
    },1500);

    return() =>{
      clearTimeout(loadingTimeout);
    };
  });

  const [statusVisible, setStatusVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusVisible(false);
    },  120000);

    return () => {
      clearTimeout(timer);
      setStatusVisible(true); 
    };
  }, [employee.status]);

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
          <div className="profile-cont">
            <div className="nameimg">
              <div className="rounded-profile">
                <img
                  src={`http://localhost:8081/images/` + employee.image}
                  alt="Upload Image"
                  className="nav-image"
                />
              </div>
              <p><strong>Welcome {employee.name}</strong></p>
              <p>{employee.email}</p>
            </div>
            <div className="LeaveandCount">
              <div className="count">
                <h5>Employee Count</h5>
                <img src="/assets/images/Employee.png" alt="Employee-count" className="Countimage" />
                <p>{employeeCount}</p>
              </div>
              <div className="leave">
                <h5>On-Leave</h5>
                <img src="/assets/images/Leave.png" alt="Employee-count" className="Leaveimage" />
                <p>-</p>
              </div>
              <div className="leave">
                <h5>Task</h5>
                <img src="/assets/images/task.png" alt="Employee-count" className="Leaveimage" />
                <p>{employee.projecttitle}</p>
              </div>
            </div>
            <div className="leave-seg">
              <div className="leave-status">
                <Link to={`/ApplyLeave/${email}`}>
                  <button className="btn-leave-req">
                    <img src="/assets/images/leave-req.png" alt="leave-req" className="leave-req" />
                    Apply Leave
                  </button>
                </Link>
                <br />
                <label>Status</label>
                {statusVisible && (
                  <p className={employee.status === 'Approved' ? 'approved' : 'rejected'}>
                    <strong>{employee.status}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Empdashboard;
