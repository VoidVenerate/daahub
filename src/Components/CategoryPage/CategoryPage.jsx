import React, { useEffect, useState } from "react";
import "./CategoryPage.css";
import { useParams } from "react-router-dom";
import { getCategoryNews } from "../newsApi";

const CategoryPage = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchCategoryNews = async () => {
      setLoading(true);
      const data = await getCategoryNews(category, currentPage, articlesPerPage);
      setArticles(data.articles);
      setTotalResults(data.totalResults || 0);
      setLoading(false);
    };

    fetchCategoryNews();
  }, [category, currentPage]);

  const totalPages = Math.ceil(totalResults / articlesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="category-page">
      <div className="category-title">
        <h2 style={{ fontFamily: "Rushon Ground" }}>
          {category.charAt(0).toUpperCase() + category.slice(1)} News
        </h2>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : articles.length === 0 ? (
        <p>No articles found.</p>
      ) : (
        <>
          <div className="category-grid">
            {articles.map((news, index) => (
              <div key={index} className="news-card">
                {news.urlToImage && (
                  <img src={news.urlToImage} alt={news.title} />
                )}
                <div className="news-info">
                  <h3>
                    <a href={news.url} target="_blank" rel="noopener noreferrer">
                      {news.title}
                    </a>
                  </h3>
                  <p>{news.description}</p>
                  <span>
                    {new Date(news.publishedAt).toLocaleDateString()} •{" "}
                    {news.source?.name || "Unknown"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Pagination */}
          {totalPages > 1 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default CategoryPage;
