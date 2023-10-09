import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
function EditEmployee() {
  const params = useParams();
  const [data, setData] = useState({
    dob: "",
    mobile: "",
    education: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const encodedEmail = encodeURIComponent(params.email);
        const response = await axios.get(
          `http://localhost:8081/get/${encodedEmail}`
        );
        const result = response.data.Result[0];

        setData({
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
    formdata.append("mobile", data.mobile);
    formdata.append("education", data.education);

    const encodedEmail = encodeURIComponent(params.email);
    axios
      .put(`http://localhost:8081/updateEmployee/${encodedEmail}`, formdata)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate(`/Employee-dashboard/${encodedEmail}`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
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
                      <h2>Update Employee</h2>

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
                          value={data.name}
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
                          value={data.address}
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
                          value={data.role}
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
  );
}
export default EditEmployee;
