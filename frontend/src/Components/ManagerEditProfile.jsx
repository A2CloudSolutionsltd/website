import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
function ManagerEditProfile() {
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const params = useParams();
  const [data, setData] = useState({
    name:"",
    address:"",
    dob: "",
    mobile: "",
    education: "",
  });
  const [ isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    const loadingTimeout = setTimeout(()=>{
        setIsLoading(false)
    },1500)
    return()=>{
        clearTimeout(loadingTimeout);
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedEmail = encodeURIComponent(params.email);
        const response = await axios.get(
          `http://localhost:8081/get/${encodedEmail}`
        );
        const result = response.data.Result[0];

        setData({
          name:result.name,
          role:result.role,
          address:result.address,
          dob: result.dob,
          mobile: result.mobile,
          image: result.image,
          education: result.education,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (params.email) {
      fetchData();
    }
  }, [params.email]);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("image", data.image);
    formdata.append("dob", data.dob);
    formdata.append("address", data.address);
    formdata.append("role", data.role);
    formdata.append("mobile", data.mobile);
    formdata.append("education", data.education);

    const encodedEmail = encodeURIComponent(params.email);
    axios
      .put(`http://localhost:8081/updateManager/${encodedEmail}`, formdata)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate(`/dashboard/${encodedEmail}`);
        }
      })
      .catch((err) => console.log(err));
  };
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
  const handleInputChange = () => {
    const query = inputRef.current.value;
    autoCompleteAddress(query);
  };

  const handleSuggestionClick = (address) => {
    setData((prevData) => ({
      ...prevData,
      address: address,
    }));
    setSuggestions([]);
  };
  return (
    <div>
        {isLoading ? (
            <Loader />
        ):(
            <div>
<div className="backgb">
      <div>
        <div>
          <div className="container-fluid">
            <div className="row">
              <div className="col min-vh-100 py-3">
                <div className="adjust">
                  <div className="d-flex flex-column align-items-center pt-4">
                    <form
                      className="row g-3 w-50"
                      name="form"
                      onSubmit={handleSubmit}
                    >
                      <h2>Update Profile</h2>

                      <p>
                        You can use this page to update your informatio. Please
                        provide the updated details for DOB, Mobile Number,
                        Eductaion.
                      </p>
                      <p>
                        After making the desired changes, click the "Update"
                        button to save the updated information.
                      </p>
                      <p>
                        If you encounter any issues or need assistance, please
                        feel free to reach out to our support team.
                      </p>
                  
                      <div className="col-12">
                        <label for="inputName" className="form-label">
                          role
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputName"
                          placeholder="Enter Title"
                          autoComplete="off"
                          onChange={(e) =>
                            setData({ ...data, role: e.target.value })
                          }
                          value={data.role}
                          name="role"
                          required
                        />
                      </div>
                      <div className="col-12">
                      <label for="inputName" className="form-label">
                          address
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputName"
                          placeholder="1234 St Uk"
                          autoComplete="off"
                          onChange={(e) => {
                            setData({ ...data, address: e.target.value });
                            handleInputChange(e);
                        }}
                        
                          
                          ref={inputRef}
                          value={data.address}
                          name="address"
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
                        <label for="inputName" className="form-label">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="inputName"
                          placeholder="01/01/1111"
                          autoComplete="off"
                          onChange={(e) =>
                            setData({ ...data, dob: e.target.value })
                          }
                          value={data.dob}
                          name="dob"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label for="inputRole" className="form-label">
                          Mobile
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputROle"
                          placeholder="Mobile Number"
                          autoComplete="off"
                          onChange={(e) =>
                            setData({ ...data, mobile: e.target.value })
                          }
                          value={data.mobile}
                          name="mobile"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label for="inputAddress" className="form-label">
                          Education
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="inputAddress"
                          placeholder="Higher Education"
                          autoComplete="off"
                          onChange={(e) =>
                            setData({ ...data, education: e.target.value })
                          }
                          value={data.education}
                          name="education"
                          required
                        />
                      </div>
                      <div class="col-12">
                        <label class="form-label" for="inputGroupFile01">
                          Select Image
                        </label>
                        <input
                          type="file"
                          class="form-control"
                          id="inputGroupFile01"
                          onChange={(e) =>
                            setData({ ...data, image: e.target.files[0] })
                          }
                        />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary">
                          Update
                        </button>
                      </div>
                      <p>
                        If you have any questions or need assistance while
                        adding an employee, feel free to reach out to our
                        support team. We're here to help you!
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
            </div>
        )}
    </div>
    
  );
}
export default ManagerEditProfile;
