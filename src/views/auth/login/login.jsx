import React, { useState } from "react";
import styles from "./login.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext.jsx";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleEmailLogin() {
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/chat");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();
    try {
      setError("");
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate("/chat");
    } catch (e) {
      setError("Failed to sign in with Google: " + e.message);
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
