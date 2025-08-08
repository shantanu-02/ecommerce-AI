import React from 'react';

const FilterBar = ({ filters, onFilterChange, disabled }) => {
  const categories = ['footwear', 'electronics', 'clothing'];

  const handleFilterChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: ''
    });
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="card mb-4">
      <div className="card-header">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0">
            <i className="fas fa-filter me-2"></i>
            Traditional Filters
          </h6>
          {hasActiveFilters && (
            <button 
              className="btn btn-sm btn-outline-secondary"
              onClick={clearFilters}
              disabled={disabled}
            >
              <i className="fas fa-times me-1"></i>
              Clear Filters
            </button>
          )}
        </div>
        {disabled && (
          <small className="text-muted">
            <i className="fas fa-info-circle me-1"></i>
            Filters are disabled during AI search. Clear search to use filters.
          </small>
        )}
      </div>
      <div className="card-body">
        <div className="row g-3">
          {/* Category Filter */}
          <div className="col-md-3">
            <label className="form-label small">Category</label>
            <select 
              className="form-select form-select-sm"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              disabled={disabled}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="col-md-3">
            <label className="form-label small">Min Price</label>
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="$0"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
              disabled={disabled}
            />
          </div>

          <div className="col-md-3">
            <label className="form-label small">Max Price</label>
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="$9999"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
              disabled={disabled}
            />
          </div>

          {/* Rating Filter */}
          <div className="col-md-3">
            <label className="form-label small">Min Rating</label>
            <select 
              className="form-select form-select-sm"
              value={filters.minRating}
              onChange={(e) => handleFilterChange('minRating', e.target.value)}
              disabled={disabled}
            >
              <option value="">Any Rating</option>
              <option value="4.5">4.5+ Stars</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="3.5">3.5+ Stars</option>
              <option value="3.0">3.0+ Stars</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;