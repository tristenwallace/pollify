import React, { useState } from 'react';
import type { PollListProps } from './PollList';
import PollList from './PollList';
import {
  Box,
  Select,
  MenuItem,
  Pagination,
  SelectChangeEvent,
} from '@mui/material';

const PollPagination: React.FC<PollListProps> = ({ polls }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(event.target.value as number);
    setCurrentPage(1); // Reset to the first page whenever items per page changes
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPolls = polls.slice(startIndex, endIndex);
  const pageCount = Math.ceil(polls.length / itemsPerPage);

  return (
    <Box>
      <PollList polls={currentPolls} />
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', mt: 3, mb: 3 }}
      >
        <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
          {[5, 10, 15, 20].map(option => (
            <MenuItem key={option} value={option}>
              {option} per page
            </MenuItem>
          ))}
        </Select>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default PollPagination;
