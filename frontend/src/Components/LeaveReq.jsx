import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

function LeaveReq() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, []);

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

  const handleStatusUpdate = async (name) => {
    const selectedStatus = document.getElementById(`status-${name}`).value;

    try {
      await axios.put(`http://localhost:8081/leaveaproval/${name}`, {
        status: selectedStatus,
      });

      console.log('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredData = data.filter(
    (employee) =>
      employee.leavetype && employee.startdate && employee.enddate && employee.reason
  );

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div  className='whole-task'>
          <div className='Leave-req-head'>
            <h3>Leave Request</h3>
          </div>

          {filteredData.length > 0 && (
            <div className='task-submit-list'>
              <table  className='custom-table'>
                {/* Table Header */}
                <thead className='Leave-head'>
                  <tr>
                    <th className='custom-table-header'>Name</th>
                    <th className='custom-table-header'>LeaveType</th>
                    <th className='custom-table-header'>From</th>
                    <th className='custom-table-header'>Upto</th>
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
                      <td className='custom-table-cell'>{employee.leavetype}</td>
                      <td className='custom-table-cell'>{employee.startdate}</td>
                      <td className='custom-table-cell'>{employee.enddate}</td>
                      <td className='custom-table-cell'>{employee.reason}</td>
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
  );
}

export default LeaveReq;
