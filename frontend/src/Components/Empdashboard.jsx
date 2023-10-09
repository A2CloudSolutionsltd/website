import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import Timer from "./Timer";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Footerpart from "./Footerpart";
function Empdashboard() {

  const notify = () => {
    toast(employee.status, {
      position: toast.POSITION.TOP_CENTER
    });
  }
  const notify1 = () =>{
    toast(employee.timeupdate,{
      position:toast.POSITION.TOP_CENTER
    })
  }
  const navigate = useNavigate();
  const { email } = useParams();
  const [employee, setEmployee] = useState({});
  const [employeeCount, setEmployeeCount] = useState()
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
    },1500)
    return() =>{
      clearTimeout(loadingTimeout)
    }
  })

  const [statusVisible, setStatusVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatusVisible(false);
    },  120000);

    return () => {
      clearTimeout(timer);
      setStatusVisible(true); 
    };
  }, [employee.status])

  const [seconds, setSeconds] = useState(0);
  const [workingMessageVisible, setWorkingMessageVisible] = useState(false);

  

  

  
  const handleLogintime = () => {
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    };
    
    const loginTime = getCurrentTime();
    
  
    axios.post(`http://localhost:8081/login/${email}`, {loginTime})
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Login time recorded successfully.");
          setWorkingMessageVisible(true);
        } else {
          console.error("Error recording login time.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  
  const handleLogoutTime = () => {
    const getCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      return `${hours}:${minutes}`;
    };
    
    const logoutTime = getCurrentTime();

    const totalHours = seconds / 3600;
  
    axios
      .post(`http://localhost:8081/logout/${email}`, {logoutTime,totalHours})
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log("Logout time and total hours recorded successfully.");
          setWorkingMessageVisible(false);
        } else {
          console.error("Error recording logout time and total hours.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
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
  
  const userTeam = { team: employee.team };
  
  const getTeam = () => {
    if (userTeam.team) {
      const teamMembers = data.filter(employee => employee.team === userTeam.team);
      return teamMembers;
    }
    return [];
  };
  
  const teamMembers = getTeam();
  const [timeupdate , setTimeUpdate] = useState(false);

  const toggleUpdate = () =>{
    setTimeUpdate(prev=> !prev)
  };
  const [values, setValues] = useState({
    newlogin: "",
    newlogout: "",
    Ddescription: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:8081/time/${email}`, values)
      .then((res) => {
        if (res.data.success) {
          alert("Data Submitted");
        } else {
          alert("Failed to Submit");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error submitting data");
      })
  }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ): (
      <div className="bg-dashboard">
              <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">


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
          <div className="rounded-profile1">
         
            <img
              src={`http://localhost:8081/images/` + employee.image}
              alt="Upload Image"
              className="nav-image"
            />
            
          </div>
          <p> <strong>Welcome {employee.name}</strong></p>
          <p>{employee.email}</p>
         
</div>
          <div className="LeaveandCount">
          <div className="count">
            <h5>Employee Count</h5>
              <img src="/assets/images/count.jpg" alt="Employee-count" className="Countimage" />
              <p>{employeeCount}</p>
          </div>
          <div className="leave">
            <img src="/assets/images/timechange.webp" alt="Image missing" className="timechange" onClick={e => notify1()}/>
          <button className="in" onClick={handleLogintime} ><img src="/assets/images/login.png" className="log" alt="error" /></button>
  <button className="out" onClick={handleLogoutTime} ><img src="/assets/images/logout.png" className="log" alt="error" /></button>
  {workingMessageVisible && 
  <div className="wrk-app">
    <div className="p-time">
    <p>Working <Timer seconds={seconds} /></p>
    </div><div className="edit-time">
    <i className="fs-4 bi-pencil-square" onClick={toggleUpdate}></i>
      {timeupdate && (
        <div className="timeupdate">
          <form onSubmit={handleSubmit}>
          <h6>Update Time</h6>
          <div className="start-time">
            <label>Start Time</label>
            <input type="time" name="newlogin" onChange={handleChange} value={values.newlogin} />
          </div>
          <div className="endtime">
            <label>End Time</label>
            <input type="time" name="newlogout" onChange={handleChange} value={values.newlogout}/>
          </div>
          <textarea placeholder="Reason" name="Ddescription" onChange={handleChange} value={values.Ddescription}/>
          <button type="submit" className="time-update reason">Submit</button>
          </form>
        </div>
      )}
    </div>
  </div>}
          </div>
          <div className="leave">
            <h5>Task</h5>
          <img src="/assets/images/task1new.png" alt="Employee-count" className="Countimage" />
          <p>{employee.projecttitle}</p>
          </div>
          </div>
          <div className="leave-seg">
          <div className="leave-status">
    <Link to={`/ApplyLeave/${email}`}>
      <button className="btn-leave-req">
        <img src="/assets/images/applyleave.png" alt="leave-req" className="leave-req" />
        Apply Leave
      </button>
    </Link>
    <br />
   <button className="status-btn" onClick={e=> notify()}><img  src="/assets/images/checkk.jpg" alt="check miss" className="statusimg"/></button>
    {/* {statusVisible && (
      <p className={employee.status === 'Approved' ? 'approved' : 'rejected'}>
        <strong>{employee.status}</strong>
      </p>
    )} */}
  </div>

  <div className="team-list">
<h5 >My Team, {employee.team}</h5>

    {teamMembers.map((member, index) => (
      <div key={index} className="teammembers">
        <div className="spe-te">
        <div className="teamlist-left">
        <img src={`http://localhost:8081/images/` + member.image}  className="rounded-profile2"/>
        </div>
       <div className="teamlist-right">
       <p>{member.name}</p>
       </div>
       </div>
       
      </div>
    ))}

  </div>
          </div>
                        
         <div>
<Footerpart />
         </div>
          
        </div>

      </div>
      </div>
      )}

    </div>
  );
}

export default Empdashboard;
