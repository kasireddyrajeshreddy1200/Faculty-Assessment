import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterUser from './pages/RegisterUser';
import FacultyProfile from './pages/FacultyProfile';
import FacultyDashboard from './pages/FacultyDashboard';
import FacultyProfileView from './pages/FacultyProfileView';
import FacultyContributions from './pages/FacultyContributions';
import AddContribution from './pages/AddContribution';
import EvaluatorDashboard from './pages/EvaluatorDashboard';
import PendingContributions from './pages/PendingContributions';
import EvaluateContribution from './pages/EvaluateContribution';
import FinalEvaluation from './pages/FinalEvaluation';
import FacultyFinalEvaluations from './pages/FacultyFinalEvaluations';
import EvaluatorProfile from './pages/EvaluatorProfile';
import EvaluatorProfileView from './pages/EvaluatorProfileView';
import EditContribution from './pages/EditContribution';
import FacultyYearReport from './pages/FacultyYearReport';
import AdminSystemReport from './pages/AdminSystemReport';
import AdminCategoryReport from './pages/AdminCategoryReport';
import EvaluatorFacultyReport from './pages/EvaluatorFacultyReport';


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

      <Route
        path="/faculty/contributions"
        element={
          <ProtectedRoute allowedRoles={['FACULTY']}>
            <FacultyContributions />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/contributions/add"
        element={
          <ProtectedRoute allowedRoles={['FACULTY']}>
            <AddContribution />
          </ProtectedRoute>
        }
      />

      <Route
        path="/evaluator"
        element={
          <ProtectedRoute allowedRoles={['EVALUATOR']}>
            <EvaluatorDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="pending" element={<PendingContributions />} />
        <Route path="evaluate/:id" element={<EvaluateContribution />} />
        <Route path="final" element={<FinalEvaluation />} />
      </Route>

<Route
  path="/faculty/final-evaluations"
  element={<FacultyFinalEvaluations />}
/>

<Route path="/evaluator/profile" element={<EvaluatorProfile />} />
<Route path="/evaluator/profile/view" element={<EvaluatorProfileView />} />
<Route
  path="/faculty/contributions/edit/:id"
  element={
    <ProtectedRoute allowedRoles={['FACULTY']}>
      <EditContribution />
    </ProtectedRoute>
  }
/>

<Route path="/faculty/report" element={<FacultyYearReport />} />
<Route path="/admin/system-report" element={<AdminSystemReport />} />
<Route path="/admin/category-report" element={<AdminCategoryReport />} />
<Route path="/evaluator/faculty-report" element={<EvaluatorFacultyReport />} />



      </Routes>
    </BrowserRouter>

  );
}

export default App;
