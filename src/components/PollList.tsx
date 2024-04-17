import React from 'react';
import Poll from './Poll';
import { Poll as PollType } from '../features/pollSlice';
import List from '@mui/material/List';

interface PollListProps {
  polls: PollType[];
}

const PollList: React.FC<PollListProps> = ({ polls }) => {
  return (
    <List>
      {polls.map(poll => (
        <Poll key={poll.id} pollId={poll.id} />
      ))}
    </List>
  );
};

export default PollList;
