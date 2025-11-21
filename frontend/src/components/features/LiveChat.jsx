import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Send } from 'lucide-react';

function LiveChat({ courseId, user }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.emit('join-chat', { courseId });

    newSocket.on('new-message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => newSocket.close();
  }, [courseId]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    socket.emit('send-message', {
      courseId,
      message: newMessage,
      user: user.name,
    });

    setNewMessage('');
  };

  return (
    <div className="card h-96 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="bg-gray-50 p-2 rounded">
            <span className="font-semibold text-sm">{msg.user}: </span>
            <span className="text-gray-700">{msg.message}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          className="input flex-1"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

export default LiveChat;
