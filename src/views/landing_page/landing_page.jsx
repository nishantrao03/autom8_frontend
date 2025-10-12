import React from 'react';
import styles from './landing_page.module.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AutoM8</h1>
      <p className={styles.tagline}>Automate your tasks, amplify your time.</p>
      <button className={styles.button} onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
