import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import P12 from '../../assets/images/P12.jpg';
import P14 from '../../assets/images/P14.webp';

const QualityTesting = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FAF9F6' }}>
      <Container>
        {/* Header Area */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 reveal-up">
          <div>
            <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              LAB TESTING
            </span>
            <h2 className="mb-0 font-sans" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#1A1A1A', lineHeight: '1.1' }}>
              QUALITY FABRIC
            </h2>
            <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1' }}>
              Testing
            </h2>
          </div>
          <Link to="/services" className="text-decoration-none fw-bold text-uppercase d-inline-flex align-items-center gap-2 hover-arrow mt-4 mt-md-0" style={{ color: '#888', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            ALL SERVICES <FiArrowRight />
          </Link>
        </div>

        <Row className="g-4 mt-4 reveal-up delay-200">
          {/* Left Card */}
          <Col md={4} className="d-flex">
            <div className="bg-white p-5 w-100 shadow-sm d-flex flex-column justify-content-between" style={{ borderRadius: '8px' }}>
              <div>
                <div className="mb-4 d-inline-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '8px' }}>
                  <FiCheckCircle size={24} />
                </div>
                <h4 className="font-sans fw-bold text-dark mb-3">RESPONSIBLE SOURCING</h4>
                <p className="text-muted mb-4 font-sans" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                  Regular stretching is a proven tool to optimize your natural cycle, and improves recovery after physical activity.
                </p>
                <ul className="list-unstyled mb-5">
                  <li className="d-flex align-items-center mb-3 text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.05em' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} className="me-3"></div>
                    CERTIFIED ETHICAL SUPPLIERS
                  </li>
                  <li className="d-flex align-items-center mb-3 text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.05em' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} className="me-3"></div>
                    ZERO WASTE SOLUTIONS
                  </li>
                  <li className="d-flex align-items-center text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '700', letterSpacing: '0.05em' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }} className="me-3"></div>
                    ECO-FRIENDLY DYEING
                  </li>
                </ul>
              </div>
              <Link to="/about" className="text-decoration-none fw-bold text-uppercase d-inline-flex align-items-center gap-2 hover-arrow" style={{ color: '#888', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                VIEW ALL <FiArrowRight />
              </Link>
            </div>
          </Col>

          {/* Center Image */}
          <Col md={4} className="d-flex">
            <div className="position-relative overflow-hidden shadow-sm w-100" style={{ borderRadius: '8px', minHeight: '400px' }}>
              <img src={P12} alt="Quality Checking" className="img-cover w-100 h-100" />
            </div>
          </Col>

          {/* Right Card */}
          <Col md={4} className="d-flex">
            <div className="bg-white p-5 w-100 shadow-sm d-flex flex-column justify-content-between" style={{ borderRadius: '8px' }}>
              <div>
                <div className="d-flex gap-2 mb-3">
                  <span className="text-uppercase" style={{ fontSize: '0.6rem', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--color-primary)' }}>Textile</span>
                  <span className="text-uppercase" style={{ fontSize: '0.6rem', fontWeight: '600', letterSpacing: '0.1em', color: '#888' }}>Industrial</span>
                </div>
                <h4 className="font-sans fw-bold text-dark mb-3">ECO FRIENDLY PRODUCTION</h4>
                <p className="text-muted mb-4 font-sans" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                  Regular stretching is a proven tool to optimize your natural cycle, and improves recovery after physical activity.
                </p>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></div>
                  <span className="text-uppercase" style={{ fontSize: '0.6rem', fontWeight: '700', letterSpacing: '0.05em', color: 'var(--color-primary)' }}>BACKED BY DISCOUNT VIDEO</span>
                </div>
                <div className="overflow-hidden mt-3" style={{ borderRadius: '4px', height: '120px' }}>
                  <img src={P14} alt="Eco Friendly" className="img-cover w-100 h-100" />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default QualityTesting;
