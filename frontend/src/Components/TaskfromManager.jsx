import React, { useEffect,useState } from 'react'
import { Link, useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
function TaskfromManager() {
const params = useParams();
const [data, setData] = useState({
  projecttitle: "",   // Corrected attribute name
  description: "",
  deadline: ""
});
const navigate = useNavigate();
const handleSubmit = (event) => {
  event.preventDefault();
  const encodedEmail = encodeURIComponent(params.email);
  axios
    .put("http://localhost:8081/updatetask/" + encodedEmail, {
      projecttitle: data.projecttitle,   // Corrected attribute name
      description: data.description,
      deadline: data.deadline
    })
    .then((res) => {
      if (res.data.Success) {   // Corrected capitalization
        navigate("/CRUD-EMPLOYEE")
      }
    })
    .catch((err) => console.log(err));
}
const { email } = useParams();
const [employee, setEmployee] = useState({});

useEffect(() => {
  axios
    .get(`http://localhost:8081/employee/${email}`)
    .then((res) => setEmployee(res.data.Result[0]))
    .catch((err) => console.log(err));
}, [email]);

  return (
    <div>

            <div className='total-task'>
                                   <button
                  className="btn float-end"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvas"
                  role="button"
                ><Link to="/CRUD-employee">
                  <i
                    className="bi bi-arrow-left-square-fill fs-3"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvas"
                  ></i>
                  </Link>
                </button>
                <div className='TaskForm'>
                 <form name="form"
                      onSubmit={handleSubmit} >
                   <input placeholder='Title' value={data.projecttitle} 
                   name="projecttitle"onChange={(e) => { setData({...data, projecttitle:e.target.value})}}/>
                    <p>{employee.projecttitle}</p>
                   
                <textarea placeholder='Description' value={data.description} name='description'
                onChange={(e) => setData({...data, description:e.target.value})}
                />
                    <p>{employee.description}</p>
                   
                    <input type='date' value={data.deadline} name='deadline'
                    onChange={(e) => setData({...data, deadline:e.target.value})}
                    />
                    <p>{employee.deadline}</p>
                    
                     <button type='submit'>Submit</button>
</form>
                </div>
                <div className='TaskLeft'>
                    <img src='/assets/images/task-assign.avif' alt='image-missing' className='Task-Img'/>
                    </div>

                  </div>

    </div>
  )
}

export default TaskfromManager