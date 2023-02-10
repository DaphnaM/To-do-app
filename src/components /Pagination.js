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
          className={`pagination  ${currentPage === page ? "active" : ""}`}
          onClick={() => onPageClick(page)}
        >
          {page}
        </button>
      ))}
      <svg
        width="8"
        height="14"
        viewBox="0 0 8 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      ></svg>
    </div>
  );
}
