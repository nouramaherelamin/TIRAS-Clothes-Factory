import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';
import P30 from '../../assets/images/P30.webp';
import P31 from '../../assets/images/P31.jpg';
import P32 from '../../assets/images/P32.jpg';

const FeaturedProducts = () => {
  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: '#FAF9F6' }}>
      <Container>
        <div className="d-flex justify-content-between align-items-end mb-5 reveal-up">
          <div>
            <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              Our Expertise
            </span>
            <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
              SIGNATURE
            </h2>
            <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
              Garments
            </h2>
          </div>
          <Link to="/shop" className="d-none d-md-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 border-bottom border-dark pb-1 hover-arrow" style={{ fontSize: '0.8rem' }}>
            View Collection <FiArrowRight className="ms-2" />
          </Link>
        </div>

        <Row className="g-5 align-items-center">
          <Col lg={7}>
            <div className="position-relative reveal-clip group-hover-zoom shadow-sm" style={{ height: '750px', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={P30} alt="Signature jacket" className="img-cover" />
              <div className="position-absolute bottom-0 start-0 w-100 p-5 d-flex justify-content-between align-items-end" style={{ background: 'linear-gradient(to top, rgba(26,3,3,0.8), transparent)' }}>
                <div>
                  <span className="badge bg-white text-dark px-3 py-2 mb-3 text-uppercase letter-spacing-1 font-sans">Outerwear</span>
                  <h3 className="text-white font-sans fw-bold mb-0" style={{ fontSize: '2.5rem' }}>Premium Trench</h3>
                </div>
                <Link to="/product/4" aria-label="View premium trench" className="bg-primary-custom text-white p-3 d-flex align-items-center justify-content-center transition-all hover-scale" style={{ width: '60px', height: '60px', borderRadius: '50%' }}>
                  <FiArrowRight size={24} />
                </Link>
              </div>
            </div>
          </Col>

          <Col lg={5}>
            <div className="d-flex flex-column gap-5">
              <div className="position-relative reveal-clip delay-200 group-hover-zoom shadow-sm ms-lg-5" style={{ height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={P31} alt="Denim wear" className="img-cover" />
                <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(to top, rgba(26,3,3,0.7), transparent)' }}>
                  <span className="badge bg-white text-dark px-2 py-1 mb-2 text-uppercase font-sans" style={{ fontSize: '0.7rem' }}>Denim</span>
                  <h4 className="text-white font-sans fw-bold mb-0">Vintage Wash</h4>
                </div>
              </div>

              <div className="position-relative reveal-clip delay-400 group-hover-zoom shadow-sm me-lg-5" style={{ height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
                <img src={P32} alt="Active wear" className="img-cover" />
                <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(to top, rgba(26,3,3,0.7), transparent)' }}>
                  <span className="badge bg-white text-dark px-2 py-1 mb-2 text-uppercase font-sans" style={{ fontSize: '0.7rem' }}>Active</span>
                  <h4 className="text-white font-sans fw-bold mb-0">Performance Line</h4>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        <div className="text-center mt-5 d-md-none reveal-up">
          <Link to="/shop" className="d-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 border-bottom border-dark pb-1 hover-arrow">
            View Collection <FiArrowRight className="ms-2" />
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProducts;
