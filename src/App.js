import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductCategories from './components/ProductCategories';
import RecommendedProducts from './components/RecommendedProducts';
import Footer from './components/Footer';
import AllProducts from './components/AllProducts';
import PyramidProducts from './components/PyramidProducts';
import BraceletProducts from './components/BraceletProducts';
import PencilProducts from './components/PencilProducts';
import AboutUs from './components/AboutUs';
import CartDrawer from './components/CartDrawer';
import ProductQuickView from './components/ProductQuickView';
import CheckoutModal from './components/CheckoutModal';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Add item to cart with quantity
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.name.trim().toLowerCase() === product.name.trim().toLowerCase()
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.name.trim().toLowerCase() === product.name.trim().toLowerCase()
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });
    
    // Automatically open the cart drawer for interactive confirmation
    setIsCartOpen(true);
  };

  // Remove item completely from cart
  const handleRemoveFromCart = (productName) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.product.name !== productName)
    );
  };

  // Update item quantity (e.g., in drawer)
  const handleUpdateQuantity = (productName, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productName);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.name === productName ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    navigate('/products/all'); 
  };

  const handleOpenQuickView = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseQuickView = () => {
    setSelectedProduct(null);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Sum of quantities for the cart badge icon
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="App">
      <Header 
        cartCount={totalCartCount} 
        onSearchSubmit={handleSearchSubmit} 
        onCartOpen={() => setIsCartOpen(true)} 
      />
      
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <HeroSection />
              <ProductCategories />
              <RecommendedProducts 
                handleAddToCart={handleAddToCart} 
                onOpenQuickView={handleOpenQuickView} 
              />
            </>
          } />
          
          <Route path="/products/all" element={
            <AllProducts 
              handleAddToCart={handleAddToCart} 
              onOpenQuickView={handleOpenQuickView} 
              searchQuery={searchQuery} 
            />
          } />
          
          <Route path="/products/pyramid" element={
            <PyramidProducts 
              handleAddToCart={handleAddToCart} 
              onOpenQuickView={handleOpenQuickView} 
            />
          } />
          
          <Route path="/products/bracelet" element={
            <BraceletProducts 
              handleAddToCart={handleAddToCart} 
              onOpenQuickView={handleOpenQuickView} 
            />
          } />
          
          <Route path="/products/pencil" element={
            <PencilProducts 
              handleAddToCart={handleAddToCart} 
              onOpenQuickView={handleOpenQuickView} 
            />
          } />
          
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </main>
      
      <Footer />

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems} 
        onUpdateQuantity={handleUpdateQuantity} 
        onRemove={handleRemoveFromCart}
        onCheckout={handleProceedToCheckout}
      />

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <ProductQuickView 
          product={selectedProduct} 
          onClose={handleCloseQuickView} 
          onAddToCart={handleAddToCart} 
        />
      )}

      {/* Simulated Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal 
          isOpen={isCheckoutOpen} 
          onClose={() => setIsCheckoutOpen(false)} 
          cartItems={cartItems} 
          onClearCart={handleClearCart} 
        />
      )}
    </div>
  );
}

export default App;
