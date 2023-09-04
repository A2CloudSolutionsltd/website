import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
function Employee() {

  const [isLoading , setIsLoading] = useState(true);
  useEffect(()=>{
    const loadingTimeout = setTimeout(()=>{
      setIsLoading(false)
    },1500)
    return(()=>{
      clearTimeout(loadingTimeout)
    })
  },[])

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    role:''
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8081/create', values)
      .then((res) => {
        if (res.data.status === 'Success') {
          alert("Succesfully Account Created")
        } else {
          alert('Error in Registration. Please try again.');
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
  const [data1, setData1] = useState([])

  useEffect(()=> {
    axios.get('http://localhost:8081/getEmployee')
    .then(res => {
      if(res.data.Status === "Success") {
        setData1(res.data.Result);
      } else {
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])
  const navigate = useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        if (res.data.Status === "Success") {
          navigate('/Login');
        } else {
          console.error("Logout failed");
        }
      })
      .catch(err => {
        console.error("Logout failed:", err);
      });
  }
  
  const handleDelete = (email) => {
    axios.delete(`http://localhost:8081/remove/${encodeURIComponent(email)}`)
      .then(res => {
        if (res.data.Status === "Success") {
          window.location.reload(true);
        } else {
          alert("Error deleting employee");
        }
      })
      .catch(err => {
        console.error(err);
        alert("An error occurred while deleting employee");
      });
  }
  


  return (
    <div className='backgb'>
      {isLoading ? (
       <Loader /> 
      ) : (
        <div >
<div className="offcanvas offcanvas-start w-25" tabindex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
    <div className="offcanvas-header">
        <h6 className="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div className="offcanvas-body px-0">
        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
            <li className="nav-item">
                <Link to="/dashboard" className="nav-link text-truncate">
                <i className="fs-4 bi-speedometer2"></i><span className="ms-1 d-none d-sm-inline">Dashboard</span>
                </Link>
            </li>
            <li>
                <Link to="/CRUD-employee" className="nav-link text-truncate">
                <i className="fs-4 bi-people"></i><span className="ms-1 d-none d-sm-inline">Manage Employee</span> </Link>
            </li>
            <li>
                <Link to="/profile" className="nav-link text-truncate">
                <i className="fs-4 bi-person"></i><span className="ms-1 d-none d-sm-inline">Profile</span></Link>
            </li>
            <li>
              <a class="nav-link   text-truncate">
                <i className="fs-4 bi-power"></i><span  onClick={handleLogout}class="ms-1 d-none d-sm-inline">Logout</span>
              </a>

            </li>
        </ul>
    </div>
</div>
<div className="container-fluid">
    <div className="row">
        <div className="col min-vh-100 py-3">
        
            <button className="btn float-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
                <i className="bi bi-arrow-right-square-fill fs-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"></i>
            </button>
            <div className='adjust' >

            <div className='d-flex flex-column align-items-center pt-4'>
              
			

			<form className="row g-3 w-50" onSubmit={handleSubmit} name='form'>
      <h2>Add Employee</h2>
      <p>
                When you create an employee, their information including name, email,
                location, password, and role will be added to the database. This will
                allow employees to use their registered email and password to log in to
                the portal. As part of our commitment to data security, passwords are
                securely encrypted before being stored in the database.
            </p>
						<div className="col-12">
					<label for="inputName" className="form-label">Name</label>
					<input type="text" className="form-control" id="inputName" placeholder='Enter Name' autoComplete='off'
				  name='name'   value={values.name}  onChange={handleChange}  required/>
				</div>
				<div className="col-12">
					<label for="inputEmail4" className="form-label">Email</label>
					<input type="email" className="form-control" id="inputEmail4" placeholder='Enter Email' autoComplete='off'
					name='email'   value={values.email}  onChange={handleChange} required/>
				</div>
				<div className="col-12">
					<label for="inputPassword4" className="form-label">Password</label>
					<input  name='password' type="password" className="form-control" id="inputPassword4" placeholder='Enter Password'
				   value={values.password}  onChange={handleChange} required/>
				</div>
				<div className="col-12">
					<label for="inputRole" className="form-label">Address</label>
					<input type="text" className="form-control" id="inputROle" placeholder="Enter Address" autoComplete='off'
					name='address'   value={values.address}  onChange={handleChange} required/>
				</div>
				<div className="col-12">
					<label for="inputAddress" className="form-label">Job-Role</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" autoComplete='off'
				name='role'   value={values.role}  onChange={handleChange} required/>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Create</button>
				</div>
        <p>
                Please ensure that you provide accurate and up-to-date information for
                the new employee. This will help us maintain accurate records and provide
                a smooth onboarding experience for the employee.
            </p>
            <p>
                Additionally, you can choose the appropriate role for the employee. Roles
                help define the employee's access level within the portal. Selecting the
                right role ensures that employees have access to the features and data
                they need to perform their duties efficiently.
            </p>
            <p>
                If you have any questions or need assistance while adding an employee,
                feel free to reach out to our support team. We're here to help you!
            </p>
			</form>
		</div>
            </div>
        </div>
    </div>
</div>

<div className='emloyee-list'>
  <h3>Employee List</h3>
  <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data1.map((employee, index) => {
              return <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.role}</td>
                  <td>
                  <Link to={"/Edit-Employee/" + encodeURIComponent(employee.email)}>
                    <button className='btnn'>Edit</button>
                  </Link>

                   <button onClick={e => handleDelete(employee.email)} className='btnn1'>Delete</button>
                  </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
          </div>
      )}
      
    </div>
  )
}

export default Employee