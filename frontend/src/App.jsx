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
import Feed from './Components/Feed';
import EmployeeFeed from './Components/EmployeeFeed'
function App() {
  
  return (
    <div className="App">
  <Router>
    <Routes>
      <Route path="/Login" element={<SignIn />} />
      <Route path="/Register" element={<SignUp />} />
      <Route path="/Termsandcondition-page" element={<TermsCondition />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/CRUD-employee" element={<Employee />} />
      <Route path="/Edit-Employee/:email" element={<Edit />} />
      <Route path="/Task-Project/:email" element={<EmployeeTask />} />
      <Route path="/Employee-profile/:email" element={<EmpProfile />} />
      <Route path="/Employee-dashboard/:email" element={<Empdashboard />} />
      <Route path='/EmployeeEditOption/:email' element={<EditEmployee />} />
      <Route path='/AssignTask/:email' element={<TaskfromManager />} />
      <Route path='/Feed' element={<Feed />} />
      <Route path='/Employee-Feed/:email' element={<EmployeeFeed />} />
    </Routes>
    </Router>


   
    </div>
  );
}

export default App;
