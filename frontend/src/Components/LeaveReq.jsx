import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
import { Link,useParams } from 'react-router-dom';

function LeaveReq() {
  const { email } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [manager, setManager] = useState({});
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

      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredData = data.filter(
    (employee) =>
      employee.leavetype && employee.startdate && employee.enddate && employee.reason
  );

  useEffect(() => {
    axios
      .get(`http://localhost:8081/manager/${email}`)
      .then((res) => {
        console.log('API Response:', res.data); // Log the entire response
        if (res.data && res.data.Result && res.data.Result.length > 0) {
          setManager(res.data.Result[0]);
        } else {
          console.error("Manager data not found");
        }
      })
      .catch((err) => console.log(err));
  }, [email]);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
  <div className='db-header'> 
                <div className='db-top'>
                    <h2>A2Cloud</h2>
                </div>
                <div className='dp-top-img'>
                <img src={`http://localhost:8081/images/` + manager.image}  className="logoff-image"/>
 
                </div>
                <div className='Nav-bar-header'> 
                 <ul className='head-content-ul'>
                    <li  className='head-content-li'>
                        <img src='/assets/images/dashboard-navbar.png' className='db-dash' alt='db-db'/>
                        <Link  to={`/Manager-dashboard/${email}`}>
                    Dashboard
                  </Link>
                    </li>
                    <li className='head-content-li'>
                    <img src='/assets/images/nav-bar-employee.png' className='db-dash1' alt='db-emp'/>
                    <Link  to={`/CRUD-employee/${email}`}>
                   Employees
                  </Link>
                    </li>
                    <li className='head-content-li'>
                    <img src='/assets/images/calendar-navbar.png' className='db-dash' alt='db-emp'/>
                     calendar
                    </li>
                    <li className='head-content-li'>
                    <img src='/assets/images/time-sheet-navbar.png' className='db-dash' alt='db-emp'/>
                        Time Sheet
                    </li>
                    <li className='head-content-li'>
                    <img src='/assets/images/nav-bar-profile.png' className='db-dash1' alt='db-emp'/>
                    <Link  to={`/profile/${email}`}>
                    Profile
                  </Link>
                    </li>
                 </ul>
               </div>
               </div>
               <div className='db-content'>
                <div className='content-title'>
                 <p>Home / Manager</p>
                 <h5>Leave Request</h5>
             </div>

             <div className="employe-contnt">
              <div className="left-emp-cnt">
          <p>List !</p>
              </div>
              <div className="right-emp-cnt">
              <img src="/assets/images/format.png" alt="add-image" className="format" />
              <button>Do Action</button>
           
              </div>
             </div>

               </div>
               <div>
               {filteredData.length > 0 && (
    <table  className='custom-table'>
      {/* Table Header */}
      <thead className='Leave-head'>
        <tr>
          <th className='custom-table-header'>Name</th>
          <th className='custom-table-header'>LeaveType</th>
          <th className='custom-table-header'>From</th>
          <th className='custom-table-header'>Upto</th>
          <th className='custom-table-header'>Reason</th>
          <th className='custom-table-header'>Do Action</th>
          <th className='custom-table-header'>Update</th>
          <th className='custom-table-header'>Manager Status</th>
        </tr>
      </thead>
      {/* Table Body */}
      <tbody >
        {filteredData.map((employee, index) => (
          <tr key={index}>
            <td className='custom-table-cell'>{employee.name}</td>
            <td className='custom-table-cell'>{employee.leavetype}</td>
            <td className='custom-table-cell'>{employee.startdate}</td>
            <td className='custom-table-cell'>
{new Date(employee.enddate).toISOString().split('T')[0]}
</td>

            <td className='custom-table-cell'>{employee.reason}</td>
            <td className='custom-table-cell'>
              {" "}
              <select id={`status-${employee.name}`}>
                <option>Select</option>
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
            <td className='custom-table-cell'>{employee.status}</td>
          </tr>
        ))}
      </tbody>
    </table>

)}
               </div>
        </div>


      )}
    </div>
  )
}
export default LeaveReq;

