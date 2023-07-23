// Pagination.js
import React from "react";
import Button from "@mui/material/Button";

const Pagination = ({ currentPage, totalPages, handlePrevPage, handleNextPage }) => {
  return (
    <div className="flex justify-center mt-5">
      <div className="flex gap-4">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous Page
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
