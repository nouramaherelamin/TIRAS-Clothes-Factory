import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';
import P2 from '../../assets/images/P2.jpg';

const FeaturedProduct = () => {
  return (
    <section id="featured-work" className="section-padding bg-white overflow-hidden">
      <Container>
        <Row className="align-items-center g-5">
          {/* Left Text / Specs */}
          <Col lg={4} className="order-2 order-lg-1 reveal-up">
            <div className="pe-lg-4">
              <span className="z7-eyebrow d-block mb-3">Featured Innovation</span>
              <h2 className="z7-hero-title fs-1 mb-4 lh-sm">
                Advanced <br />
                <em>Outerwear</em>
              </h2>
              
              <div className="mb-5">
                <p className="text-muted mb-4 font-sans lh-base">
                  Engineered for extreme conditions, our signature outerwear combines technical fabrics with ergonomic pattern making to deliver uncompromising performance.
                </p>
                
                {/* Specification Style Info */}
                <ul className="list-unstyled mb-0 font-sans">
                  <li className="d-flex justify-content-between border-bottom py-3">
                    <span className="text-muted fw-medium text-uppercase small letter-spacing-1">Material</span>
                    <span className="text-dark fw-bold">3-Layer Tech Shell</span>
                  </li>
                  <li className="d-flex justify-content-between border-bottom py-3">
                    <span className="text-muted fw-medium text-uppercase small letter-spacing-1">Treatment</span>
                    <span className="text-dark fw-bold">DWR Finish</span>
                  </li>
                  <li className="d-flex justify-content-between border-bottom py-3">
                    <span className="text-muted fw-medium text-uppercase small letter-spacing-1">Origin</span>
                    <span className="text-dark fw-bold">Custom Woven</span>
                  </li>
                </ul>
              </div>

              <Link to="/product/4" className="btn-outline-editorial hover-arrow w-100 justify-content-center">
                View Specifications <FiArrowRight />
              </Link>
            </div>
          </Col>

          {/* Right Large Image */}
          <Col lg={8} className="order-1 order-lg-2 reveal-clip delay-200">
            <div className="position-relative h-100 w-100 overflow-hidden group-hover-zoom" style={{ minHeight: '600px', backgroundColor: 'var(--color-accent1)' }}>
              <img src={P2} alt="Featured Outerwear" className="img-cover position-absolute top-0 start-0 w-100 h-100 transition-all" style={{ transitionDuration: '1s' }} />
              
              <div className="position-absolute bottom-0 start-0 p-4 p-md-5 bg-white m-0 m-md-4 border border-dark" style={{ maxWidth: '300px' }}>
                <span className="text-primary-custom fw-bold d-block mb-2 font-serif fs-5">01.</span>
                <p className="text-muted small mb-0 font-sans">Focusing on high-performance technical garments for modern environments.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedProduct;
