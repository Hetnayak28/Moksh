import React from 'react';

const AboutUs = () => {
    return (
        <section className="about-us">
            <div className="container">
                <h2>About Us</h2>
                <p>Welcome to MOAKSH. We are dedicated to providing the best wellness products and crystals to our customers. Our mission is to Help the Needy, Support the Elderly, and Guide the Youth, with values beyond imaginations.</p>
                <p>Founded in 2025, we have grown from a small online store to a leading provider in our niche. We believe in quality, customer satisfaction, and continuous improvement.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', margin: '48px 0' }}>
                    <div style={{ background: 'var(--color-bg-surface)', padding: '32px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                        <i className="fa-solid fa-eye" style={{ fontSize: '32px', color: 'var(--color-primary)', marginBottom: '16px' }}></i>
                        <h4 style={{ fontSize: '22px', marginBottom: '12px' }}>Our Vision</h4>
                        <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '0' }}>To be the most trusted and customer-centric company, offering unique wellness products that bring positive energy and transformation to people's lives.</p>
                    </div>
                    
                    <div style={{ background: 'var(--color-bg-surface)', padding: '32px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
                        <i className="fa-solid fa-bullseye" style={{ fontSize: '32px', color: 'var(--color-secondary)', marginBottom: '16px' }}></i>
                        <h4 style={{ fontSize: '22px', marginBottom: '12px' }}>Our Mission</h4>
                        <p style={{ fontSize: '15px', color: 'var(--color-text-muted)', marginBottom: '0' }}>To deliver high-quality, ethically sourced products and provide exceptional customer service, fostering a supportive community of conscious consumers.</p>
                    </div>
                </div>

                <h3>Our Values</h3>
                <ul>
                    <li>
                        <strong style={{ display: 'flex', alignItems: 'center', fontSize: '18px', color: 'var(--color-primary)', marginBottom: '8px' }}>
                            <i className="fa-solid fa-scale-balanced" style={{ marginRight: '10px' }}></i>
                            Integrity
                        </strong>
                        We operate with absolute honesty, transparency, and accountability in all our products and customer relationships.
                    </li>
                    <li>
                        <strong style={{ display: 'flex', alignItems: 'center', fontSize: '18px', color: 'var(--color-primary)', marginBottom: '8px' }}>
                            <i className="fa-solid fa-award" style={{ marginRight: '10px' }}></i>
                            Excellence
                        </strong>
                        We strive for the highest quality, ensuring that every crystal, bracelet, and service exceeds standards.
                    </li>
                    <li>
                        <strong style={{ display: 'flex', alignItems: 'center', fontSize: '18px', color: 'var(--color-primary)', marginBottom: '8px' }}>
                            <i className="fa-solid fa-users" style={{ marginRight: '10px' }}></i>
                            Community
                        </strong>
                        We believe in actively supporting and uplifting our community, helping the needy, and guiding our youth.
                    </li>
                    <li>
                        <strong style={{ display: 'flex', alignItems: 'center', fontSize: '18px', color: 'var(--color-primary)', marginBottom: '8px' }}>
                            <i className="fa-solid fa-lightbulb" style={{ marginRight: '10px' }}></i>
                            Innovation
                        </strong>
                        We constantly seek new ways to improve, curate unique products, and evolve our practices for the modern seeker.
                    </li>
                </ul>
            </div>
        </section>
    );
};

export default AboutUs;
