import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// Context
import { AuthProvider } from '@/context/AuthContext';

// Components
import ProtectedRoute from '@/shared/components/ProtectedRoute';

// Pages
import LandingPage from '@/modules/landing/LandingPage';
import BookingPage from '@/modules/booking/BookingPage';
import LoginPage from '@/modules/auth/LoginPage';
import AdminDashboard from '@/modules/admin/AdminDashboard';
import ServicesAdmin from '@/modules/admin/ServicesAdmin';
import BookingsAdmin from '@/modules/admin/BookingsAdmin';
import FirebaseSetup from '@/modules/admin/FirebaseSetup';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/services"
              element={
                <ProtectedRoute>
                  <ServicesAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <ProtectedRoute>
                  <BookingsAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/setup"
              element={
                <ProtectedRoute>
                  <FirebaseSetup />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
