import React, { useState } from "react";
import toast from "react-hot-toast";

const AISearch = ({ products, onSearchResults, onClearSearch }) => {
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // Get the backend API URL
  const getApiUrl = () => {
    // Check if we're in development mode
    if (process.env.NODE_ENV === "development") {
      // Try different possible backend ports
      return process.env.REACT_APP_API_URL || "http://localhost:4000";
    }
    // In production, use relative URL
    return "";
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);

    try {
      const apiBaseUrl = getApiUrl();
      const response = await fetch(`${apiBaseUrl}/api/ai-search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query,
          products: products,
        }),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();

      if (data.success) {
        onSearchResults(data.results, query);

        // Add to search history
        setSearchHistory((prev) => {
          const newHistory = [query, ...prev.filter((h) => h !== query)].slice(
            0,
            5
          );
          return newHistory;
        });

        toast.success(
          `Found ${data.results.length} products matching your search`
        );
      } else {
        toast.error(data.message || "Search failed");
      }
    } catch (error) {
      console.error("Search failed:", error);
      toast.error("Search failed. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setQuery("");
    onClearSearch();
  };

  const handleHistoryClick = (historicalQuery) => {
    setQuery(historicalQuery);
  };

  const exampleQueries = [
    "🔌 Electronics under $100",
    "⭐ Products with good reviews",
    "👔 Rain jackets",
  ];

  return (
    <div className="ai-search-container mb-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg ai-search-input"
                placeholder="🤖 Ask AI anything... ✨"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isSearching}
              />
              <button
                className="btn btn-primary btn-lg"
                type="submit"
                disabled={isSearching || !query.trim()}
              >
                {isSearching ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <i className="fas fa-sparkles me-2"></i>✨ Ask AI
                  </>
                )}
              </button>
              {query && (
                <button
                  className="btn btn-outline-secondary btn-lg"
                  type="button"
                  onClick={handleClear}
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </form>

          {/* Example Queries */}
          <div className="mb-3">
            <small className="text-muted d-block mb-2">
              <i className="fas fa-lightbulb me-1"></i>
              💡 Try these AI examples:
            </small>
            <div className="d-flex flex-wrap gap-2">
              {exampleQueries.map((example, index) => (
                <button
                  key={index}
                  className="btn btn-outline-info btn-sm"
                  onClick={() => setQuery(example)}
                  disabled={isSearching}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          {/* Search History */}
          {searchHistory.length > 0 && (
            <div>
              <small className="text-muted d-block mb-2">
                <i className="fas fa-history me-1"></i>
                🕒 Recent AI searches:
              </small>
              <div className="d-flex flex-wrap gap-2">
                {searchHistory.map((historyItem, index) => (
                  <button
                    key={index}
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleHistoryClick(historyItem)}
                    disabled={isSearching}
                  >
                    <i className="fas fa-history me-1"></i>
                    {historyItem}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Status Indicator */}
          <div className="mt-3 pt-3 border-top">
            <div className="d-flex align-items-center justify-content-between">
              <small className="text-muted">
                <i className="fas fa-robot me-1"></i>
                🚀 Powered by Google Gemini AI
              </small>
              <small className="text-muted">
                <i className="fas fa-database me-1"></i>
                📦 {products.length} products available
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISearch;
