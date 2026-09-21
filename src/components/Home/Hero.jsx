import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';
import HeroImage from '../../assets/images/P1.jpg';

const Hero = () => {
  return (
    <section className="position-relative overflow-hidden" style={{ backgroundColor: '#FAF9F6', paddingTop: '160px', paddingBottom: '60px' }}>
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="align-items-center g-5">
          {/* Left Text Content */}
          <Col lg={6} className="pe-lg-5">
            <div className="reveal-up">
              <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                NEW 2025 COLLECTION LIVE NOW
              </span>
              <h1 className="mb-4 lh-1 font-sans" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(3.5rem, 6vw, 5rem)' }}>
                <span style={{ color: '#1A1A1A' }}>HIGH QUALITY</span><br />
                <span style={{ color: 'var(--color-primary)' }}>FABRICS FOR</span><br />
                <span style={{ color: '#C8C8C8' }}>MARKET</span>
              </h1>
              <p className="mb-5 pe-lg-4" style={{ fontSize: '1rem', lineHeight: '1.6', color: '#666', maxWidth: '480px' }}>
                Industry-grade fabrics, yarns & materials sourced from the world's finest mills. Trusted by over 5,000 manufacturers across 40 countries.
              </p>
              
              <div className="d-flex flex-wrap gap-3 align-items-center mb-5">
                <a href="#collection" className="btn text-white px-4 py-3 fw-bold rounded-0 d-inline-flex align-items-center gap-2" style={{ backgroundColor: 'var(--color-primary)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                  BROWSE COLLECTION <FiArrowRight />
                </a>
                <a href="#story" className="btn px-4 py-3 fw-bold rounded-0 d-inline-flex align-items-center" style={{ backgroundColor: '#FFFFFF', color: '#1A1A1A', border: '1px solid #EAEAEA', fontSize: '0.8rem', letterSpacing: '0.05em' }}>
                  <span className="me-2" style={{ color: 'var(--color-primary)' }}>+</span> Our Story
                </a>
              </div>

              {/* Stats */}
              <div className="d-flex gap-5 border-top pt-4" style={{ borderColor: '#EAEAEA' }}>
                <div>
                  <h3 className="fw-bold mb-1" style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}>5K+</h3>
                  <span className="text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.1em', color: '#888' }}>CLIENTS WORLDWIDE</span>
                </div>
                <div>
                  <h3 className="fw-bold mb-1" style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}>340+</h3>
                  <span className="text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.1em', color: '#888' }}>FABRIC SKUS</span>
                </div>
                <div>
                  <h3 className="fw-bold mb-1" style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}>18</h3>
                  <span className="text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.1em', color: '#888' }}>COUNTRY ORIGINS</span>
                </div>
              </div>

              {/* Scroll Line */}
              <div className="mt-5 d-flex align-items-center gap-3">
                <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--color-primary)' }}></div>
                <span className="text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.1em', color: '#888' }}>SCROLL TO EXPLORE</span>
              </div>
            </div>
          </Col>

          {/* Right Image Composition */}
          <Col lg={6}>
            <div className="position-relative reveal-clip delay-200">
              <div className="position-relative overflow-hidden shadow-sm" style={{ height: '700px', borderRadius: '4px' }}>
                <img src={HeroImage} alt="Textile Factory" className="img-cover w-100 h-100" />
              </div>

              {/* Floating Top Card */}
              <div className="position-absolute bg-white p-3 shadow-sm d-flex align-items-center flex-column" style={{ top: '60px', right: '-20px', borderRadius: '4px', zIndex: 10 }}>
                <span className="text-uppercase d-block mb-2" style={{ fontSize: '0.6rem', fontWeight: '600', letterSpacing: '0.1em', color: '#888' }}>AVAILABLE COLORS</span>
                <div className="d-flex gap-2 mb-2">
                  <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#D95C5C' }}></div>
                  <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#3A5C8E' }}></div>
                  <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#EAD3A8' }}></div>
                  <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#7B8A74' }}></div>
                </div>
                <span className="text-uppercase" style={{ fontSize: '0.6rem', fontWeight: '600', color: '#888' }}>+12 MORE SHADES</span>
              </div>

              {/* Floating Middle Card */}
              <div className="position-absolute bg-white p-4 shadow-sm" style={{ top: '50%', left: '-40px', transform: 'translateY(-50%)', borderRadius: '4px', zIndex: 10 }}>
                <span className="text-uppercase d-block mb-1" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.1em', color: '#888' }}>CURRENT OFFER</span>
                <h4 className="fw-bold mb-1" style={{ color: 'var(--color-primary)', fontSize: '1.5rem' }}>$90</h4>
                <span className="text-uppercase" style={{ fontSize: '0.6rem', fontWeight: '600', color: '#888' }}>FREE SHIPPING ABOVE $150</span>
              </div>

              {/* Floating Bottom Card */}
              <div className="position-absolute bottom-0 start-50 translate-middle-x bg-white p-4 shadow-sm w-75 mb-4" style={{ borderRadius: '4px', zIndex: 10 }}>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--color-primary)' }}>PREMIUM</span>
                </div>
                <h5 className="font-serif fw-bold text-dark mb-1">Harvest Linen Pro</h5>
                <p className="text-muted small mb-0 font-sans" style={{ fontSize: '0.75rem' }}>
                  Belgian Origin · 220gsm · MOQ: 50m
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
