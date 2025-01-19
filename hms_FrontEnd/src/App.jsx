import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Login1 from './Pages/Login/Login1';
import UserAccount from './Pages/UserAccount/UserAccount';
import RouteTitle from './Components/RouteTitle';
import ApplyForm from './Pages/ApplyForm/ApplyForm';
import './App.css';


const App = () => {
  return (
    <Router>
      <RouteTitle/>
      <Routes>
        <Route path="/" element={<Home/>} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login/>} />
      </Routes>
      <Routes>
        <Route path="/login1" element={<Login1/>} />
      </Routes>
      <Routes>
        <Route path="/useraccount" element={<UserAccount/>} />
      </Routes>
      <Routes>
        <Route path="/applyform" element={<ApplyForm/>} />
      </Routes>
    </Router>

  );

}

export default App
