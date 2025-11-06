import React from 'react';
import styles from './left_sidebar.module.css';

export default function LeftSidebar({ chats = [], onSelectChat, onNewChat, activeChatId }) {
  return (
    <aside className={styles.wrapper}>
      <div className={styles.header}>
        <button className={styles.newChatBtn} onClick={onNewChat}>+ New Chat</button>
      </div>

      <div className={styles.list}>
        {chats.map((c) => (
          <div
            key={c.id}
            className={c.id === activeChatId ? `${styles.chatItem} ${styles.active}` : styles.chatItem}
            onClick={() => onSelectChat(c.id)}
          >
            <div className={styles.avatar}>{c.title?.charAt(0) || 'C'}</div>
            <div className={styles.meta}>
              <div className={styles.title}>{c.title}</div>
              <div className={styles.subtitle}>{c.lastMessage}</div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
