import React, { useState, useEffect } from 'react';
import AISearch from './AISearch';
import ProductCard from './ProductCard';
import FilterBar from './FilterBar';
import productsData from '../data/products.json';

const ProductCatalog = () => {
  const [products] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    minRating: ''
  });

  // Apply traditional filters
  useEffect(() => {
    if (searchResults) return; // Don't apply filters when showing AI search results

    let filtered = products;

    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.minRating) {
      filtered = filtered.filter(p => p.rating >= parseFloat(filters.minRating));
    }

    setFilteredProducts(filtered);
  }, [filters, products, searchResults]);

  const handleAISearchResults = (results, query) => {
    setSearchResults(results);
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setSearchQuery('');
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Clear AI search when using traditional filters
    if (searchResults) {
      handleClearSearch();
    }
  };

  const displayProducts = searchResults || filteredProducts;
  const totalProducts = products.length;
  const displayedCount = displayProducts.length;

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center mb-4">AI-Enhanced Product Catalog</h1>
          
          {/* AI Search Component */}
          <AISearch 
            products={products}
            onSearchResults={handleAISearchResults}
            onClearSearch={handleClearSearch}
          />

          {/* Traditional Filters */}
          <FilterBar 
            filters={filters}
            onFilterChange={handleFilterChange}
            disabled={!!searchResults}
          />

          {/* Results Summary */}
          <div className="row mb-3">
            <div className="col-12">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  {searchResults ? (
                    <div className="alert alert-info mb-0">
                      <i className="fas fa-robot me-2"></i>
                      AI Search Results for: "<strong>{searchQuery}</strong>" 
                      <span className="ms-2">({displayedCount} products found)</span>
                      <button 
                        className="btn btn-sm btn-outline-primary ms-3"
                        onClick={handleClearSearch}
                      >
                        <i className="fas fa-times me-1"></i>
                        Clear Search
                      </button>
                    </div>
                  ) : (
                    <p className="text-muted mb-0">
                      Showing {displayedCount} of {totalProducts} products
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="row">
            {displayProducts.length > 0 ? (
              displayProducts.map(product => (
                <div key={product.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-12">
                <div className="text-center py-5">
                  <i className="fas fa-search fa-3x text-muted mb-3"></i>
                  <h4>No products found</h4>
                  <p className="text-muted">
                    {searchResults 
                      ? `No products match your search: "${searchQuery}"`
                      : "Try adjusting your filters or search criteria"
                    }
                  </p>
                  {searchResults && (
                    <button 
                      className="btn btn-primary"
                      onClick={handleClearSearch}
                    >
                      View All Products
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;