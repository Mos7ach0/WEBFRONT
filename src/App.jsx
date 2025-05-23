import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import UserProfile from './components/UserProfile.jsx';
import UserManagement from './components/userManagement.jsx';


const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route 
        path="/profile" 
        element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/users" 
        element={
          <PrivateRoute>
            <UserManagement />
          </PrivateRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

