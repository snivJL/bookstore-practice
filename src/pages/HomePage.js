import React from "react";
import SearchForm from "../components/SearchForm";
import { useEffect, useState } from "react";
import BookList from "../components/BookList";

const HomePage = () => {
  const totalPageNum = 10;
  const limit = 8;
  const [pageNum, setPageNum] = useState(1);
  const [books, setBooks] = useState(null);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchFormSubmit = (event) => {
    event.preventDefault();
    setQuery(searchInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url =
          query !== ""
            ? `${process.env.REACT_APP_BACKEND_API}/books?_page=${pageNum}&_limit=${limit}&q=${query}`
            : `${process.env.REACT_APP_BACKEND_API}/books?_page=${pageNum}&_limit=${limit}`;
        const res = await fetch(url);
        const data = await res.json();

        if (res.ok) {
          setBooks(data);
        } else {
          setErrorMsg(`FETCH BOOKS ERROR: ${data.message}`);
          console.log(ErrorMsg);
        }
      } catch (error) {
        setErrorMsg(`FETCH BOOKS ERROR: ${error}`);
        console.log(ErrorMsg);
      }
      setLoading(false);
    };
    fetchData();
  }, [pageNum, query]);

  const getPageNum = (pageNumber) => {
    setPageNum(pageNumber);
  };
  return (
    <div>
      <SearchForm
        handleSearchInputChange={handleSearchInputChange}
        handleSearchFormSubmit={handleSearchFormSubmit}
      />

      {loading ? (
        <h1>Loading</h1>
      ) : books !== null ? (
        <BookList
          getPageNum={getPageNum}
          books={books}
          totalPageNum={totalPageNum}
          limit={limit}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default HomePage;
