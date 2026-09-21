import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import P23 from '../../assets/images/P23.webp';
import P24 from '../../assets/images/P24.webp';
import P25 from '../../assets/images/P25.webp';
import P26 from '../../assets/images/P26.webp';
import P27 from '../../assets/images/P27.webp';

const LeatherSection = () => {
  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: '#FAF9F6' }}>
      <Container>
        <Row className="align-items-center mb-5 pb-5">
          <Col lg={5} className="reveal-up">
            <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              Specialty Division
            </span>
            <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
              PREMIUM
            </h2>
            <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
              Leather Craft
            </h2>
          </Col>
          <Col lg={6} className="offset-lg-1 mt-4 mt-lg-0 reveal-up delay-100">
            <p className="lead text-muted mb-0 font-sans" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              From ethically sourced hides to masterful stitching, our leather division combines age-old artisanship with modern precision cutting technology to produce unparalleled outerwear and accessories.
            </p>
          </Col>
        </Row>

        <div className="position-relative w-100" style={{ height: '800px' }}>
          <div className="position-absolute top-50 start-50 translate-middle w-50 h-100 reveal-clip delay-200 z-1 group-hover-zoom shadow-sm" style={{ borderRadius: '8px', overflow: 'hidden' }}>
            <img src={P23} alt="Premium Leather Main" className="img-cover" />
          </div>

          <div className="position-absolute top-0 start-0 w-25 reveal-clip delay-300 group-hover-zoom z-2 shadow-sm" style={{ height: '35%', marginTop: '5%', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={P24} alt="Leather texture" className="img-cover" />
          </div>

          <div className="position-absolute bottom-0 start-0 w-25 reveal-clip delay-400 group-hover-zoom z-2 shadow-sm" style={{ height: '40%', marginBottom: '5%', marginLeft: '5%', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={P25} alt="Leather stitching" className="img-cover" />
            <div className="position-absolute bottom-0 start-0 w-100 p-3 bg-white bg-opacity-75 backdrop-blur">
              <span className="text-dark fw-bold text-uppercase small letter-spacing-1 font-sans">Hand Finished</span>
            </div>
          </div>

          <div className="position-absolute top-0 end-0 w-25 reveal-clip delay-300 group-hover-zoom z-2 shadow-sm" style={{ height: '45%', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={P26} alt="Leather hardware" className="img-cover" />
          </div>

          <div className="position-absolute bottom-0 end-0 w-25 reveal-clip delay-400 group-hover-zoom z-2 shadow-sm" style={{ height: '30%', marginBottom: '10%', marginRight: '5%', borderRadius: '8px', overflow: 'hidden' }}>
            <img src={P27} alt="Leather edges" className="img-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default LeatherSection;
