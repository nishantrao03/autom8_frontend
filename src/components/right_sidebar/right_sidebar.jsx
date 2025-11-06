import React from 'react';
import styles from './right_sidebar.module.css';

export default function RightSidebar({ chat }) {
  return (
    <main className={styles.wrapper}>
      {!chat && (
        <div className={styles.empty}>Hello, how can I assist you today?</div>
      )}

      {chat && (
        <div className={styles.chatArea}>
          {chat.messages.map((m, idx) => (
            <div
              key={idx}
              className={m.sender === 'user' ? styles.userMessage : styles.assistantMessage}
            >
              {m.text}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
