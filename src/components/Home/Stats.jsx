import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Stats = () => {
  return (
    <section style={{ backgroundColor: 'var(--color-primary)', padding: '3rem 0' }}>
      <Container>
        <Row className="text-center g-4">
          <Col md={3} className="reveal-up delay-100">
            <h2 className="font-sans fw-bold text-white mb-2" style={{ fontSize: '3rem', letterSpacing: '-0.02em' }}>80<span style={{ fontSize: '1.5rem' }}>+</span></h2>
            <h6 className="text-uppercase text-white mb-1" style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em' }}>ACTIVE CLIENTS</h6>
            <span className="text-uppercase" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>Honest & Experience</span>
          </Col>
          <Col md={3} className="reveal-up delay-200">
            <h2 className="font-sans fw-bold text-white mb-2" style={{ fontSize: '3rem', letterSpacing: '-0.02em' }}>340<span style={{ fontSize: '1.5rem' }}>+</span></h2>
            <h6 className="text-uppercase text-white mb-1" style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em' }}>FABRIC SKUS</h6>
            <span className="text-uppercase" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>More styles more power</span>
          </Col>
          <Col md={3} className="reveal-up delay-300">
            <h2 className="font-sans fw-bold text-white mb-2" style={{ fontSize: '3rem', letterSpacing: '-0.02em' }}>18<span style={{ fontSize: '1.5rem' }}>+</span></h2>
            <h6 className="text-uppercase text-white mb-1" style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em' }}>COUNTRIES SOURCED</h6>
            <span className="text-uppercase" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>Power playing With</span>
          </Col>
          <Col md={3} className="reveal-up delay-400">
            <h2 className="font-sans fw-bold text-white mb-2" style={{ fontSize: '3rem', letterSpacing: '-0.02em' }}>24<span style={{ fontSize: '1.5rem' }}>H</span></h2>
            <h6 className="text-uppercase text-white mb-1" style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em' }}>DISPATCH TIME</h6>
            <span className="text-uppercase" style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>Guaranteed same day</span>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Stats;
