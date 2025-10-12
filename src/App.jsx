import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './views/landing_page/landing_page.jsx';
import Login from './views/auth/login/login.jsx';
import Signup from './views/auth/signup/signup.jsx';
import './App.css';
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
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
