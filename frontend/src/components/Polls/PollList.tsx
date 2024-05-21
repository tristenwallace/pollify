import React from 'react';
import Poll from './Poll'; // Importing the Poll component to be used in the list
import { Poll as PollType } from '../../features/pollSlice'; // Importing the Poll type definition
import List from '@mui/material/List'; // Material-UI List component for consistent styling

// Defining the props expected by the PollList component using TypeScript interface
export interface PollListProps {
  polls: PollType[]; // Array of polls of type PollType
}

// Functional component to render a list of polls
const PollList: React.FC<PollListProps> = ({ polls }) => {
  return (
    <List>
      {' '}
      {/* Utilizing Material-UI List for layout and styling */}
      {polls.map(poll => (
        <Poll key={poll.id} pollId={poll.id} />
      ))}
    </List>
  );
};

export default PollList; // Exporting the component for use in other parts of the application
