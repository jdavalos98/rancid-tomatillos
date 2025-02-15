import React from 'react';
import './VoteCount.css';

const VoteCount = ({ votes }) => {
  return (
    <div className="vote-container">
      <button className="vote-btn">👎</button>
      <span className="vote-count">{votes}</span>
      <button className="vote-btn">👍</button>
    </div>
  );
};

export default VoteCount;