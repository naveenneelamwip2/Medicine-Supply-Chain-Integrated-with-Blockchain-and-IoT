import { CssVarsProvider } from '@mui/joy/styles'; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInSide from "./pages/SignInSide";
import Dashboard from "./pages/dashboard/Dashboard";
import MyProfile from './pages/dashboard/components/MyProfile';
import './App.css';
import CreateMedicine from './pages/dashboard/CreateMedicine';

function App() {
  return (
    <CssVarsProvider>  
      <Router>
        <Routes>
          <Route path="/"  Component={SignInSide} />
          <Route path="/dashboard"  Component={Dashboard} />
          <Route path="/medicines"  Component={Dashboard} />
          <Route path="/profile-dashboard"  Component={MyProfile} />
          <Route path="/create-medicine"  Component={CreateMedicine} />
        </Routes>
      </Router>
    </CssVarsProvider>
  )
}

export default App;
