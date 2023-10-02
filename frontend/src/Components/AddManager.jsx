import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddManager() {
  const [isLoading, setIsLoading] = useState(true);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8081/createmanager", values)
      .then((res) => {
        if (res.data.status === "Success") {
          const email = values.email;
          alert("Account Created")
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

  return (
    <div >
      {isLoading ? (
        <Loader />
      ) : (
        <div className='whole-task'>
        <div className='sign-up-process'>
          <h2>SignUp</h2>
          <div className='Process-Left'>
            <form name='form' className='Signup-form' method='POST' onSubmit={handleSubmit}>
              <label className='signup-label'>
                Name:
                <input 
                  type="text" 
                  name="name"  
                  className='signup-input' 
                  value={values.name}
                  onChange={handleChange}  
                  required 
                />
              </label>
              <label className='signup-label'>
                Email:
                <input 
                  type="email"  
                  name="email"  
                  className='signup-input' 
                  value={values.email}
                  onChange={handleChange} 
                  required 
                />
              </label>
              <label className='signup-label'>
                Password:
                <input 
                  type="password"   
                  name="password" 
                  className='signup-input' 
                  value={values.password}
                  onChange={handleChange} 
                  required 
                />
              </label>
              <button className='signup-button' type="submit"> Register </button>
            </form>
          </div>
          <div className='Process-right'>
            <img src='/assets/images/Screenshot (4).png' alt='inner file missing' className='signup-img1' />
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default AddManager;
