import React from 'react';
import Poll from './Poll'; // Make sure this path is correct
import { Poll as PollType } from '../features/pollSlice';

interface PollListProps {
  polls: PollType[];
}

const PollList: React.FC<PollListProps> = ({ polls }) => {
  return (
    <ul>
      {polls.map(poll => (
        <Poll key={poll.id} poll={poll} /> // Using the Poll component for each poll
      ))}
    </ul>
  );
};

export default PollList;
