<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from "react-router-dom";
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
>>>>>>> 68e5ed4 (Auth with basic Chatpage implemented)
import LandingPage from './views/landing_page/landing_page.jsx';
import Login from './views/auth/login/login.jsx';
import Signup from './views/auth/signup/signup.jsx';
import './App.css';
<<<<<<< HEAD
import ChatPage from "./views/chat_page.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

//Anything other than /, /login and /signup should be redirected to / if not authenticated

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/chat" 
          element={
            <PrivateRoute>
              <ChatPage />
            </PrivateRoute>
=======
import ChatPage from "./views/chat_page/chat_page.jsx";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  const {
    isAuthenticated,
    userId,
    setUserId,
    checkAccessToken,
    checkRefreshToken,
    setIsAuthenticated,
    logout,
  } = useAuth();

  // useEffect(() => {
  //   //let mounted = true;
  //   console.log("App useEffect triggered for userId:", userId);

  //   async function validateTokens() {
  //     // If userId is null, treat as unauthenticated
  //     if (!userId) {
  //       setIsAuthenticated(false);
  //       //setIsAuthenticated && console.debug('No userId — marked unauthenticated');
  //       return;
  //     }
  //     //console.log("Reached here");

  //     try {
  //       // First check access token via AuthContext helper
  //       const accessOk = await checkAccessToken();
  //       console.log("Access token valid:", accessOk);
  //       //if (!mounted) return;
  //       if (accessOk) {
  //         setIsAuthenticated(true);
  //         return;
  //       }
  //       //console.log("Access token invalid/expired, trying refresh...");

  //       // Access token invalid/expired — try refresh
  //       const refreshOk = await checkRefreshToken();
  //       //if (!mounted) return;
  //       if (refreshOk) {
  //         setIsAuthenticated(true);
  //         return;
  //       }

  //       // Both checks failed — clear auth
  //       await logout().catch(() => {});
  //       setUserId(null);
  //       setIsAuthenticated(false);
  //     } catch (err) {
  //       // On error, clear auth to be safe
  //       await logout().catch(() => {});
  //       setUserId(null);
  //       setIsAuthenticated(false);
  //     }
  //   }

  //   validateTokens();

    
  // }, [userId]);

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} /> */}
        <Route
          path="/chat"
          element={
            isAuthenticated ? <ChatPage /> : <Navigate to="/"  />
          }
        />
        <Route
          path="/"
          element={
            (!isAuthenticated) ? <LandingPage /> : <Navigate to="/chat"  />
          }
        />
        <Route
          path="/login"
          element={
            (!isAuthenticated) ? <Login /> : <Navigate to="/chat"  />
          }
        />
        <Route
          path="/signup"
          element={
            (!isAuthenticated) ? <Signup /> : <Navigate to="/chat"  />
>>>>>>> 68e5ed4 (Auth with basic Chatpage implemented)
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
