import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import P6 from '../../assets/images/P6.jpg';
import P7 from '../../assets/images/P7.jpg';

const AdvancedManufacturing = () => {
  return (
    <section className="section-padding position-relative overflow-hidden" style={{ backgroundColor: '#2B0A0F' }}>
      <Container>
        <Row className="align-items-center">
          <Col lg={5} className="z-2 reveal-up">
            <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              Facility
            </span>
            <h2 className="mb-0 font-sans text-white" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
              ADVANCED
            </h2>
            <h2 className="editorial-italic mb-5" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
              Processing
            </h2>

            <Row className="g-4 border-top pt-4 mt-4" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
              <Col xs={6}>
                <span className="d-block text-white font-sans fs-3 fw-bold mb-1">0.1mm</span>
                <span className="text-uppercase font-sans text-white-50 small fw-bold letter-spacing-1">Cutting Precision</span>
              </Col>
              <Col xs={6}>
                <span className="d-block text-white font-sans fs-3 fw-bold mb-1">10k+</span>
                <span className="text-uppercase font-sans text-white-50 small fw-bold letter-spacing-1">Daily Capacity</span>
              </Col>
              <Col xs={6}>
                <span className="d-block text-white font-sans fs-3 fw-bold mb-1">ISO</span>
                <span className="text-uppercase font-sans text-white-50 small fw-bold letter-spacing-1">Certified Line</span>
              </Col>
              <Col xs={6}>
                <span className="d-block text-white font-sans fs-3 fw-bold mb-1">Eco</span>
                <span className="text-uppercase font-sans text-white-50 small fw-bold letter-spacing-1">Water System</span>
              </Col>
            </Row>
          </Col>

          <Col lg={7} className="mt-5 mt-lg-0 position-relative z-1 reveal-clip delay-200">
            <div className="d-flex align-items-center gap-4 ms-lg-4">
              <div className="overflow-hidden group-hover-zoom" style={{ width: '45%', height: '500px', transform: 'translateY(50px)', borderRadius: '8px' }}>
                <img src={P6} alt="Automated Machinery" className="img-cover opacity-75 transition-all" style={{ transitionDuration: '1s' }} />
              </div>
              <div className="overflow-hidden group-hover-zoom" style={{ width: '55%', height: '650px', transform: 'translateY(-30px)', borderRadius: '8px' }}>
                <img src={P7} alt="Industrial Facility" className="img-cover transition-all" style={{ transitionDuration: '1s' }} />
                <div className="position-absolute bottom-0 start-0 bg-primary-custom text-white p-4 w-100" style={{ opacity: 0.9 }}>
                  <h4 className="font-sans fw-bold fs-5 mb-0">Automated Engineering</h4>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AdvancedManufacturing;
