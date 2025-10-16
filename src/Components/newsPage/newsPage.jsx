import React, { useEffect, useState } from "react";
import "./newsPage.css";
import { getBreakingNews, getTopHeadlines, getSearchNews } from "../newsApi";

const NewsPage = ({searchTerm}) => {
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [breakingNews, setBreakingNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let headlinesData;
      if (searchTerm && searchTerm.trim() !== '') {
        headlinesData = await getSearchNews(searchTerm, currentPage, articlesPerPage);
      } else {
        headlinesData = await getTopHeadlines('us', currentPage, articlesPerPage);
      }
      setTopHeadlines(headlinesData.articles);
      setTotalResults(headlinesData.totalResults || 0);

      const breakingData = await getBreakingNews();
      setBreakingNews(breakingData.articles);
      setLoading(false);
    };
    fetchData();
  }, [currentPage, searchTerm]);

  const totalPages = Math.ceil(totalResults/ articlesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="news-container">
      {/* Animated Breaking News Ticker */}
      <section className="breaking-news">
        <div className="ticker-title" style={{ fontFamily: "Rushon Ground" }}>
          Breaking News
        </div>
        <div className="ticker-wrapper">
          <div className="ticker-content">
            {breakingNews.length === 0 ? (
              <span>Loading latest headlines...</span>
            ) : (
              breakingNews.slice(0, 10).map((news, index) => (
                <a
                  key={index}
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ticker-item"
                >
                  {news.title}
                </a>
              ))
            )}
          </div>
        </div>
      </section>

      {/* 📰 Top Headlines Grid */}
      <section className="top-headlines">
        <h2 style={{ fontFamily: "Rushon Ground" }}>{searchTerm ? `Results for "${searchTerm}"` : "Top Headlines"}</h2>
        {topHeadlines.length === 0 ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <div className="headline-grid">
              {topHeadlines.map((news, index) => (
                <div key={index} className="news-card">
                  {news.urlToImage && (
                    <img src={news.urlToImage} alt={news.title} />
                  )}
                  <div className="news-content">
                    <h3>
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {news.title}
                      </a>
                    </h3>
                    <p>{news.description}</p>
                    <p className="news-meta">
                      Source: {news.source.name} |{" "}
                      {new Date(news.publishedAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ Pagination */}
            <div className="pagination">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="page-btn"
              >
                Previous
              </button>
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="page-btn"
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default NewsPage;
