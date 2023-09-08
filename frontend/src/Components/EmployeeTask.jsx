import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EmployeeTask() {
  return (
    <div>
         <nav className="navbar navbar-expand-lg navbar-light" >
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
            <li className="nav-item">
                <Link className="nav-link">
                  Feed
                </Link>
              </li> 
              <li className="nav-item">
                <Link className="nav-link" >
                 Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">
                  Task & Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">
                  Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link">
                 Profile
                </Link>
              </li>
              <li className="nav-item1">
                <button className="nav-link">
                 Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
        <div className='Task1-part'>
            <div className='leftpart1'>
            <h2>Your Task,</h2>
            <form className='task-form'>
                <label>Task Title:</label>
                <h4>.</h4>
                <label>Description:</label>
                 <h4>.</h4>
                <label>Deadline</label>
                <h4>.</h4>
            </form>
            </div>
            <div className='rightpart1'>
                <img src='/assets/images/task3.avif' className='rightpartimage' alt='image missing' />
            </div>

        </div>
        <div className='Task1-part'>
        <h2>Task Submission Guidelines</h2>
<p>
<strong>Task Title:</strong> Enter a concise and descriptive title for the task you are currently working for. Make it clear and specific so that anyone reading it can understand the task's purpose.
<br />
<strong>Description:</strong> Provide a detailed description of the task. Include information like what needs to be done, any specific requirements, and any additional context that would be helpful for the assignee.
<br />
Specify the deadline or due date for the task. Ensure it's realistic and achievable..... 
<strong>Assigned To:</strong> Select the primary person responsible for completing the task. This person will receive notifications and updates related to the task.
<br />
<strong>Additional Assignees:</strong> If more than one person is involved in the task, you can add additional assignees here.
<br />
<strong>Attachments:</strong> If there are any files or documents related to the task, you can attach them using the "Upload Files" option. This can include design files, documents, or any other relevant materials.
<br />
Submit Task: Once you've filled out all the necessary details, click the "Submit" button to create the task. It will be added to the task management system for tracking and monitoring.</p>

        </div>
    </div>
  )
}

export default EmployeeTask