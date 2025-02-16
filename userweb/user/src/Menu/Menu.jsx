import React, { useState, useEffect } from 'react';
import { Search, Coffee, MenuSquare, ChevronRight, ChevronUp } from 'lucide-react';
import './menulist.css'
const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menuResponse, categoriesResponse] = await Promise.all([
          fetch('http://localhost:5000/api/menuitems'),
          fetch('http://localhost:5000/api/categories')
        ]);

        if (!menuResponse.ok || !categoriesResponse.ok)
          throw new Error('Failed to fetch data');

        const [menuData, categoriesData] = await Promise.all([
          menuResponse.json(),
          categoriesResponse.json()
        ]);

        setMenuItems(menuData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredItems = menuItems.filter(item => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeFilter === 'all' || item.category.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  if (isLoading) {
    return (
      <div className="menu-page">
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-page">
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      {/* Hero Section */}
      <div className="menu-hero">
        <div className="hero-overlay">
          <div className="container">
            <div className="hero-content text-center">
              <h1>Our Menu</h1>
              <p>Discover the flavors of Café Camorra</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8">
            <div className="menu-container">
              {/* Search and Filter Section */}
              <div className="search-filter-container mb-4">
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <Search className="icon" />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="category-buttons">
                  <button
                    className={`category-btn ${activeFilter === 'all' ? 'selected' : ''}`}
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </button>
                  {categories.map(category => (
                    <button
                      key={category}
                      className={`category-btn ${activeFilter === category.toLowerCase() ? 'selected' : ''}`}
                      onClick={() => setActiveFilter(category.toLowerCase())}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Menu Items Grid */}
              <div className="row g-4">
                {selectedItems.map(item => (
                  <div key={item.id} className="col-md-6 col-lg-4">
                    <div className="menu-item-card">
                      {item.image && (
                        <div className="menu-item-image">
                          <img
                            src={`data:image/jpeg;base64,${item.image}`}
                            alt={item.name}
                          />
                          <div className="price-badge">{item.price}TND</div>
                        </div>
                      )}
                      <div className="menu-item-content">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <div className="menu-item-footer">
                          <span className="category-tag">{item.category}</span>
                          {item.dietary && (
                            <span className="dietary-tag">{item.dietary}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav className="pagination-container">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(prev => prev - 1)}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, i) => (
                      <li
                        key={i}
                        className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="menu-sidebar">
              <div className="info-card">
                <h3>Menu Information</h3>
                <div className="info-content">
                  <p><Coffee className="icon" /> Fresh brewed coffee daily</p>
                  <p><MenuSquare className="icon" /> Seasonal menu updates</p>
                </div>

                <div className="policy-info">
                  <h4>Menu Policy</h4>
                  <ul>
                    <li>All prices include VAT</li>
                    <li>Special dietary options available</li>
                    <li>Ingredients may vary by season</li>
                    <li>Custom orders available on request</li>
                    <li>Please inform staff of any allergies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className="icon" />
        </button>
      )}
    </div>
  );
};

export default Menu;