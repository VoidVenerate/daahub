import axios from "axios";

const API_KEY = "bb59d1fe0f77fe369eb4db704e880071";
const BASE_URL = "https://gnews.io/api/v4";

// 📰 Get Top Headlines
export const getTopHeadlines = async (country = "us", page = 1, pageSize = 12) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        country,
        lang: "en",  // ✅ GNews requires this
        max: pageSize, // ✅ 'max' replaces 'pageSize'
        page,
        apikey: API_KEY, // ✅ lowercase key name
      },
    });
    return {
      articles: response.data.articles,
      totalResults: response.data.totalArticles || response.data.totalResults || 0,
    };
  } catch (error) {
    console.error("Error fetching top headlines:", error);
    return { articles: [], totalResults: 0 };
  }
};

// ⚡ Get Breaking News
export const getBreakingNews = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        q: "breaking",
        lang: "en",
        max: 10,
        sortby: "publishedAt",
        apikey: API_KEY,
      },
    });
    return {
      articles: response.data.articles,
      totalResults: response.data.totalArticles || 0,
    };
  } catch (error) {
    console.error("Error fetching breaking news:", error);
    return { articles: [], totalResults: 0 };
  }
};

// 🗂️ Get Category News
export const getCategoryNews = async (category, page = 1, pageSize = 8) => {
  try {
    // GNews doesn't support `category` directly like NewsAPI
    // We'll use a search query instead
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        q: category,
        lang: "en",
        country: "us",
        max: pageSize,
        page,
        apikey: API_KEY,
      },
    });
    return {
      articles: response.data.articles,
      totalResults: response.data.totalArticles || 0,
    };
  } catch (error) {
    console.error("Error fetching category news:", error);
    return { articles: [], totalResults: 0 };
  }
};

// 🔍 Search News
export const getSearchNews = async (query, page = 1, pageSize = 8) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        q: query,
        lang: "en",
        max: pageSize,
        page,
        apikey: API_KEY,
      },
    });
    return {
      articles: response.data.articles,
      totalResults: response.data.totalArticles || 0,
    };
  } catch (error) {
    console.error("Error searching news:", error);
    return { articles: [], totalResults: 0 };
  }
};
