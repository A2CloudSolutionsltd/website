import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
function Employee() {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [manager , setManager] = useState({});
 const {email} = useParams();
  const autoCompleteAddress = (query) => {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8081/manager/${email}`)
      .then((res) => setManager(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [email]);
  const handleInputChange = () => {
    const query = inputRef.current.value;
    autoCompleteAddress(query);
  };

  const handleSuggestionClick = (address) => {
    setValues((prevValues) => ({
      ...prevValues,
      address: address,
    }));
    setSuggestions([]);
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8081/create", values)
      .then((res) => {
        if (res.data.status === "Success") {
          alert("Succesfully Account Created");
        } else {
          alert("Error in Registration. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  const [data1, setData1] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/getEmployee")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData1(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
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

  const handleDelete = (email) => {
    axios
      .delete(`http://localhost:8081/remove/${encodeURIComponent(email)}`)
      .then((res) => {
        if (res.data.Status === "Success") {
         console.log("Deleted")
        } else {
          alert("Error deleting employee");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred while deleting employee");
      });
  };

  return (
    <div className="backgb">
      {isLoading ? (
        <Loader />
      ) : (
        <div>
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
      

                <div className="adjust">
                  <div className="d-flex flex-column align-items-center pt-4">
                    <form
                      className="row g-3 w-50"
                      onSubmit={handleSubmit}
                      name="form"
                    >
                      <h2>Add Employee</h2>
                      <p>
                        When you create an employee, their information including
                        name, email, location, password, and role will be added
                        to the database. This will allow employees to use their
                        registered email and password to log in to the portal.
                        As part of our commitment to data security, passwords
                        are securely encrypted before being stored in the
                        database.
                      </p>
                      <div className="col-12">
                        <label for="inputName" className="form-label">
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputName"
                          placeholder="Enter Name"
                          autoComplete="off"
                          name="name"
                          value={values.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label for="inputEmail4" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Enter Email"
                          autoComplete="off"
                          name="email"
                          value={values.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label for="inputPassword4" className="form-label">
                          Password
                        </label>
                        <input
                          name="password"
                          type="password"
                          className="form-control"
                          id="inputPassword4"
                          placeholder="Enter Password"
                          value={values.password}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label htmlFor="inputRole" className="form-label">
                          Address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputRole"
                          placeholder="Enter Address"
                          autoComplete="off"
                          name="address"
                          ref={inputRef}
                          onChange={(e) => {
                            handleInputChange(e);
                            handleChange(e);
                          }}
                          value={values.address}
                          required
                        />
                        <ul>
                          {suggestions.map((item, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleSuggestionClick(item.display_name)
                              }
                            >
                              {item.display_name}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-12">
                        <label for="inputAddress" className="form-label">
                          Job-Role
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder="Title"
                          autoComplete="off"
                          name="role"
                          value={values.role}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Create
                        </button>
                      </div>
                      <p>
                        Please ensure that you provide accurate and up-to-date
                        information for the new employee. This will help us
                        maintain accurate records and provide a smooth
                        onboarding experience for the employee.
                      </p>
                      <p>
                        Additionally, you can choose the appropriate role for
                        the employee. Roles help define the employee's access
                        level within the portal. Selecting the right role
                        ensures that employees have access to the features and
                        data they need to perform their duties efficiently.
                      </p>
                      <p>
                        If you have any questions or need assistance while
                        adding an employee, feel free to reach out to our
                        support team. We're here to help you!
                      </p>
                    </form>
                  </div>
                </div>
          
     
  

          <div className="emloyee-list">
            <h3>Employee List.</h3>
            <div className="top-search">
              <p>
                These are the employee profiles that have been saved in the
                database. You can see the employees listed below.{" "}
                <strong>
                  The profile picture can only be updated by the employees
                </strong>{" "}
                in their profile portal. Once they update their profile picture,
                you'll be able to view it here. Each employee profile has two
                options: 'Edit' and 'Delete.' In the 'Edit' option, you can
                rename the employee, update their address, and modify their job
                role. On the other hand, in the 'Delete' option, you can
                permanently remove or delete the employee from the database.
                Please exercise caution when deleting an employee, as this
                action is irreversible
              </p>
            </div>
            {data1.map((employee, index) => {
              return (
                <div key={index}>
                  <div className="ListingAllEmployee">
                    <div className="ListingAllEmployee-Left">
                      <div className="border-shadow">
                        <img
                          src={`http://localhost:8081/images/` + employee.image}
                          alt="Image Missing"
                          className="proimage"
                        />
                      </div>
                      
                    </div>
                    <div className="ListingAllEmployee-Right">
                      <strong>
                        <h2>{employee.name}</h2>
                      </strong>
                      <p>{employee.email}<br />(<strong>{employee.team}</strong>)</p>
                      <label>Title :</label>
                      <strong>
                        <p>{employee.role}</p>
                      </strong>
                      <label>Location :</label>
                      <strong>
                        <p>{employee.address}</p>
                      </strong>
                      <label>Contact :</label>
                      <strong>
                        <p>{employee.mobile}</p>
                      </strong>
                      <label>DOB</label>
                      <strong>
                        <p>{employee.dob}</p>
                      </strong>
                      <label>Highest Education</label>
                      <strong>
                        <p>{employee.education}</p>
                      </strong>
                
                      <br />
                      <Link
                        to={
                          "/Edit-Employee/" + encodeURIComponent(employee.email)
                        }
                      >
                        <button className="btnn">Edit</button>
                      </Link>

                      <button
                        onClick={(e) => handleDelete(employee.email)}
                        className="btnn1"
                      >
                        Delete
                      </button>
                      <Link to={"/AssignTask/" + encodeURIComponent(employee.email)}>
                      <button className="Assign">
                        Assign Task
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;
