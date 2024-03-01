import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'react-router-dom';
import Header from "../partials/Header";
import Footer from '../partials/Footer';

const Products = () => {
    const [rating, setRating] = useState(4.3);
    const [products, setProducts] = useState([]);
    const [showPreloader, setShowPreloader] = useState(true);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [error, setError] = useState(null);
    const [showFullDescriptions, setShowFullDescriptions] = useState({});
    const [sortBy, setSortBy] = useState('price'); // State to track sorting option
    const [priceSortOrder, setPriceSortOrder] = useState('asc'); // State to track sort order for price
    const [ratingSortOrder, setRatingSortOrder] = useState('asc'); // State to track sort order for rating
    const handleClick = (productId) => {
        setShowFullDescriptions((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/api/products'); // Update the URL to match your backend endpoint
                const data = await response.json();
                setProducts(data);
                setShowPreloader(false);
            } catch (error) {
                setError(error);
                setShowPreloader(false);
            }
        };

        fetchProducts();
    }, []);

    // Sort products based on sort order and selected sort option
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price') {
            return priceSortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        } else if (sortBy === 'rating') {
            return ratingSortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
        } else if (sortBy === 'spice') {
            // Implement sorting logic based on spice
        }
    });

    const handlePriceSort = (order) => {
        // Apply the selected sorting order for price
        setPriceSortOrder(order);
        setSortBy('price');

    };

    const handleRatingSort = (order) => {
        // Apply the selected sorting order for rating
        setRatingSortOrder(order);
        setSortBy('rating');

    };    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const imageProps = useSpring({ opacity: 1, from: { opacity: 0 }, delay: 200 });

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 9;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct); // Use sortedProducts

    const handleAddToCart = (productId) => {
        // Add the product with the given id to the cart
        // and update the state of the cart
    };

    const handleRatingChange = (productId, newRating) => {
        // Update the rating of the product with the given id
        // and update the state of the products
    };

    const handleFilterChange = (filterOption) => {
        // Filter the products based on the selected filter option
        // and update the state of the products
    };

    

    const handleSearchChange = (searchTerm) => {
        // Filter the products based on the search term
        // and update the state of the products
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    
    useEffect(() => {
        setShowPreloader(false);

        const handleScroll = () => {
            if (window.pageYOffset > 500) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
            setShowPreloader(false);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {showPreloader && (
                <div className="preload" data-preaload>
                    <div className="circle"></div>
                    <p className="text">EIKO</p>
                    <p>Patisserie & Bakehouse</p>
                </div>
            )}

            {!showPreloader && products.length > 0 && (
                <>
                    {showBackToTop && (
                        <button className="btn btn-primary back-to-top" title="Back to Top" onClick={scrollToTop}>
                            <i className="bi bi-arrow-up"></i>
                        </button>
                    )}
                    <Header />
                    
                    <div className='productcontainer'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-3'>
                                    <div className="filter-options">
                                        <h3>Cakes</h3>
                                        <ul>
                                            <li>Birthday Cakes</li>
                                            <li>Wedding Cakes</li>
                                            <li>Anniversary Cakes</li>
                                            <li>Custom Cakes</li>
                                        </ul>
                                    </div>
                                    <div className="filter-options">
                                        <h3>Patisserie</h3>
                                        <ul>
                                            <li>Pastries</li>
                                            <li>Tarts</li>
                                            <li>Macarons</li>
                                            <li>Croissants</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='col-9'>
                                    <div className="product-list container">
                                        <div className="row">
                                        <section>
                                                <div className='container mb-3'>
                                                    <div className='row'>
                                                    <div className='col-md-4'></div>
                                                        <div className='col-md-4'>
                                                            Sort by Price
                                                            <select value={priceSortOrder} onChange={(e) => handlePriceSort(e.target.value)}>
                                                                <option value="asc">Select a value.....</option>
                                                                <option value="desc">High To Low</option>
                                                                <option value="asc">Low To High</option>
                                                            </select>
                                                        </div>
                                                        <div className='col-md-4'>
                                                            Sort by Rating
                                                            <select value={ratingSortOrder} onChange={(e) => handleRatingSort(e.target.value)}>
                                                                <option value="asc">Select a value.....</option>
                                                                <option value="desc">High To Low</option>
                                                                <option value="asc">Low To High</option>
                                                            </select>
                                                        </div>

                                                    </div>
                                                </div>
                                            </section>
                                            {currentProducts.map((product, index) => (
                                                <div className="col-md-4" key={product._id}>
                                                    <div className="card mb-4 border-0 shadow">
                                                        <animated.img src={product.image} alt={product.name} className="card-img-top" style={imageProps} />
                                                        <div className="card-body">
                                                            <h5 className="card-title fw-bold text-uppercase">{product.name}</h5>
                                                            <h6 className="card-text fw-light">
                                                                <td>
                                                                    {showFullDescriptions[product._id] ? (
                                                                        <>
                                                                            {product.shortDescription}{' '}
                                                                            <Link onClick={() => handleClick(product._id)}>Show less</Link>
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {product.shortDescription.length > 60 ? (
                                                                                <span>
                                                                                    {product.shortDescription.substring(0, 60)}{' '}
                                                                                    <Link onClick={() => handleClick(product._id)}>
                                                                                        Show more
                                                                                    </Link>
                                                                                </span>
                                                                            ) : (
                                                                                product.shortDescription
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </td>
                                                            </h6>
                                                            <p className="card-text product-rating">
                                                                <i className="bi bi-star-fill"></i>
                                                                <strong> {product.rating}</strong>
                                                            </p>
                                                        </div>
                                                        <div className="product-info">
                                                            <strong className="product-price">{product.price}</strong>
                                                            <span className="product-off-price">{product.offPrice}</span>
                                                            <button onClick={() => handleAddToCart(product._id)} className="product-add-to-cart">Add</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(products.length / productsPerPage) }, (_, i) => (
                                <li key={i + 1} className={currentPage === i + 1 ? 'page-item active' : 'page-item'}>
                                    <a className="page-link" onClick={() => handlePageChange(i + 1)}>{i + 1}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <Footer />

                    {error && <div>Error: {error.message}</div>}
                </>

            )}
        </>
    );
};

export default Products;
