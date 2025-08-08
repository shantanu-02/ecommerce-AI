import React from "react";

const ProductCard = ({ product }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star text-warning"></i>);
    }

    if (hasHalfStar) {
      stars.push(
        <i key="half" className="fas fa-star-half-alt text-warning"></i>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={`empty-${i}`} className="far fa-star text-warning"></i>
      );
    }

    return stars;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      footwear: "fas fa-shoe-prints",
      electronics: "fas fa-laptop",
      clothing: "fas fa-tshirt",
    };
    return icons[category] || "fas fa-box";
  };

  const getCategoryColor = (category) => {
    const colors = {
      footwear: "primary",
      electronics: "success",
      clothing: "warning",
    };
    return colors[category] || "secondary";
  };

  const getPriceColor = (price) => {
    if (price < 100) return "text-success";
    if (price < 500) return "text-primary";
    return "text-danger";
  };

  return (
    <div className="card h-100 shadow-sm product-card border-0">
      <div className="position-relative overflow-hidden">
        <img
          src={product.image}
          className="card-img-top product-image"
          alt={product.name}
          style={{
            height: "220px",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        />
        <div className="position-absolute top-0 start-0 m-2">
          <span
            className={`badge bg-${getCategoryColor(
              product.category
            )} shadow-sm`}
          >
            <i className={`${getCategoryIcon(product.category)} me-1`}></i>
            {product.category}
          </span>
        </div>
        <div className="position-absolute top-0 end-0 m-2">
          {product.rating >= 4.5 && (
            <span className="badge bg-warning text-dark shadow-sm">
              <i className="fas fa-award me-1"></i>
              Top Rated
            </span>
          )}
        </div>
      </div>

      <div className="card-body d-flex flex-column p-3">
        <h6
          className="card-title fw-bold mb-2 text-truncate"
          title={product.name}
        >
          {product.name}
        </h6>

        <p
          className="card-text text-muted small flex-grow-1 mb-3"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </p>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className={`h5 fw-bold mb-0 ${getPriceColor(product.price)}`}>
              ${product.price.toLocaleString()}
            </span>
            <div className="d-flex align-items-center">
              <div className="me-2">{renderStars(product.rating)}</div>
              <small className="text-muted fw-semibold">
                ({product.rating})
              </small>
            </div>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="mb-3">
              <div className="d-flex flex-wrap gap-1">
                {product.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="badge bg-light text-dark border small"
                  >
                    {tag}
                  </span>
                ))}
                {product.tags.length > 3 && (
                  <span className="badge bg-secondary small">
                    +{product.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-sm fw-semibold">
              <i className="fas fa-cart-plus me-2"></i>
              Add to Cart
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              <i className="fas fa-heart me-2"></i>
              Wishlist
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-card {
          transition: all 0.3s ease-in-out;
          border-radius: 12px;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
        }

        .product-image {
          border-radius: 12px 12px 0 0;
        }

        .card-body {
          border-radius: 0 0 12px 12px;
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
