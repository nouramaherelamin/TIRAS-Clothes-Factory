import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiTarget, FiShield, FiSliders } from 'react-icons/fi';
import P28 from '../../assets/images/P28.webp';

const CompanyCapabilities = () => {
  const capabilities = [
    { icon: <FiTarget size={32} />, title: 'Production Capability', desc: 'Scalable manufacturing lines capable of handling boutique capsule collections up to high-volume global distributions.' },
    { icon: <FiShield size={32} />, title: 'Quality Control', desc: 'Integrated multi-tier inspection protocols ensuring dimensional stability, color accuracy, and flawless assembly.' },
    { icon: <FiSliders size={32} />, title: 'Custom Manufacturing', desc: 'End-to-end bespoke solutions from initial pattern engineering to custom hardware sourcing and specialty washes.' }
  ];

  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      <Container>
        <div className="text-center mb-5 pb-5 reveal-up">
          <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
            End-to-End Solutions
          </span>
          <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
            CONCEPT TO
          </h2>
          <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
            Market
          </h2>
        </div>

        <Row className="g-5 align-items-center">
          <Col lg={6} className="reveal-clip">
            <div className="position-relative group-hover-zoom shadow-sm" style={{ height: '600px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={P28} alt="Factory Infrastructure" className="img-cover transition-all" style={{ transitionDuration: '1s' }} />
              
              <div className="position-absolute top-50 start-50 translate-middle bg-white p-4 text-center shadow-sm reveal-up delay-200 d-flex flex-column justify-content-center" style={{ width: '150px', height: '150px', borderRadius: '50%' }}>
                <span className="font-sans fw-bold text-dark fs-2 lh-1 d-block mb-1">360°</span>
                <span className="font-sans text-uppercase fw-bold" style={{ fontSize: '0.65rem', letterSpacing: '1px', color: 'var(--color-primary)' }}>Integration</span>
              </div>
            </div>
          </Col>

          <Col lg={6} className="ps-lg-5">
            <div className="d-flex flex-column gap-5">
              {capabilities.map((cap, idx) => (
                <div key={idx} className={`d-flex gap-4 reveal-up delay-${(idx + 1) * 100}`}>
                  <div className="text-primary-custom flex-shrink-0 mt-1">
                    {cap.icon}
                  </div>
                  <div>
                    <h4 className="font-sans fw-bold text-dark mb-2" style={{ fontSize: '1.25rem' }}>{cap.title}</h4>
                    <p className="text-muted font-sans mb-0 lh-base" style={{ fontSize: '0.9rem' }}>
                      {cap.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CompanyCapabilities;
