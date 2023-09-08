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
import LoginAdEmp from './Components/LoginAdEpm';
import StartEmployeeDB from './Components/StartEmployeeDB';
import Empdashboard from './Components/Empdashboard';
import EmpProfile from './Components/EmpProfile';
import EditEmployee from './Components/EditEmployee';
import EmployeeTask from './Components/EmployeeTask';
import Globaladdress from './Components/Globaladdress';

function App() {
  
  return (
    <div className="App">
  <Router>
    <Routes>
      <Route path="/Login" element={<SignIn />} />
      <Route path="/Termsandcondition-page" element={<TermsCondition />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/CRUD-employee" element={<Employee />} />
      <Route path="/Edit-Employee/:email" element={<Edit />} />
      <Route path="/" element={<LoginAdEmp />} />
      <Route path="/TaskandProject" element={<EmployeeTask />} />
      <Route path="/Employee-profile/:email" element={<EmpProfile />} />
      <Route path="/Employee-SignUp" element={<StartEmployeeDB />} />
      <Route path="/Employee-dashboard/:email" element={<Empdashboard />} />
      <Route path='/EmployeeEditOption/:email' element={<EditEmployee />} />
      <Route path='/globalsearch' element={<Globaladdress />} />
    </Routes>
    </Router>


   
    </div>
  );
}

export default App;
