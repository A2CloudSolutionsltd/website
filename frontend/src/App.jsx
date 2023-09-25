import './App.css';
import  {
  BrowserRouter as Router,
  Routes,
  Route, 
}from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import SignIn from './Components/SignIn';
import TermsCondition from './Components/TermsCondition';
import Dashboard from './Components/Dashboard';
import Employee from './Components/Employee';
import Profile from './Components/Profile';
import Edit from './Components/Edit';
import Empdashboard from './Components/Empdashboard';
import EmpProfile from './Components/EmpProfile';
import EditEmployee from './Components/EditEmployee';
import EmployeeTask from './Components/EmployeeTask';
import TaskfromManager from './Components/TaskfromManager';
import SignUp from './Components/SignUp';
import EmployeeFeed from './Components/EmployeeFeed';
import ApplyLeave from './Components/ApplyLeave';
import LeaveReq from './Components/LeaveReq';
import Teams from './Components/Teams';
import AddManager from './Components/AddManager';
import ManagerEditProfile from './Components/ManagerEditProfile';
function App() {
  
  return (
    <div className="App">
  <Router>
    <Routes>
      <Route path="/Login" element={<SignIn />} />
      <Route path="/Register" element={<SignUp />} />
      <Route path="/Termsandcondition-page" element={<TermsCondition />} />
      <Route path="/dashboard/:email" element={<Dashboard />} />
      <Route path="/profile/:email" element={<Profile />} />
      <Route path="/CRUD-employee/:email" element={<Employee />} />
      <Route path="/Edit-Employee/:email" element={<Edit />} />
      <Route path="/Task-Project/:email" element={<EmployeeTask />} />
      <Route path="/Employee-profile/:email" element={<EmpProfile />} />
      <Route path="/Employee-dashboard/:email" element={<Empdashboard />} />
      <Route path='/EmployeeEditOption/:email' element={<EditEmployee />} />
      <Route path='/AssignTask/:email' element={<TaskfromManager />} />
      <Route path='/View-Team' element={<Teams />} />
      <Route path='/Employee-Feed/:email' element={<EmployeeFeed />} />
      <Route path='/ApplyLeave/:email' element={<ApplyLeave />} />
      <Route path='/Employee-Leave-Request' element={<LeaveReq />} />
      <Route path='/Add-Manager' element={<AddManager />} />
      <Route path='/Manager-Profile/:email' element={<ManagerEditProfile />} />
    </Routes>
    </Router>


   
    </div>
  );
}

export default App;
