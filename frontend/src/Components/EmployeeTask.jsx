import React, {useEffect,useState} from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
function EmployeeTask() {
  const { email } = useParams();
  const [employee, setEmployee] = useState({});
 const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:8081/employee/${email}`)
      .then((res) => setEmployee(res.data.Result[0]))
      .catch((err) => console.log(err));
  }, [email]);
  const [ isLoading , setIsLoading] = useState(true);
  useEffect(()=>{
    const loadingTimeout = setTimeout(()=>{
      setIsLoading(false)
    },1500)
    return() => {
      clearTimeout(loadingTimeout)
    }
  })
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
  return (
    <div>
      {isLoading ? (
        <Loader />
      ):(
      <div className="whole-task">
              <nav className="navbar navbar-expand-lg navbar-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to={`/Employee-Feed/${email}`}>Feed</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/Employee-dashboard/${email}`}>Dashboard</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link"  to={`/Task-Project/${email}`}>Task & Projects</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Events</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link">Calendar</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={`/Employee-profile/${email}`}>Profile</Link>
            </li>
            <li className="nav-item1">
              <button className="nav-link"  onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="Task1-part">
        <div className="leftpart1">
          <h2>Your Task,</h2>
          <form className="task-form">
            <label>Task Title:</label>
           <strong> <p>{employee.projecttitle}</p></strong>
            <label>Description:</label>
            <strong> <p>{employee.description}</p></strong>
            <label>Deadline</label>
            <strong> <p>{employee.deadline}</p></strong>
          </form>
        </div>
        <div className="rightpart1">
          <img
            src="/assets/images/task3.avif"
            className="rightpartimage"
            alt="image missing"
          />
        </div>
      </div>
      <div className="Task1-part">
        <h2>Task Submission Guidelines</h2>
        <p>
          <strong>Task Title:</strong> Enter a concise and descriptive title for
          the task you are currently working for. Make it clear and specific so
          that anyone reading it can understand the task's purpose.
          <br />
          <strong>Description:</strong> Provide a detailed description of the
          task. Include information like what needs to be done, any specific
          requirements, and any additional context that would be helpful for the
          assignee.
          <br />
          Specify the deadline or due date for the task. Ensure it's realistic
          and achievable.....
          <strong>Assigned To:</strong> Select the primary person responsible
          for completing the task. This person will receive notifications and
          updates related to the task.
          <br />
          <strong>Additional Assignees:</strong> If more than one person is
          involved in the task, you can add additional assignees here.
          <br />
          <strong>Attachments:</strong> If there are any files or documents
          related to the task, you can attach them using the "Upload Files"
          option. This can include design files, documents, or any other
          relevant materials.
          <br />
          Submit Task: Once you've filled out all the necessary details, click
          the "Submit" button to create the task. It will be added to the task
          management system for tracking and monitoring.
        </p>
        <div className="Task-submit"> 
           <div className="Left-tasksubmit">
            <h2>Daily Submission</h2>
            <p>Give us an Update on Your Current Work( <strong>{employee.projecttitle}</strong>)</p>
           
            <textarea placeholder="Description"className="task-des"/>
            <button className="Tsk-sub-btn">Post </button>
            <div className="logo">
              <label><strong>Project-Description</strong></label>
            <p>{employee.description}</p>
          </div>
           </div>
           <div className="Right-tasksubmit">
            <img src="/assets/images/Tasksubmission.png" className="Pic-task" alt="Innerfile mising"/>
           </div>
        </div>
      </div>
      </div>
      )}

    </div>
  );
}

export default EmployeeTask;
