import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
function TaskSubmit() {
  const { email } = useParams();
  const params = useParams();
  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500)
    return () => {
      clearTimeout(loadingTimeout);
    }
  })
  const [data , setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/getEmployee")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleStatusUpdate = async (name) => {
    const selectedStatus = document.getElementById(`approval-${name}`).value;

    try {
      await axios.put(`http://localhost:8081/taskapproval/${name}`, {
        status: selectedStatus,
      });

      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='whole-sub'>
          <div className='ApplyLeave'>
            <div className='text-left'>
              <h2>Submitted Task,</h2>
            </div>
 
          </div>
          <div className='task-submit-list'>
  <table className='custom-table'>
    <thead>
      <tr>
        <th className='custom-table-header'>Name</th>
        <th className='custom-table-header'>Title</th>
        <th className='custom-table-header'>Description</th>
        <th className='custom-table-header'>Status</th>
        <th className='custom-table-header'>Approval</th>
      </tr>
    </thead>
    <tbody>
  {data
    .filter((employee) => employee.taskDescription) 
    .map((employee, index) => (
      <tr key={index}>
        <td className='custom-table-cell'>{employee.name}</td>
        <td className='custom-table-cell'>{employee.projecttitle}</td>
        <td className='custom-table-cell'>{employee.taskDescription}<br />
        <strong>{employee.taskStatus}</strong>
        </td>
        <td className='custom-table-cell'>{employee.taskApproval}<br /></td>
        <td className='custom-table-cell'>  
          {" "}
          <select id={`approval-${employee.name}`}>
            <option>Select</option>
            <option value='Approved'>Approved</option>
            <option value='Rejected'>Rejected</option>
            <option value='Pending'>Pending</option>
          </select>
          <td
            className='approve1'
            onClick={() => handleStatusUpdate(employee.name)}
          >
            <FontAwesomeIcon icon={faCheckSquare} />
          </td>
        </td>
      </tr>
    ))}
</tbody>






  </table>
</div>

        </div>
      )}
    </div>
  )
}

export default TaskSubmit