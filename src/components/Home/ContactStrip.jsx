import React from 'react';
import { Container } from 'react-bootstrap';
import { FiPhoneCall, FiStar } from 'react-icons/fi';

const ContactStrip = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#FAF9F6' }}>
      <Container className="text-center reveal-up">
        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
          <div className="d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: '40px', height: '40px', backgroundColor: '#EBE6E1', color: 'var(--color-primary)' }}>
            <FiPhoneCall size={18} />
          </div>
          <h5 className="font-sans fw-bold mb-0 text-uppercase" style={{ fontSize: '1rem', letterSpacing: '0.02em', color: '#1A1A1A' }}>
            GAIN INSIGHTS FROM LOGISTICS EXPERTS - <span style={{ color: 'var(--color-primary)' }}>CALL US: +(123) 456-789</span>
          </h5>
        </div>
        
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex align-items-center gap-2 mb-2">
            <h3 className="font-sans fw-bold mb-0 text-dark" style={{ fontSize: '1.5rem' }}>4.0/5</h3>
            <div className="d-flex text-danger">
              <FiStar size={14} fill="currentColor" />
              <FiStar size={14} fill="currentColor" />
              <FiStar size={14} fill="currentColor" />
              <FiStar size={14} fill="currentColor" />
              <FiStar size={14} color="#D3D3D3" />
            </div>
          </div>
          <span className="text-uppercase" style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.2em', color: '#888' }}>
            BUILDING INDUSTRY RESULTS
          </span>
        </div>
      </Container>
    </section>
  );
};

export default ContactStrip;
