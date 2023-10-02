import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
function Timesheet() {
    const [isLoading , setIsLoading] = useState(true);
    useEffect(()=>{
        const loadingTimeout = setTimeout(()=>{
            setIsLoading(false)
        },1500)
        return()=>{
        clearTimeout(loadingTimeout);
        }
    })
    const [data, setData] = useState([]);

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
    const filteredData = data.filter(
        (employee) =>
          employee.Ddescription 
      );
      const handleStatusUpdate = async (name) => {
        const selectedStatus = document.getElementById(`status-${name}`).value;
    
        try {
          await axios.put(`http://localhost:8081/timeaproval/${name}`, {
            status: selectedStatus,
          });
    
          console.log('Status updated successfully');
        } catch (error) {
          console.error('Error updating status:', error);
        }
      };
  return (
    <div>
       {isLoading ? (
        <Loader/>
       ):(
        <div className='whole-sub'>
          <div className='ApplyLeave'>
            <div className='text-left'>
              <h2>Time Sheet</h2>
            </div>
 
          </div>
          <div className='task-submit-list'>
  <table className='custom-table'>
    <thead>
      <tr>
        <th className='custom-table-header'>Name</th>
        <th className='custom-table-header'>Login</th>
        <th className='custom-table-header'>Logout</th>
        <th className='custom-table-header'>Hours Worked</th>
      </tr>
    </thead>
    <tbody>
      {data.map((empoyee, index) => (
        <tr key={index}>
          <td className='custom-table-cell'>{empoyee.name}</td>
          <td className='custom-table-cell'>{empoyee.login}</td>
          <td className='custom-table-cell'>{empoyee.logout}</td>
          <td className='custom-table-cell'>{empoyee.totalhours}<strong>Hrs</strong></td>

        </tr>
      ))}
    </tbody>
  </table>
</div>
<div className='ApplyLeave'>
            <div className='text-left'>
              <h2>Time Changes</h2>
            </div>
 
          </div>
          {filteredData.length > 0 && (
            <div className='task-submit-list'>
              <table  className='custom-table'>
                {/* Table Header */}
                <thead className='Leave-head'>
                  <tr>
                    <th className='custom-table-header'>Name</th>
                    <th className='custom-table-header'>New-Login</th>
                    <th className='custom-table-header'>New-Logout</th>
                    <th className='custom-table-header'>Hours</th>
                    <th className='custom-table-header'>Reason</th>
 
                    <th className='custom-table-header'>Status</th>
                    <th className='custom-table-header'>Update</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody >
                  {filteredData.map((employee, index) => (
                    <tr key={index}>
                      <td className='custom-table-cell'>{employee.name}</td>
                      <td className='custom-table-cell'>{employee.login}</td>
                      <td className='custom-table-cell'>{employee.logout}</td>
                      <td className='custom-table-cell'>{employee.totalhours}</td>
                      <td className='custom-table-cell'>{employee.Ddescription}</td>
                      <td className='custom-table-cell'>
                        {" "}
                        <select id={`status-${employee.name}`}>
                          <option value='Approved'>Approved</option>
                          <option value='Rejected'>Rejected</option>
                        </select>
                      </td>
                      <td
                        className='approve'
                        onClick={() => handleStatusUpdate(employee.name)}
                      >
                        <FontAwesomeIcon icon={faCheckSquare} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
       )}
    </div>
  )
}

export default Timesheet