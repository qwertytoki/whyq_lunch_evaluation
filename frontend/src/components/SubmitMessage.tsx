import React from 'react';

import styles from '../styles/SubmitMessage.module.css';

interface SubmitMessageProps {
  message: string;
}

const SubmitMessage: React.FC<SubmitMessageProps> = ({ message }) => {
  return <div className={styles.submitMessage}>{message}</div>;
};

export default SubmitMessage;
