import React from "react";

export default function Pagination({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageClick,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pages = Array.from(Array(totalPages), (_, index) => index + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination pagination__page-number ${
            currentPage === page ? "active" : ""
          }`}
          onClick={() => onPageClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
