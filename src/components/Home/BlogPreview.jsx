import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';
import P32 from '../../assets/images/P32.jpg';
import P33 from '../../assets/images/P33.jpg';
import P34 from '../../assets/images/P34.jpg';

const BlogPreview = () => {
  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: '#FAF9F6' }}>
      <Container>
        <div className="d-flex justify-content-between align-items-end mb-5 pb-4 reveal-up">
          <div>
            <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              Industry Insights
            </span>
            <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
              SMART FABRIC
            </h2>
            <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
              Stories
            </h2>
          </div>
          <Link to="/blog" className="d-none d-md-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 border-bottom border-dark pb-1 hover-arrow" style={{ fontSize: '0.8rem' }}>
            All Articles <FiArrowRight className="ms-2" />
          </Link>
        </div>

        <Row className="g-5">
          <Col lg={7} className="reveal-clip delay-100">
            <div className="position-relative h-100 group-hover-zoom cursor-pointer">
              <div className="overflow-hidden shadow-sm" style={{ height: '550px', borderRadius: '8px' }}>
                <img src={P32} alt="Sustainable Manufacturing" className="img-cover transition-all" style={{ transitionDuration: '0.8s' }} />
              </div>
              <div className="pt-4">
                <div className="d-flex gap-3 mb-3 text-muted small fw-bold font-sans text-uppercase letter-spacing-1" style={{ fontSize: '0.7rem' }}>
                  <span>Oct 15, 2026</span>
                  <span>•</span>
                  <span style={{ color: 'var(--color-primary)' }}>Sustainability</span>
                </div>
                <h3 className="font-sans fw-bold text-dark mb-3" style={{ fontSize: '2rem' }}>The Future of Sustainable Textile Manufacturing</h3>
                <p className="text-muted mb-4 pe-md-5 font-sans" style={{ fontSize: '1rem', lineHeight: '1.6' }}>
                  Exploring new eco-friendly materials and advanced production techniques that are reshaping the modern garment industry from the ground up.
                </p>
                <Link to="/blog/1" className="text-dark text-decoration-none fw-bold text-uppercase letter-spacing-1 d-inline-flex align-items-center gap-2 hover-arrow pb-1 border-bottom border-dark" style={{ fontSize: '0.8rem' }}>
                  Read Article <FiArrowRight />
                </Link>
              </div>
            </div>
          </Col>

          <Col lg={5}>
            <div className="d-flex flex-column h-100 justify-content-between">
              
              <div className="d-flex flex-column flex-sm-row gap-4 mb-5 mb-lg-0 group-hover-zoom cursor-pointer reveal-clip delay-200">
                <div className="overflow-hidden shadow-sm" style={{ width: '100%', sm: {width: '45%'}, height: '220px', flexShrink: 0, borderRadius: '8px' }}>
                  <img src={P33} alt="Quality Control" className="img-cover transition-all" style={{ transitionDuration: '0.8s' }} />
                </div>
                <div className="d-flex flex-column justify-content-center pt-2">
                  <span className="text-muted text-uppercase fw-bold letter-spacing-1 mb-2 font-sans" style={{ fontSize: '0.65rem' }}>Sep 28, 2026</span>
                  <h4 className="font-sans fw-bold text-dark mb-3" style={{ fontSize: '1.25rem' }}>Quality Control: Ensuring Perfection</h4>
                  <Link to="/blog/2" className="text-decoration-none fw-bold text-uppercase letter-spacing-1 d-inline-flex align-items-center gap-2 hover-arrow mt-auto" style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>
                    Read Article <FiArrowRight />
                  </Link>
                </div>
              </div>

              <div className="d-flex flex-column flex-sm-row gap-4 group-hover-zoom cursor-pointer reveal-clip delay-300 mt-4 mt-lg-0">
                <div className="overflow-hidden shadow-sm" style={{ width: '100%', sm: {width: '45%'}, height: '220px', flexShrink: 0, borderRadius: '8px' }}>
                  <img src={P34} alt="Streetwear Trends" className="img-cover transition-all" style={{ transitionDuration: '0.8s' }} />
                </div>
                <div className="d-flex flex-column justify-content-center pt-2">
                  <span className="text-muted text-uppercase fw-bold letter-spacing-1 mb-2 font-sans" style={{ fontSize: '0.65rem' }}>Sep 12, 2026</span>
                  <h4 className="font-sans fw-bold text-dark mb-3" style={{ fontSize: '1.25rem' }}>Trends in Modern Streetwear Production</h4>
                  <Link to="/blog/3" className="text-decoration-none fw-bold text-uppercase letter-spacing-1 d-inline-flex align-items-center gap-2 hover-arrow mt-auto" style={{ fontSize: '0.75rem', color: 'var(--color-primary)' }}>
                    Read Article <FiArrowRight />
                  </Link>
                </div>
              </div>

            </div>
          </Col>
        </Row>

        <div className="text-center mt-5 d-md-none reveal-up">
          <Link to="/blog" className="d-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 border-bottom border-dark pb-1 hover-arrow" style={{ fontSize: '0.8rem' }}>
            All Articles <FiArrowRight className="ms-2" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default BlogPreview;
