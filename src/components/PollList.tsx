import React from 'react';
import Poll from './Poll';
import { Poll as PollType } from '../features/pollSlice';

interface PollListProps {
  polls: PollType[];
}

const PollList: React.FC<PollListProps> = ({ polls }) => {
  return (
    <ul>
      {polls.map(poll => (
        <Poll key={poll.id} pollId={poll.id} />
      ))}
    </ul>
  );
};

export default PollList;
