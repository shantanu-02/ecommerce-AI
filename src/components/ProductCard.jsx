import React from 'react';

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt text-warning"></i>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star text-warning"></i>);
    }

    return stars;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      footwear: 'fas fa-shoe-prints',
      electronics: 'fas fa-laptop',
      clothing: 'fas fa-tshirt'
    };
    return icons[category] || 'fas fa-box';
  };

  const getCategoryColor = (category) => {
    const colors = {
      footwear: 'primary',
      electronics: 'success',
      clothing: 'warning'
    };
    return colors[category] || 'secondary';
  };

  return (
    <div className="card h-100 shadow-sm product-card">
      <div className="position-relative">
        <img 
          src={product.image} 
          className="card-img-top" 
          alt={product.name}
          style={{ height: '200px', objectFit: 'cover' }}
        />
        <span className={`badge bg-${getCategoryColor(product.category)} position-absolute top-0 end-0 m-2`}>
          <i className={`${getCategoryIcon(product.category)} me-1`}></i>
          {product.category}
        </span>
      </div>
      
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted small flex-grow-1">
          {product.description}
        </p>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="h5 text-primary mb-0">${product.price}</span>
            <div className="d-flex align-items-center">
              <div className="me-2">
                {renderStars(product.rating)}
              </div>
              <small className="text-muted">({product.rating})</small>
            </div>
          </div>
          
          {product.tags && (
            <div className="mb-2">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="badge bg-light text-dark me-1 small">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-cart-plus me-2"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;