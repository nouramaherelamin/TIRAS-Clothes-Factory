import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import P31 from '../../assets/images/P31.jpg';

const focus = [
  ['01', 'Precision', 'Careful development decisions from the first material choice onward.'],
  ['02', 'Consistency', 'A considered workflow keeps a collection aligned with its brief.'],
  ['03', 'Quality control', 'Inspection and finishing are part of the production conversation.'],
  ['04', 'Custom production', 'A collaborative process shaped around the needs of each project.'],
];

const Testimonials = () => (
  <section className="section-padding bg-white">
    <Container>
      <Row className="align-items-center g-5">
        <Col lg={5} className="reveal-clip">
          <div className="position-relative overflow-hidden group-hover-zoom border border-dark" style={{ height: '600px', borderRadius: '0' }}>
            <img src={P31} alt="Z7 production detail" className="img-cover transition-all" style={{ transitionDuration: '1s' }} />
          </div>
        </Col>
        <Col lg={7} className="ps-lg-5 reveal-up delay-200">
          <span className="z7-eyebrow d-block mb-3">Our production focus</span>
          <h2 className="display-5 font-serif fw-bold mb-5">Quality is built into <em>the process.</em></h2>
          <div className="row g-4">
            {focus.map(([number, title, description]) => (
              <div className="col-sm-6" key={number}>
                <div className="border-top border-dark pt-3 h-100">
                  <span className="text-primary-custom font-serif fs-4">{number}</span>
                  <h3 className="h5 fw-bold mt-2">{title}</h3>
                  <p className="text-muted small mb-0" style={{ lineHeight: 1.7 }}>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

export default Testimonials;
