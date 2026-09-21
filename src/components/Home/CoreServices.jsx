import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const servicesList = [
  { id: '01', title: 'CRAFTED TO IMPRESS', eyebrow: 'CRAFTING', desc: 'Experience 30/36 years of innovation and craftsmanship, we bring you fabrics that speak of quality...' },
  { id: '02', title: 'SUSTAINABLE FABRICS', eyebrow: 'ECOLOGY', desc: 'Experience 30/36 years of innovation and craftsmanship, we bring you fabrics that speak of quality...' },
  { id: '03', title: 'TAILORED PERFECTION', eyebrow: 'BESPOKE', desc: 'Experience 30/36 years of innovation and craftsmanship, we bring you fabrics that speak of quality...' },
  { id: '04', title: 'STITCHING INNOVATION', eyebrow: 'QUALITY', desc: 'Experience 30/36 years of innovation and craftsmanship, we bring you fabrics that speak of quality...' },
  { id: '05', title: 'DURABILITY WOVEN IN', eyebrow: 'WEAVING', desc: 'Experience 30/36 years of innovation and craftsmanship, we bring you fabrics that speak of quality...' }
];

const CoreServices = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: '#2B0A0F' }}>
      <Container>
        <div className="d-flex flex-column flex-lg-row justify-content-between mb-5 reveal-up">
          <div className="mb-4 mb-lg-0">
            <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              FEATURED SERVICES
            </span>
            <h2 className="mb-0 font-sans text-white" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
              OUR CORE
            </h2>
            <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
              Services
            </h2>
          </div>
          <div className="d-flex flex-column align-items-lg-end justify-content-end" style={{ maxWidth: '400px' }}>
            <p className="text-white-50 text-lg-end mb-4 font-sans" style={{ fontSize: '0.85rem', lineHeight: '1.6' }}>
              From raw fiber sourcing to industrial-grade finishing, we provide end-to-end textile solutions for the world's leading brands.
            </p>
            <Link to="/services" className="text-white text-decoration-none fw-bold text-uppercase d-inline-flex align-items-center gap-2 hover-arrow" style={{ fontSize: '0.7rem', letterSpacing: '0.1em' }}>
              ALL SERVICES <div className="bg-white text-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '20px', height: '20px' }}><FiArrowUpRight size={12} /></div>
            </Link>
          </div>
        </div>

        <div className="mt-5 pt-4">
          {servicesList.map((srv, idx) => (
            <div key={srv.id} className="reveal-up py-4" style={{ animationDelay: `${idx * 100}ms`, borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: idx === servicesList.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <Row className="align-items-center">
                <Col xs={2} md={2}>
                  <span className="font-serif fw-bold" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'var(--color-primary)' }}>
                    {srv.id}
                  </span>
                </Col>
                <Col xs={8} md={8}>
                  <div className="d-flex flex-column justify-content-center">
                    <span className="text-uppercase mb-2 d-inline-block px-2 py-1" style={{ fontSize: '0.5rem', fontWeight: '600', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.2)', width: 'fit-content', borderRadius: '2px' }}>{srv.eyebrow}</span>
                    <h3 className="font-sans fw-bold text-white mb-2" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)' }}>
                      {srv.title}
                    </h3>
                    <p className="text-white-50 mb-0 font-sans" style={{ fontSize: '0.75rem', maxWidth: '500px' }}>
                      {srv.desc}
                    </p>
                  </div>
                </Col>
                <Col xs={2} md={2} className="text-end">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '45px', height: '45px', backgroundColor: 'var(--color-primary)', color: 'white' }}>
                    <FiArrowUpRight size={20} />
                  </div>
                </Col>
              </Row>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CoreServices;
