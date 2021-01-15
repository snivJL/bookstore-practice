import React from "react";
import { useState, useEffect } from "react";
import BookList from "../components/BookList";

const ReadingPage = () => {
  const totalPageNum = 10;

  const limit = 8;
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState(null);
  const [ErrorMsg, setErrorMsg] = useState("");
  const [pageNum, setPageNum] = useState(1);

  const getPageNum = (pageNumber) => {
    setPageNum(pageNumber);
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = `${process.env.REACT_APP_BACKEND_API}/favorites`;
        const res = await fetch(url);
        const data = await res.json();
        console.log("DATA FAVORITE", data);
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
  }, []);
  return (
    <>
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
        <div>Nothing</div>
      )}
    </>
  );
};

export default ReadingPage;
