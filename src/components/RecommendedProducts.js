import React from 'react';
import { Link } from 'react-router-dom';
import image2 from '../assets/images/bracelet 2.jpg';
import image3 from '../assets/images/bracelet 3.jpg';
import image4 from '../assets/images/bracelet 4.jpg';
import image5 from '../assets/images/bracelet 5.jpg';
import image6 from '../assets/images/bracelet 6.jpg';
import image7 from '../assets/images/bracelet 7.jpg';
import image8 from '../assets/images/bracelet 8.jpg';
import image9 from '../assets/images/pyramid 1.jpg'; 
import image10 from '../assets/images/pyramid 2.jpg'; 
import image11 from '../assets/images/bracelet 9.jpg'; 
import image13 from '../assets/images/bracelet 11.jpg';
import image14 from '../assets/images/bracelet 12.jpg';
import image15 from '../assets/images/bracelet 13.jpg';
import pencilImage from '../assets/images/pencile 1.jpg';

const RecommendedProducts = ({ handleAddToCart, onOpenQuickView }) => {
    const products = [
        { name: "Money magnate", price: "500", image: image2, description: "Benefits: Financial stability, Money related decision strong, Money attract, Good luck attract, Business improvement" },
        { name: "Tiger eye", price: "500", image: image3, description: "Benefits: To improve digestion systems Strong guts feeling Improve your decision power Protect negative energy Physics protection Balance seven chakras" },
        { name: "Golden money magnate", price: "500", image: image4, description: "Benefits: Financial stability, Money related decision strong, Money attract, Good luck attract, Business improvement" },
        { name: "Triple Protection", price: "500", image: image5, description: "Facilitates smooth international trade and business growth." },
        { name: "Natural 7 chakra", price: "500", image: image6, description: "Promotes prosperity and abundance in grocery business." },
        { name: "Natural citrine light color", price: "500", image: image7, description: "Supports healing and well-being in medical practices." },
        { name: "Red jasper", price: "500", image: image8, description: "Improve earth energy Physical strong Active five senses Grounded" },
        { name: "7 chakra pyramid", price: "500", image: image9, description: "Ensures safe travels and memorable journeys." },
        { name: "Shree yantra", price: "500", image: image10, description: "Helps in smooth transition and settlement in foreign lands." },
        { name: "Natural Howlite", price: "", image: image11, description: "Chakras balance Improve your creativity Improve your focus Calmness and protection Clean your aura" },
        { name: "Bracelet Product 13", price: "500", image: image13, description: "Statement bracelet, sure to turn heads." },
        { name: "Bracelet Product 14", price: "500", image: image14, description: "Business improvement Good luck attract" },
        { name: "Seven chakras+ lava stone", price: "500", image: image15, description: "Balance seven chakras Balance your energy Protection aura" },
        { name: "Pencil Product new", price: "500", image: pencilImage, description: "A brand new pencil for creative endeavors." }
    ];

    const formatPrice = (price) => {
        if (!price || price.toString().trim() === "") return '₹ 500';
        const str = price.toString().trim();
        if (str.startsWith('₹')) return str;
        return `₹ ${str}`;
    };

    return (
        <section className="recommended-products">
            <div className="container">
                <h3>Recommended Products</h3>
                <div className="product-grid">
                    {products.map((product, index) => (
                        <div className="product-card" key={index}>
                            <div 
                                style={{ cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
                                onClick={() => onOpenQuickView(product)}
                            >
                                <img src={product.image} alt={product.name} />
                                <div className="product-card-image-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(124, 58, 237, 0.08)', opacity: 0, transition: 'var(--transition-normal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ background: 'rgba(255,255,255,0.9)', color: 'var(--color-primary)', fontWeight: '700', fontSize: '12px', padding: '8px 16px', borderRadius: 'var(--radius-full)', boxShadow: 'var(--shadow-sm)' }}>
                                        <i className="fa-solid fa-eye" style={{ marginRight: '6px' }}></i> Quick View
                                    </span>
                                </div>
                            </div>
                            <h6 onClick={() => onOpenQuickView(product)} style={{ cursor: 'pointer' }}>{product.name}</h6>
                            <p className="description">{product.description}</p>
                            <p className="price">{formatPrice(product.price)}</p>
                            <button onClick={() => handleAddToCart(product)}>
                                <i className="fa-solid fa-cart-plus"></i> Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
                <div className="see-all-container">
                    <Link to="/products/all" className="see-all-btn">
                        See All Products
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RecommendedProducts;
