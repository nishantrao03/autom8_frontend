import React, { useState } from "react";
import styles from "./signup.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, callBackendLogin, setUserId, createUserInBackend } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailSignup() {
      try {
        setError("");
        setLoading(true);
        await signup(email, password);
  
        // Get Firebase ID token for the logged-in user
        const firebaseToken = await auth.currentUser.getIdToken();
  
        // Call the backend /login route with the Firebase token
        await callBackendLogin(firebaseToken);
        setUserId(auth.currentUser.uid);
        await createUserInBackend(auth.currentUser.uid);
        //navigate("/chat");
      } catch (e) {
        setError("Failed to create an account: " + e.message);
      }
      setLoading(false);
    }

  async function handleGoogleSignIn() {
      const provider = new GoogleAuthProvider();
      try {
        setError("");
        setLoading(true);
        //console.log("Opening Google popup...");
        const result = await signInWithPopup(auth, provider);
  
        // Get Firebase ID token for the Google user
        const firebaseToken = await result.user.getIdToken();
  
        // Call the backend /login route with the Firebase token
        await callBackendLogin(firebaseToken);
        setUserId(result.user.uid);
        await createUserInBackend(result.user.uid);
        console.log("User ID set in context:", result.user.uid);
        console.log("Google sign-in successful, navigating to /chat");
  
        //navigate("/chat");
      } catch (e) {
        setError("Failed to sign in with Google: " + e.message);
        console.error(e);
      }
      setLoading(false);
    }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up with AutoM8</h1>
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
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Log in here.</span>
        </p>

        <button disabled={loading} onClick={handleEmailSignup} className={styles.button}>
          Create Account
        </button>
      </div>

      <button onClick={handleGoogleSignIn} disabled={loading} type="button" className={styles.button}>
        Sign In With Google
      </button>
    </div>
  );
};

export default Signup;
