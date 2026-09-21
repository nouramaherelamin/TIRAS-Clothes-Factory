import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';
import P18 from '../../assets/images/P18.webp';
import P19 from '../../assets/images/P19.webp';
import P20 from '../../assets/images/P20.webp';

const services = [
  { id: '01', title: 'OEM Manufacturing', image: P18, desc: 'Full-scale production based on your exact specifications and tech packs.' },
  { id: '02', title: 'ODM Design', image: P19, desc: 'End-to-end design and manufacturing solutions developed by our in-house experts.' },
  { id: '03', title: 'Global Logistics', image: P20, desc: 'Seamless supply chain management and worldwide distribution.' }
];

const Services = () => {
  const [hoveredService, setHoveredService] = useState(0);

  return (
    <section className="section-padding position-relative bg-light overflow-hidden">
      {/* Dynamic Background Image */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 0, opacity: 0.15 }}>
        {services.map((srv, idx) => (
          <img 
            key={srv.id}
            src={srv.image} 
            alt={srv.title}
            className="img-cover position-absolute top-0 start-0 w-100 h-100 transition-all"
            style={{ 
              opacity: hoveredService === idx ? 1 : 0, 
              transform: hoveredService === idx ? 'scale(1)' : 'scale(1.05)',
              transitionDuration: '1s'
            }}
          />
        ))}
      </div>

      <Container className="position-relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-5 pb-5 reveal-up">
          <span className="z7-eyebrow d-block mb-3">Capabilities</span>
          <h2 className="z7-hero-title fs-1 mb-0">Our <em>Services</em></h2>
        </div>

        <div className="service-list">
          {services.map((srv, idx) => (
            <div 
              key={srv.id}
              className="service-row border-top border-dark py-4 py-md-5 d-flex flex-column flex-md-row justify-content-between align-items-md-center reveal-up"
              style={{ cursor: 'pointer', transition: 'var(--transition-fast)' }}
              onMouseEnter={() => setHoveredService(idx)}
            >
              <div className="d-flex align-items-center gap-4 gap-md-5 mb-3 mb-md-0">
                <span className="font-serif text-muted fs-4">{srv.id}</span>
                <h3 
                  className="display-5 font-sans fw-bold mb-0 transition-all"
                  style={{ color: hoveredService === idx ? 'var(--color-primary)' : 'var(--color-dark)' }}
                >
                  {srv.title}
                </h3>
              </div>
              <div className="d-flex align-items-center gap-5 justify-content-between justify-content-md-end w-100 w-md-auto ms-md-auto">
                <p 
                  className="text-muted mb-0 transition-all d-none d-lg-block" 
                  style={{ maxWidth: '300px', opacity: hoveredService === idx ? 1 : 0, transform: hoveredService === idx ? 'translateX(0)' : 'translateX(-20px)' }}
                >
                  {srv.desc}
                </p>
                <div 
                  className="border border-dark d-flex align-items-center justify-content-center transition-all flex-shrink-0"
                  style={{ 
                    width: '60px', height: '60px', 
                    backgroundColor: hoveredService === idx ? 'var(--color-dark)' : 'transparent',
                    color: hoveredService === idx ? 'white' : 'var(--color-dark)'
                  }}
                >
                  <FiArrowRight size={24} style={{ transform: hoveredService === idx ? 'rotate(-45deg)' : 'none', transition: '0.3s' }} />
                </div>
              </div>
            </div>
          ))}
          <div className="border-top border-dark"></div>
        </div>
      </Container>
    </section>
  );
};

export default Services;
