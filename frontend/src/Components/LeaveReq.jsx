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
        <div>
          <div className='Leave-req-head'>
            <h3>Leave Request</h3>
          </div>

          {filteredData.length > 0 && (
            <div className='Leave-List'>
              <table>
                {/* Table Header */}
                <thead className='Leave-head'>
                  <tr>
                    <th>Name</th>
                    <th>LeaveType</th>
                    <th>From</th>
                    <th>Upto</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Update</th>
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className='leave-body'>
                  {filteredData.map((employee, index) => (
                    <tr key={index}>
                      <td>{employee.name}</td>
                      <td>{employee.leavetype}</td>
                      <td>{employee.startdate}</td>
                      <td>{employee.enddate}</td>
                      <td>{employee.reason}</td>
                      <td>
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
