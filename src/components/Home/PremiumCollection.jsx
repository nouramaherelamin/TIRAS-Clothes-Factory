import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';
import P15 from '../../assets/images/P15.webp';
import P5 from '../../assets/images/P5.jpg';
import P14 from '../../assets/images/P14.webp';

const PremiumCollection = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: '#FAF9F6' }}>
      <Container>
        {/* Header Area */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 reveal-up">
          <div>
            <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              QUALITY THREADS
            </span>
            <h2 className="mb-0 font-sans" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#1A1A1A', lineHeight: '1.1' }}>
              PREMIUM FABRIC
            </h2>
            <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1' }}>
              Collection
            </h2>
          </div>
          <Link to="/shop" className="text-decoration-none fw-bold text-uppercase d-inline-flex align-items-center gap-2 hover-arrow mt-4 mt-md-0" style={{ color: '#888', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
            VIEW ALL <FiArrowRight />
          </Link>
        </div>

        {/* 4 Column Cards Layout */}
        <Row className="g-0 mt-5 reveal-up delay-200">
          
          {/* Card 1 */}
          <Col md={3}>
            <div className="position-relative overflow-hidden group-hover-zoom" style={{ height: '450px' }}>
              <img src={P15} alt="Wool" className="img-cover w-100 h-100" style={{ filter: 'grayscale(100%) brightness(0.8)' }} />
              <div className="position-absolute bottom-0 start-0 p-4 w-100">
                <h4 className="text-white font-sans fw-bold mb-1">WOOL</h4>
                <span className="text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' }}>PERFORMANCE</span>
              </div>
            </div>
          </Col>

          {/* Card 2 */}
          <Col md={3}>
            <div className="position-relative overflow-hidden group-hover-zoom" style={{ height: '450px' }}>
              <img src={P14} alt="Denim" className="img-cover w-100 h-100" style={{ filter: 'grayscale(100%) brightness(0.8)' }} />
              <div className="position-absolute bottom-0 start-0 p-4 w-100">
                <h4 className="text-white font-sans fw-bold mb-1">DENIM</h4>
                <span className="text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' }}>INNOVATION</span>
              </div>
            </div>
          </Col>

          {/* Card 3 - Action Card */}
          <Col md={3}>
            <div className="position-relative h-100 d-flex flex-column justify-content-center p-5" style={{ backgroundColor: 'var(--color-primary)' }}>
              <div className="mb-4">
                <div style={{ width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '20px', height: '20px', border: '1px solid white' }}></div>
                </div>
              </div>
              <h4 className="text-white font-sans fw-bold mb-3" style={{ fontSize: '1.25rem' }}>EXPLORE COLLECTION</h4>
              <p className="text-white-50 mb-4 font-sans" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
                Regular stretching is a proven tool to optimize your natural cycle, and improves recovery after physical activity.
              </p>
              <Link to="/shop" className="text-white fw-bold text-decoration-none d-inline-flex align-items-center gap-2 hover-arrow text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                LEARN MORE <FiArrowRight />
              </Link>
            </div>
          </Col>

          {/* Card 4 */}
          <Col md={3}>
            <div className="position-relative overflow-hidden group-hover-zoom" style={{ height: '450px' }}>
              <img src={P5} alt="Silk" className="img-cover w-100 h-100" style={{ filter: 'brightness(0.8)' }} />
              <div className="position-absolute bottom-0 start-0 p-4 w-100">
                <h4 className="text-white font-sans fw-bold mb-1">SILK</h4>
                <span className="text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' }}>CONSISTENCY</span>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default PremiumCollection;
