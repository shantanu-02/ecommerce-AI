import React from "react";
import Products from "./components/Products";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a className="navbar-brand" href="/">
            <i className="fas fa-robot me-2"></i>
            AI E-commerce Catalog
          </a>
          <div className="navbar-nav ms-auto">
            <span className="navbar-text">
              <i className="fas fa-brain me-1"></i>
              Powered by AI Search
            </span>
          </div>
        </div>
      </nav>

      <main>
        <Products />
      </main>

      <footer className="bg-dark text-light py-4 mt-5">
        <div className="container text-center">
          <p className="mb-2">
            <i className="fas fa-magic me-2"></i>
            AI-Enhanced E-commerce Experience
          </p>
          <small className="text-muted">
            Featuring natural language search powered by OpenRouter & Gemini
          </small>
        </div>
      </footer>
    </div>
  );
}

export default App;
