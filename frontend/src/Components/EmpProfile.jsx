import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EmpProfile() {
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
      const navigate = useNavigate();

    const { email } = useParams();
    const [employee, setEmployee] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8081/employee/${email}`)
            .then(res => setEmployee(res.data.Result[0]))
            .catch(err => console.log(err));
    }, [email])
    return (
        <div>
 
                <div className='bg-content'>
                <nav className="navbar navbar-expand-lg navbar-light" >
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
                    <div className='bg-content'>

                            <div>
                        
                                        <div className='left-profile'>
                                            <h1>Profile,</h1>
                                            <label>Name:</label>
                                            <p>{employee.name}</p>
                                            <label>Address:</label>
                                            <p>{employee.address}</p>
                                            <label>Email:</label>
                                            <p>{employee.email}</p>
                                            <label>Title:</label>
                                            <p>{employee.role}</p>

                                        </div>
                                        <div className='Right-profile'>
                                             <label>DOB:</label>
                                             <p>{employee.dob}</p>
                                             <label>Mobile Number :</label>
                                             <p>{employee.mobile}</p>
                                             <label>Highest Education:</label>
                                             <p>{employee.education}</p>

                                           <Link to={"/EmployeeEditOption/" + encodeURIComponent(employee.email)} ><button className='Edit-Employee-Option'> <i className="fs-4 bi-pencil-square"></i>Edit</button></Link>  

                                        </div>

                                        </div>

                                   

                                    

                                    

                                </div>
                            </div>
                       
  

        </div>
    )
}

export default EmpProfile