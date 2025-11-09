import React, { useState, useRef, useEffect } from 'react';
import styles from './profile_icon.module.css';
//import { useAuth } from "../../../context/AuthContext.jsx";
import { useAuth } from '../../context/AuthContext.jsx';

export default function ProfileIcon() {
  const [open, setOpen] = useState(false);
  const { handleLogout } = useAuth();
  const ref = useRef();

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.avatar} onClick={() => setOpen((s) => !s)}>P</div>
      {open && (
        <div className={styles.menu}>
          <div className={styles.item}>Profile</div>
          <div className={styles.item}>Settings</div>
          <div
            className={styles.item}
            onClick={async () => {
              try {
                await handleLogout();
              } catch (e) {
                console.error('Error during logout from menu:', e);
              } finally {
                setOpen(false);
              }
            }}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
