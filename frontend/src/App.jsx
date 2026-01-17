import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterUser from './pages/RegisterUser';
import FacultyProfile from './pages/FacultyProfile';
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyProfileView from './pages/FacultyProfileView';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/register"
          element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
              <RegisterUser />
          </ProtectedRoute>
          }
        />
        
        <Route
            path="/faculty/profile"
            element={
              <ProtectedRoute allowedRoles={['FACULTY']}>
                <FacultyProfile />
              </ProtectedRoute>
            }
        />

        <Route
  path="/faculty"
  element={
    <ProtectedRoute allowedRoles={['FACULTY']}>
      <FacultyDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/faculty/profile/view"
  element={
    <ProtectedRoute allowedRoles={['FACULTY']}>
      <FacultyProfileView />
    </ProtectedRoute>
  }
/>


      </Routes>
    </BrowserRouter>

  );
}

export default App;
