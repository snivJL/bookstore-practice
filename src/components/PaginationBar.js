import React from "react";
import ReactPaginate from "react-paginate";
import "./react-paginate.css";

const PaginationBar = ({ pageCount, pageRangeDisplayed, getPageNum }) => {
  const onPageChange = (e) => {
    getPageNum(e.selected + 1);
  };
  return (
    <div id="react-paginate">
      <ReactPaginate
        onPageChange={onPageChange}
        pageCount={pageCount}
        pageRangeDisplayed={pageRangeDisplayed}
        marginPagesDisplayed={5}
      />
    </div>
  );
};

export default PaginationBar;
