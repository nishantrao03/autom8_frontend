import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userId, setUserId] = useState(() => {
    // Load from localStorage on initial mount
    const storedId = localStorage.getItem("userId");
    return storedId ? storedId : null;
  });
  // const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    localStorage.removeItem("userId");
    return signOut(auth);
  }

  async function callBackendLogin(firebaseToken) {
    try {
      await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        credentials: "include", // ensures cookies are stored
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firebaseToken }),
      });
      console.log("Successfully called backend /login");
    } catch (err) {
      console.error("Error calling backend /login:", err);
    }
  }
  /*
  useEffect(() => {
    console.log("Auth state changed, userId:", userId);
    if (!userId) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    (async () => {
      try {
        // Check access token validity
        const accessResp = await fetch(`${BACKEND_URL}/access-token`, {
          method: "GET",
          credentials: "include",
        });
        console.log(accessResp);
        console.log("Access token validation response status:", accessResp.status);

        if (accessResp.ok) {
          console.log("Access token valid");
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        // If access token invalid/expired, try refreshing
        if (accessResp.status === 401 || accessResp.status === 403) {
          const refreshResp = await fetch(`${BACKEND_URL}/refresh-token`, {
            method: "POST",
            credentials: "include",
          });

          if (refreshResp.ok) {
            console.log("Access token refreshed");
            setIsAuthenticated(true);
            setLoading(false);
            return;
          }

          // Refresh failed -> clear auth state
          await logout().catch(() => {});
          console.log("Refresh token invalid, logged out");
          setUserId(null);
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Any other response: treat as unauthenticated
        await logout().catch(() => {});
        setUserId(null);
        setIsAuthenticated(false);
      } catch (err) {
        // Network or unexpected error -> clear auth to be safe
        await logout().catch(() => {});
        setUserId(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);
  */

//   useEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // Call the callBackendLogin to set cookies when user state changes
//       const firebaseToken = user.getIdToken();
//       callBackendLogin(firebaseToken);
//       setUserId(user.uid);
//     } else {
//       setUserId(null);
//     }
//     setLoading(false);
//   });
//   return unsubscribe;
// }, []);

  //  Persist userId whenever it changes
  useEffect(() => {
    if (userId) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

    useEffect(() => {
    console.log("Auth check running for userId:", userId);

    // If there's no userId, unauthenticate immediately
    if (!userId) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    // Run token checks when userId is present
    (async () => {
      try {
        const isAccessValid = await checkAccessToken();

        if (isAccessValid) {
          console.log("Access token valid");
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        console.log("Access token expired, trying refresh...");

        const isRefreshValid = await checkRefreshToken();

        if (isRefreshValid) {
          console.log("Access token refreshed successfully");
          setIsAuthenticated(true);
          setLoading(false);
          return;
        }

        console.log("Refresh token invalid — logging out");
        await logout().catch(() => {});
        setUserId(null);
        setIsAuthenticated(false);
      } catch (err) {
        console.error("Auth validation error:", err);
        await logout().catch(() => {});
        setUserId(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);



  // Separate functions to check tokens — callable from components
  async function checkAccessToken() {
    try {
      const resp = await fetch(`${BACKEND_URL}/access-token`, {
        method: 'GET',
        credentials: 'include',
      });
      // return true if access token is valid
      return resp.ok;
    } catch (err) {
      console.error('checkAccessToken error:', err);
      return false;
    }
  }

  async function checkRefreshToken() {
    try {
      const resp = await fetch(`${BACKEND_URL}/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });
      // return true if refresh token successfully refreshed access token
      return resp.ok;
    } catch (err) {
      console.error('checkRefreshToken error:', err);
      return false;
    }
  }


  const value = {
    userId,
    setUserId,
    isAuthenticated,
    login,
    signup,
    logout,
    callBackendLogin,
    checkAccessToken,
    checkRefreshToken,
    setIsAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
