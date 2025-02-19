import React from 'react';
import './VoteCount.css';

const VoteCount = ({ votes, upvote, downvote }) => {
  return (
    <div className="vote-container">
      <button className="vote-btn" onClick={downvote}>👎</button>
      <span className="vote-count">{votes}</span>
      <button className="vote-btn"onClick={upvote}>👍</button>
    </div>
  );
};

export default VoteCount;