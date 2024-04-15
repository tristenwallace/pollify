import React from 'react';
import { Poll } from '../features/pollSlice';

interface PollListProps {
  polls: Poll[];
}

const PollList: React.FC<PollListProps> = ({ polls }) => {
  return (
    <ul>
      {polls.map(poll => (
        <li key={poll.id}>
          <h4>Would you rather?</h4>
          <div>
            <button>{poll.optionOne.text}</button>
            <button>{poll.optionTwo.text}</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PollList;
