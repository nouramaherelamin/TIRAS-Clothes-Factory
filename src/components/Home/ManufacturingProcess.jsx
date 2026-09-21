import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import P8 from '../../assets/images/P8.jpg';
import P2 from '../../assets/images/P2.jpg';
import P3 from '../../assets/images/P3.webp';
import P4 from '../../assets/images/P4.jpg';

const steps = [
  { id: '01', title: 'Design & Engineering', desc: 'Translating concepts into technical specifications with precision pattern making and 3D modeling.', image: P8 },
  { id: '02', title: 'Material Sourcing', desc: 'Procuring premium sustainable fabrics and hardware from our global network of certified mills.', image: P2 },
  { id: '03', title: 'Precision Cutting', desc: 'Automated laser cutting ensures zero-waste precision across all garment panels and linings.', image: P3 },
  { id: '04', title: 'Assembly & Finishing', desc: 'Skilled artisans assemble pieces with state-of-the-art machinery, followed by meticulous hand-finishing.', image: P4 }
];

const ManufacturingProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="section-padding bg-white overflow-hidden">
      <Container>
        <Row className="mb-5 pb-4">
          <Col lg={8} className="reveal-up">
            <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              Methodology
            </span>
            <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
              THE ART OF
            </h2>
            <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
              Creation
            </h2>
          </Col>
        </Row>

        <Row className="g-5 align-items-center">
          <Col lg={5} className="reveal-up delay-100">
            <div className="pe-lg-5">
              {steps.map((step, index) => (
                <div 
                  key={step.id}
                  className={`d-flex gap-4 mb-4 pb-4 cursor-pointer transition-all ${index !== steps.length - 1 ? 'border-bottom' : ''}`}
                  onClick={() => setActiveStep(index)}
                  style={{ opacity: activeStep === index ? 1 : 0.4, cursor: 'pointer', borderColor: '#EAEAEA' }}
                >
                  <h3 className="font-sans fw-bold mb-0" style={{ fontSize: '2.5rem', color: activeStep === index ? 'var(--color-primary)' : '#888' }}>{step.id}</h3>
                  <div>
                    <h4 className="fw-bold text-dark mb-2 font-sans fs-3">{step.title}</h4>
                    <div className="overflow-hidden transition-all" style={{ maxHeight: activeStep === index ? '100px' : '0', opacity: activeStep === index ? 1 : 0 }}>
                      <p className="text-muted mb-0 pt-2 font-sans">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Col>

          <Col lg={7} className="reveal-clip delay-200">
            <div className="position-relative overflow-hidden shadow-sm" style={{ height: '700px', borderRadius: '8px', backgroundColor: '#FAF9F6' }}>
              {steps.map((step, index) => (
                <img 
                  key={step.id}
                  src={step.image} 
                  alt={step.title} 
                  className="img-cover position-absolute top-0 start-0 w-100 h-100 transition-all"
                  style={{ opacity: activeStep === index ? 1 : 0, transform: activeStep === index ? 'scale(1)' : 'scale(1.05)', transitionDuration: '0.8s' }} 
                />
              ))}
              <div className="position-absolute bottom-0 start-0 w-100 bg-white" style={{ height: '4px', opacity: 0.8 }}>
                <div className="bg-primary-custom h-100 transition-all" style={{ width: `${((activeStep + 1) / steps.length) * 100}%`, transitionDuration: '0.5s' }}></div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ManufacturingProcess;
