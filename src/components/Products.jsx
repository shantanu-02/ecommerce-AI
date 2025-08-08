import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AISearch from "./AISearch";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products/");
      if (componentMounted) {
        const productsData = await response.json();
        setData(productsData);
        setFilter(productsData);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const handleAISearchResults = (results, query) => {
    setSearchResults(results);
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setSearchQuery("");
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
    // Clear AI search when using traditional filters
    if (searchResults) {
      handleClearSearch();
    }
  };

  const handleShowAll = () => {
    setFilter(data);
    handleClearSearch();
  };

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const ShowProducts = () => {
    const displayProducts = searchResults || filter;
    const totalProducts = data.length;
    const displayedCount = displayProducts.length;

    return (
      <>
        {/* AI Search Component */}
        <div className="row mb-4">
          <div className="col-12">
            <AISearch
              products={data}
              onSearchResults={handleAISearchResults}
              onClearSearch={handleClearSearch}
            />
          </div>
        </div>

        {/* Results Summary */}
        <div className="row mb-3">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {searchResults ? (
                  <div className="alert alert-info mb-0">
                    <i className="fas fa-robot me-2"></i>
                    AI Search Results for: "<strong>{searchQuery}</strong>"
                    <span className="ms-2">
                      ({displayedCount} products found)
                    </span>
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

        {/* Traditional Filter Buttons */}
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={handleShowAll}
            disabled={!!searchResults}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
            disabled={!!searchResults}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
            disabled={!!searchResults}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
            disabled={!!searchResults}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
            disabled={!!searchResults}
          >
            Electronics
          </button>
        </div>

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          displayProducts.map((product) => {
            return (
              <div
                id={product.id}
                key={product.id}
                className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
              >
                <div className="card text-center h-100" key={product.id}>
                  <img
                    className="card-img-top p-3"
                    src={product.image}
                    alt="Card"
                    height={300}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {product.title.substring(0, 12)}...
                    </h5>
                    <p className="card-text">
                      {product.description.substring(0, 90)}...
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item lead">$ {product.price}</li>
                    {product.rating && (
                      <li className="list-group-item">
                        <div className="d-flex justify-content-center align-items-center">
                          <div className="me-2">
                            {[...Array(5)].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star ${
                                  i < Math.floor(product.rating.rate)
                                    ? "text-warning"
                                    : "text-muted"
                                }`}
                              ></i>
                            ))}
                          </div>
                          <small className="text-muted">
                            ({product.rating.rate})
                          </small>
                        </div>
                      </li>
                    )}
                  </ul>
                  <div className="card-body">
                    <Link
                      to={"/product/" + product.id}
                      className="btn btn-dark m-1"
                    >
                      Buy Now
                    </Link>
                    <button
                      className="btn btn-dark m-1"
                      onClick={() => {
                        toast.success("Added to cart");
                        addProduct(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-12">
            <div className="text-center py-5">
              <i className="fas fa-search fa-3x text-muted mb-3"></i>
              <h4>No products found</h4>
              <p className="text-muted">
                {searchResults
                  ? `No products match your search: "${searchQuery}"`
                  : "Try adjusting your filters or search criteria"}
              </p>
              {searchResults && (
                <button className="btn btn-primary" onClick={handleClearSearch}>
                  View All Products
                </button>
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
