import React, { useState } from 'react';
import aiSearchService from '../services/aiSearch';

const AISearch = ({ products, onSearchResults, onClearSearch }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    try {
      const results = await aiSearchService.searchProducts(query, products);
      onSearchResults(results, query);
      
      // Add to search history
      setSearchHistory(prev => {
        const newHistory = [query, ...prev.filter(h => h !== query)].slice(0, 5);
        return newHistory;
      });
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    onClearSearch();
  };

  const handleHistoryClick = (historicalQuery) => {
    setQuery(historicalQuery);
  };

  const exampleQueries = [
    "Show me running shoes under $200",
    "Electronics with good reviews",
    "Casual clothing under $100",
    "Premium headphones",
    "Comfortable sneakers for daily wear"
  ];

  return (
    <div className="ai-search-container mb-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i className="fas fa-brain me-2"></i>
            AI-Powered Smart Search
          </h5>
          <small>Ask in natural language - e.g., "Show me running shoes under $100 with good reviews"</small>
        </div>
        <div className="card-body">
          <form onSubmit={handleSearch} className="mb-3">
            <div className="input-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="What are you looking for? (e.g., comfortable running shoes under $150)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                disabled={isSearching}
              />
              <button 
                className="btn btn-primary" 
                type="submit" 
                disabled={isSearching || !query.trim()}
              >
                {isSearching ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    Searching...
                  </>
                ) : (
                  <>
                    <i className="fas fa-search me-2"></i>
                    Search
                  </>
                )}
              </button>
              {query && (
                <button 
                  className="btn btn-outline-secondary" 
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
            <small className="text-muted d-block mb-2">Try these examples:</small>
            <div className="d-flex flex-wrap gap-2">
              {exampleQueries.map((example, index) => (
                <button
                  key={index}
                  className="btn btn-outline-primary btn-sm"
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
              <small className="text-muted d-block mb-2">Recent searches:</small>
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
        </div>
      </div>
    </div>
  );
};

export default AISearch;