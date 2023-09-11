import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LoginAdEmp() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="sign-up-process1">
          <h2>Sign in,</h2>

          <div className="Process-Left">
            <Link to="/Employee-SignUp">
              <button className="emload">Employee</button>
            </Link>
            <Link to="/Login">
              <button className="emload">Manager</button>
            </Link>

            <div className="Other-Login">
              <div className="Text">Login With</div>
              <div className="social-icons">
                <img
                  src="assets/images/fb.png"
                  className="soical-i"
                  alt="inner file missing"
                />
                <img
                  src="assets/images/tweet.png"
                  className="soical-i"
                  alt="inner file missing"
                />
                <img
                  src="assets/images/Google.png"
                  className="soical-i"
                  alt="inner file missing"
                />
              </div>
            </div>
          </div>
          <div className="Process-right">
            <img
              src="assets/images/signup(1).png"
              className="signup-img"
              alt="inner file missing"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginAdEmp;
