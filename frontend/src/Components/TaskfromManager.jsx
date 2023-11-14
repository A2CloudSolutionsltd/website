import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
function TaskfromManager() {
  const params = useParams();
  const [data, setData] = useState({
    projecttitle: "",   
    description: "",
    deadline: "",
    team: ""
  });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const encodedEmail = encodeURIComponent(params.email);

    axios
      .put("http://localhost:8081/updatetask/" + encodedEmail, {
        projecttitle: data.projecttitle,   
        description: data.description,
        deadline: data.deadline,
        team: data.team,

      })
      .then((res) => {
        if (res.data.Success) {

          alert("Task Assigned")
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
  const [formUpdate , setFormUpdate] = useState(false);

  const FormUpdate =() =>{
       setFormUpdate(prev => !prev)
  }
  const [data1, setData1] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:8081/gettasklist/${email}`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setData1(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, [email]);
  return (
    <div>

      <div >
        <div className='db-header'>
          <div className='db-top'>
            <h2>A2Cloud</h2>
          </div>

        </div>
        <div className='db-content'>
          <div className='content-title'>
            <p>Home / Manager</p>
            <h5>Asign Task</h5>
          </div>
          <div className="employe-contnt">
            <div className="left-emp-cnt">
              <p>  Assign</p>
            </div>
            <div className="right-emp-cnt">

              <img src="/assets/images/add-employee.png" alt="add-image" className="add-employee" />
            </div>
          </div>
        </div>
        <h2 className='task-h2'>Assign Task and Deadlines, </h2>
        <div className='total-task-assign'>
                          {formUpdate && (
        <div className="edit-time">
             
        <div className="Event-toggle">
          <h2>Task Records,</h2>
          <div className="cancel-div">
          <img src='/assets/images/66847.png'  className='cancel' alt='mis' onClick={FormUpdate}/>
          </div>
         
<div className="leave-list-status">
  <div className="leavehead">
    <div className="leave-head-l">
   <img src="/assets/images/view-task.avif" className="leave-list-img" alt="imagemissing" />
    </div>
    <div className="leave-head-r">
<p>Here, you can view all tasks assigned to <strong>{employee.name}</strong> and check the status of  tasks.</p>
    </div>
  </div>
  <div className='leave-body'>
  <table className='table-list-of-leave'>
        <thead className='time-head'>
          <tr>
            <th className='leave-th'>Title</th>
            <th className='leave-th'>Deadline</th>
            <th className='leave-th'>Status</th>

          </tr>
        </thead>
        <tbody>
          {data1.map((request) => (
            <tr key={request.id}>
              <td className='leave-td'>{request.project_title}</td>
              <td className='leave-td'>{request.deadline}</td>
              <td className='leave-td'>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
            </div>
</div>
        </div>
    </div>
            )}
            <form name="form" onSubmit={handleSubmit} className="w-50">
  <div className="container">
    <div className="mb-3">
      <strong><label className="form-label">Project/Task Title</label></strong>
      <input 
        className="form-control" 
        placeholder="Title" 
        value={data.projecttitle} 
        name="projecttitle" 
        onChange={(e) => { setData({ ...data, projecttitle: e.target.value }) }} 
        required
      />
    </div>

    <div className="mb-3">
      <strong><label className="form-label">Description</label></strong>
      <textarea 
        className="form-control" 
        placeholder="Description" 
        value={data.description} 
        name="description" 
        onChange={(e) => setData({ ...data, description: e.target.value })} 
        required
      />
    </div>

    <div className="mb-3">
      <strong><label className="form-label">Deadline</label></strong>
      <input 
        type="date" 
        className="form-control" 
        value={data.deadline} 
        name="deadline" 
        onChange={(e) => setData({ ...data, deadline: e.target.value })} 
        required
      />
    </div>

    <div className="mb-3 custom-select1">
  <strong><label className="form-label">Team</label></strong>
  <select 
    className="form-control" 
    value={data.team} 
    name="team" 
    onChange={(e) => setData({ ...data, team: e.target.value })}
    required
  >
    <option value="">Select</option>
    <option value="Team-Full Stack">Team-Full Stack</option>
    <option value="Team-Front-End">Team-Front-End</option>
    <option value="Team-Back-End">Team-Back-End</option>
    <option value="Team-Testing">Team-Testing</option>
    <option value="Team-Data-Analyst">Team-Data-Analyst</option>
    <option value="Team-Designing">Team-Designing</option>
    <option value="Team-Intern">Team-Intern</option>
  </select>
</div>

    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>

            <div className='TaskLeft'>
              <img src='/assets/images/task-assign.avif' alt='image-missing' className='Task-Img' />

              <button className='view-task' onClick={FormUpdate}>Employee Task</button>

              <div className='Team-Assign'>

              
                {/* <label className='Label-Assign'>Assign Team</label>
                <select className='team-select' required>
                  <option className='team-option'>
                    Select
                  </option>
                  <option className='team-option' value="Team-Front-End">
                    Front-End-Developer
                  </option>
                  <option className='team-option' value="Team-Back-End">
                    Back-End-Developer
                  </option>
                  <option className='team-option' value="Team-Full-Stack">
                    Full Stack Developer
                  </option>
                  <option className='team-option' value="Team-Testing">
                    Testing
                  </option>
                  <option className='team-option' value="Team-Analyst">
                    Data-Analyst
                  </option>
                  <option className='team-option' value="Team-Designing">
                    Designer
                  </option>
                </select> */}
              </div>
            </div>

        </div>

      </div>

    </div>
  )
}

export default TaskfromManager