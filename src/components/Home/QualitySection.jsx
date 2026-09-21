import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiCheckCircle } from 'react-icons/fi';
import P12 from '../../assets/images/P12.jpg';

const QualitySection = () => {
  return (
    <section className="py-5 bg-white">
      <Container fluid className="px-md-5">
        <div className="position-relative overflow-hidden  reveal-clip border border-dark" style={{ minHeight: '80vh', backgroundColor: 'var(--color-dark)' }}>
          {/* Background Image */}
          <img src={P12} alt="Quality Inspection" className="img-cover position-absolute top-0 start-0 w-100 h-100 opacity-75" style={{ objectPosition: 'center 30%' }} />
          
          {/* Layered Text Box */}
          <div className="position-absolute h-100 w-100 top-0 start-0 d-flex align-items-center">
            <Container>
              <Row>
                <Col lg={5} md={8}>
                  <div className="bg-white p-5 p-md-5 border border-dark reveal-up delay-200" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(253, 252, 251, 0.95)' }}>
                    <span className="z7-eyebrow mb-3 d-block">Zero Compromise</span>
                    <h2 className="z7-hero-title fs-1 mb-4">Uncompromising <br /><em>Quality</em></h2>
                    <p className="text-muted mb-5 font-sans" style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                      Our rigorous multi-stage inspection process guarantees that every garment leaving our facility meets global luxury standards. Perfection is not an aspiration; it is our baseline.
                    </p>
                    <ul className="list-unstyled mb-0">
                      {['Fabric Tensile Testing', 'Seam Strength Analysis', 'Color Fastness Verification', 'Dimensional Stability Check'].map((item, idx) => (
                        <li key={idx} className="d-flex align-items-center gap-3 mb-3 text-dark fw-medium font-sans">
                          <FiCheckCircle className="text-primary-custom" size={20} /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default QualitySection;
