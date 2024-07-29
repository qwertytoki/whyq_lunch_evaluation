// src/components/SubmitMessage.tsx
import React from 'react';
import '../styles/SubmitMessage.css';

interface SubmitMessageProps {
  message: string;
}

const SubmitMessage: React.FC<SubmitMessageProps> = ({ message }) => {
  return <div className="submit-message">{message}</div>;
};

export default SubmitMessage;
