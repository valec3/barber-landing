import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import LandingPage from './modules/landing/LandingPage';
import BookingPage from './modules/booking/BookingPage';
import AdminDashboard from './modules/admin/AdminDashboard';
import ServicesAdmin from './modules/admin/ServicesAdmin';
import BookingsAdmin from './modules/admin/BookingsAdmin';
import FirebaseSetup from './modules/admin/FirebaseSetup';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/services" element={<ServicesAdmin />} />
          <Route path="/admin/bookings" element={<BookingsAdmin />} />
          <Route path="/setup" element={<FirebaseSetup />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
