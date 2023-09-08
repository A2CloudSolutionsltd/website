import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import Loader from './Loader';
import axios from 'axios';
function Profile() {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => {
      clearTimeout(loadingTimeout)
    }
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
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div class="offcanvas offcanvas-start w-25" tabindex="-1" id="offcanvas" data-bs-keyboard="false" data-bs-backdrop="false">
            <div class="offcanvas-header">
              <h6 class="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
              <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body px-0">
              <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                <li>
                  <Link to="/dashboard" class="nav-link text-truncate">
                    <i className="fs-4 bi-speedometer2"></i><span class="ms-1 d-none d-sm-inline">Dashboard</span>
                  </Link>
                </li>

                <li>
                  <Link to="/CRUD-employee" class="nav-link text-truncate">
                    <i className="fs-4 bi-people"></i><span class="ms-1 d-none d-sm-inline">Manage Employee</span> </Link>
                </li>
                <li>
                  <Link to="/profile" class="nav-link text-truncate">
                    <i className="fs-4 bi-person"></i><span class="ms-1 d-none d-sm-inline">Profile</span></Link>
                </li>
                <li>
                  <a class="nav-link   text-truncate">
                    <i className="fs-4 bi-power"></i><span  onClick={handleLogout} class="ms-1 d-none d-sm-inline">Logout</span>
                  </a>

                </li>
              </ul>
            </div>
          </div>
          <div class="container-fluid">
            <div class="row">
              <div class="col min-vh-100 py-3">

                <button class="btn float-end" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
                  <i class="bi bi-arrow-right-square-fill fs-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"></i>
                </button>

                <div>
                  <div>
                    <h1>Profile</h1>



                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Profile