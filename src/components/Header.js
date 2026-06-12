import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Header = ({ cartCount, onSearchSubmit, onCartOpen }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (onSearchSubmit) {
            onSearchSubmit(searchTerm);
        }
    };

    return (
        <header>
            <div className="main-header">
                <div className="container">
                    <div className="logo">
                        <Link to="/">
                            <img src={logo} alt="Moksh Crystals Logo" />
                        </Link>
                    </div>
                    <form className="search-bar" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Search crystals, bracelets, pyramids..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </div>
            <nav className="main-menu">
                <div className="container">
                    <ul>
                        <li>
                            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about-us" className={location.pathname === '/about-us' ? 'active' : ''}>
                                About Us
                            </Link>
                        </li>
                    </ul>
                    <div className="cart-container">
                        <div 
                            className="cart-nav-item" 
                            onClick={onCartOpen} 
                            style={{ cursor: 'pointer', userSelect: 'none' }}
                        >
                            <i className="fa-solid fa-shopping-bag"></i>
                            <span>Cart</span>
                            {cartCount > 0 && (
                                <span className="cart-count">{cartCount}</span>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
