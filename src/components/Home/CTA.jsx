import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';
import P36 from '../../assets/images/P36.avif';

const CTA = () => {
  return (
    <section className="cta-section py-0 position-relative border-top" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0 }}>
         <img src={P36} alt="Factory background" className="img-cover" style={{ filter: 'brightness(0.2) sepia(0.2) hue-rotate(-20deg)' }} />
      </div>
      
      <Container className="position-relative py-5" style={{ zIndex: 2 }}>
        <Row className="justify-content-center text-center py-5 my-md-5 reveal-up">
          <Col lg={9} className="py-5">
            <span className="d-inline-flex align-items-center mb-4" style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              Start Your Project
            </span>
            
            <h2 className="mb-2 font-sans text-white" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1' }}>
              BRING YOUR
            </h2>
            <h2 className="editorial-italic mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
              Vision to Life
            </h2>
            
            <p className="lead text-white-50 mb-5 mx-auto font-sans" style={{ maxWidth: '700px', fontSize: '1.1rem', lineHeight: '1.6' }}>
              Partner with Z7 Clothes Factory for premium quality, sustainable manufacturing, and reliable global delivery. Let's create exceptional garments together.
            </p>
            
            <div className="d-flex gap-4 justify-content-center flex-wrap mt-4">
              <Link to="/contact" className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3 transition-all hover-scale" style={{ backgroundColor: 'var(--color-primary)', borderRadius: '4px', fontSize: '0.9rem' }}>
                Request a Quote <FiArrowRight className="ms-2" />
              </Link>
              <Link to="/contact" className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3 transition-all hover-scale" style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', fontSize: '0.9rem' }}>
                Contact Us <FiArrowRight className="ms-2" />
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CTA;
