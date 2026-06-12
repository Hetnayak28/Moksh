import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/images/background.jpg';

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
        {
            title: "MOKSH CRYSTALS",
            subtitle: "Help the Needy, Support the Elderly and Guide the Youth with premium healing energy.",
            cta: "Explore Collection"
        },
        {
            title: "MOKSH CRYSTALS",
            subtitle: "Discover spiritual harmony and aesthetic grace with values beyond imagination.",
            cta: "Shop Bracelets"
        }
    ];

    const goToPrevSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : slides.length - 1));
    };

    const goToNextSlide = (e) => {
        e.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex < slides.length - 1 ? prevIndex + 1 : 0));
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <section
            className="hero-section"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="container" style={{ overflow: 'hidden' }}>
                <div className="hero-slides" style={{ transform: `translateX(${-currentIndex * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div className="hero-slide" key={index}>
                            <h2>{slide.title}</h2>
                            <h3>{slide.subtitle}</h3>
                            <Link to="/products/all" className="see-all-btn">
                                {slide.cta} <i className="fa-solid fa-arrow-right-long" style={{ marginLeft: '8px' }}></i>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="slider-nav">
                    <button className="prev-slide" onClick={goToPrevSlide} aria-label="Previous slide">
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <div className="pagination-dots">
                        {slides.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                                role="button"
                                aria-label={`Go to slide ${index + 1}`}
                            ></span>
                        ))}
                    </div>
                    <button className="next-slide" onClick={goToNextSlide} aria-label="Next slide">
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
