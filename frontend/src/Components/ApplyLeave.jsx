import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import axios from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";

function ApplyLeave() {
    const params = useParams();
    const [employee, setEmployee] = useState({});
    const { email } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setIsLoading(false)
        }, 1500);
        
        return () => clearTimeout(loadingTimeout);
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8081/employee/${email}`)
            .then((res) => setEmployee(res.data.Result[0]))
            .catch((err) => console.log(err));
    }, [email]);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const encodedEmail = encodeURIComponent(params.email);

        axios
            .put("http://localhost:8081/leave/" + encodedEmail, {
                leavetype: data.leavetype,  
                startdate: data.startdate,
                enddate: data.enddate,
                reason : data.reason
            })
            .then((res) => {
                if (res.data.Success) {   
                    navigate(`/Employee-dashboard/${encodedEmail}`);
                    console.log(res.data.Success);
                }
            })
            .catch((err) => console.log(err));
    };

    const [data, setData] = useState({
        leavetype: "",   
        startdate: "",
        enddate: "",
        reason:"",
    });

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <div className='ApplyLeave'>
                        <div className='text-left'>
                            <h2>Apply Leave</h2>
                        </div>
                        <div className='image-right'>
                            <div className="rounded-profile1">
                                <img
                                    src={`http://localhost:8081/images/` + employee.image}
                                    alt="Upload Image"
                                    className="nav-image"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='Leave-Form'>
                        <form className='leave-req-form' name='form' onSubmit={handleSubmit}>
                            <label>Type</label>
                            <input
                                placeholder='WFH , Sick Leave , Personal'
                                value={data.leavetype}
                                onChange={(e) => { setData({...data, leavetype:e.target.value})}}
                                required
                            /> 

                            <label>From</label>
                            <input
                                type='date'
                                value={data.startdate}
                                onChange={(e) => { setData({...data, startdate:e.target.value})}}
                                required
                            />

                            <label>To</label>
                            <input
                                type='date'
                                value={data.enddate}
                                onChange={(e) => { setData({...data, enddate:e.target.value})}}
                                required
                            />
                        
                            <label>Reason</label>
                            <textarea
                                value={data.reason}
                                onChange={(e) => { setData({...data, reason:e.target.value})}}
                                required
                            />

                            <button type='submit'>Apply</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApplyLeave;
