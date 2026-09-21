import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import P29 from '../../assets/images/P29.webp';

const StrategicAdvantage = () => {
  const advantages = [
    { num: '01', title: 'Global Production', desc: 'Seamless international supply chain management enabling efficient delivery worldwide.' },
    { num: '02', title: 'Quality Control', desc: 'Rigorous multi-stage inspections at every critical point of the manufacturing cycle.' },
    { num: '03', title: 'Flexible Manufacturing', desc: 'Agile production lines designed to accommodate both boutique runs and mass scaling.' },
    { num: '04', title: 'Premium Finishing', desc: 'Artisanal attention to detail applied to washes, stitching, and hardware integration.' }
  ];

  return (
    <section className="section-padding position-relative overflow-hidden" style={{ backgroundColor: '#FAF9F6' }}>
      <div className="position-absolute text-muted opacity-10 font-sans fw-bold text-nowrap" style={{ fontSize: '15rem', left: '-2%', bottom: '-10%', zIndex: 0, userSelect: 'none', letterSpacing: '-0.02em', color: '#EAEAEA' }}>
        ADVANTAGE
      </div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <Row className="mb-5 pb-4">
          <Col lg={7} className="reveal-up">
            <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              Why Choose Us
            </span>
            <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
              UNPARALLELED
            </h2>
            <h2 className="editorial-italic mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
              Strategic Advantage
            </h2>
            <p className="lead text-muted font-sans pe-lg-5" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
              Partnering with us means gaining a decisive edge in the competitive fashion market. We combine rapid scalability with uncompromising luxury standards.
            </p>
          </Col>
        </Row>

        <Row className="g-5 align-items-center">
          <Col lg={5} className="reveal-clip">
            <div className="position-relative overflow-hidden group-hover-zoom shadow-sm" style={{ height: '600px', borderRadius: '8px' }}>
              <img src={P29} alt="Finishing Process" className="img-cover transition-all" style={{ transitionDuration: '1s' }} />
              
              <div className="position-absolute top-0 end-0 p-4 text-center" style={{ backgroundColor: 'var(--color-primary)', color: 'white', borderRadius: '0 8px 0 8px' }}>
                <span className="font-sans fw-bold d-block fs-3">Z7</span>
                <span className="text-uppercase font-sans small letter-spacing-1 fw-bold">Standard</span>
              </div>
            </div>
          </Col>

          <Col lg={7}>
            <Row className="g-4 g-md-5">
              {advantages.map((adv, idx) => (
                <Col md={6} key={adv.num} className="reveal-up" style={{ animationDelay: `${(idx + 1) * 150}ms` }}>
                  <div className="pt-4 h-100" style={{ borderTop: '1px solid #EAEAEA' }}>
                    <span className="font-sans fs-4 d-block mb-3 fw-bold" style={{ color: 'var(--color-primary)' }}>{adv.num}.</span>
                    <h4 className="font-sans fw-bold text-dark mb-3" style={{ fontSize: '1.25rem' }}>{adv.title}</h4>
                    <p className="text-muted font-sans small lh-base mb-0 pe-3" style={{ fontSize: '0.9rem' }}>
                      {adv.desc}
                    </p>
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default StrategicAdvantage;
