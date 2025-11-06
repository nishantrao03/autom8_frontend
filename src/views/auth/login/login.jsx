import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

const Login = () => {
  const navigate = useNavigate();
<<<<<<< HEAD
  const { login } = useAuth();
=======
  const { login, callBackendLogin, setUserId } = useAuth();
>>>>>>> 68e5ed4 (Auth with basic Chatpage implemented)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin() {
    try {
      setError("");
      setLoading(true);
      await login(email, password);
<<<<<<< HEAD
      navigate("/chat");
    } catch {
      setError("Failed to log in");
=======

      // Get Firebase ID token for the logged-in user
      const firebaseToken = await auth.currentUser.getIdToken();

      // Call the backend /login route with the Firebase token
      await callBackendLogin(firebaseToken);
      setUserId(auth.currentUser.uid);
      console.log("User ID set in context:", auth.currentUser.uid);
      console.log("Email/Password login successful, navigating to /chat");

      //navigate("/chat");
    } catch (e) {
      setError("Failed to log in" + e.message);
>>>>>>> 68e5ed4 (Auth with basic Chatpage implemented)
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      setError("");
      setLoading(true);
<<<<<<< HEAD
      await signInWithPopup(auth, provider);
      navigate("/chat");
    } catch (e) {
      setError("Failed to sign in with Google: " + e.message);
=======
      //console.log("Opening Google popup...");
      const result = await signInWithPopup(auth, provider);

      // Get Firebase ID token for the Google user
      const firebaseToken = await result.user.getIdToken();

      // Call the backend /login route with the Firebase token
      await callBackendLogin(firebaseToken);
      setUserId(result.user.uid);
      console.log("User ID set in context:", result.user.uid);
      console.log("Google sign-in successful, navigating to /chat");

      //navigate("/chat");
    } catch (e) {
      setError("Failed to sign in with Google: " + e.message);
      console.error(e);
>>>>>>> 68e5ed4 (Auth with basic Chatpage implemented)
    }
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login to AutoM8</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          className={styles.inputField}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.inputField}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className={styles.signupText}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/signup")}>Create one.</span>
        </p>

        <button disabled={loading} onClick={handleEmailLogin} className={styles.button}>
          Login
        </button>
      </div>
      <button onClick={handleGoogleSignIn} disabled={loading} type="button" className={styles.button}>
        Sign In With Google
      </button>
    </div>
  );
};

export default Login;
