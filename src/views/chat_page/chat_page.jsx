import React, { useState } from 'react';
import LeftSidebar from '../../components/left_sidebar/left_sidebar.jsx';
import RightSidebar from '../../components/right_sidebar/right_sidebar.jsx';
import ProfileIcon from '../../components/profile_icon/profile_icon.jsx';
import styles from './chat_page.module.css';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function ChatPage() {
  // sample chats for UI preview
  const sampleChats = [
    {
      id: 'c1',
      title: 'Project discussion',
      lastMessage: 'Sure — I will share the design.',
      messages: [
        { sender: 'user', text: 'Can you share the design?' },
        { sender: 'assistant', text: 'Sure — I will share the design.' },
      ],
    },
    {
      id: 'c2',
      title: 'Meeting notes',
      lastMessage: 'Thanks for the update!',
      messages: [
        { sender: 'user', text: 'Here are the meeting notes.' },
        { sender: 'assistant', text: 'Thanks for the update!' },
      ],
    },
  ];

  const [chats] = useState(sampleChats);
  const [activeChatId, setActiveChatId] = useState(null); // null => new chat

  const selectedChat = chats.find((c) => c.id === activeChatId) || null;

  function handleNewChat() {
    setActiveChatId(null);
  }

  function handleSelectChat(id) {
    setActiveChatId(id);
  }

  return (
    <div className={styles.container}>
      <LeftSidebar
        chats={chats}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
        activeChatId={activeChatId}
      />

      <div className={styles.mainArea}>
        <div className={styles.headerRight}>
          <ProfileIcon />
        </div>
        <RightSidebar chat={selectedChat} />
      </div>
    </div>
  );
}

export default ChatPage;
