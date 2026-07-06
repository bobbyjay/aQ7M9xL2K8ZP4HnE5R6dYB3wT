// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmailPage from './pages/VerifyEmailPage';
import Home from './pages/Home';
import Profile from './pages/Profile';
import WithdrawalPage from './pages/Withdrawal';
import DepositPage from './pages/Deposit';
import BetPage from './pages/Bet';
import SupportPage from './pages/Support';
import ProtectedRoute from './components/ProtectedRoute'; 
import CustomerSupportPage from './pages/customerSupport';
import TermsOfService from './pages/termsOfService';
import Sports from './pages/sports';
import About from './pages/About';
import SearchResults from './pages/SearchResults';
import NotFound from './pages/NotFound';

// ---------------------------
// Root redirect (safe)
// ---------------------------
function RootRedirect() {
  const { loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) return null;

  const target = isAuthenticated ? "/bets" : "/home";

  // If already on the correct page, render nothing
  if (location.pathname === target) {
    return null;
  }

  return <Navigate to={target} replace />;
}

export default function App() {
  return (
    <BrowserRouter>            
      <AuthProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/support-page" element={<CustomerSupportPage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />
          <Route path="/search-results" element={<SearchResults />} />

          <Route
            path="/sports"
            element={
              <ProtectedRoute>
                <Sports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/withdrawal"
            element={
              <ProtectedRoute>
                <WithdrawalPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/deposit"
            element={
              <ProtectedRoute>
                <DepositPage />
              </ProtectedRoute> 
            }
          />

          <Route
            path="/bets"
            element={
              <ProtectedRoute>
                <BetPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportPage />
              </ProtectedRoute>
            }
          />

          {/* Root redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
