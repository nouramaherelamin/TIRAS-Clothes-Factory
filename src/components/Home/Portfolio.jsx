import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { FiArrowRight } from 'react-icons/fi';
import P35 from '../../assets/images/P35.jpg';
import P36 from '../../assets/images/P36.avif';
import P37 from '../../assets/images/P37.webp';
import P38 from '../../assets/images/P38.webp';
import P39 from '../../assets/images/P39.webp';
import P40 from '../../assets/images/P40.webp';

const portfolioData = [
  { id: 1, image: P35, category:"Denim", title:"Urban Explorer Series", size:"large" },
  { id: 2, image: P36, category:"Activewear", title:"Performance Line", size:"small" },
  { id: 3, image: P37, category:"Outerwear", title:"Winter Essentials", size:"small" },
  { id: 4, image: P38, category:"Formal", title:"Executive Tailoring", size:"medium" },
  { id: 5, image: P39, category:"Denim", title:"Heritage Wash", size:"small" },
  { id: 6, image: P40, category:"Outerwear", title:"Technical Shells", size:"large" }
];

const categories = ["All","Denim","Outerwear","Activewear","Formal"];

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = portfolioData.filter(item => activeFilter ==="All" || item.category === activeFilter);

  return (
    <section className="section-padding overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      <Container>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 pb-3 reveal-up">
          <div>
            <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
              Recent Work
            </span>
            <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
              PRODUCTION
            </h2>
            <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
              Archive
            </h2>
          </div>
          
          <div className="d-flex gap-3 mt-4 mt-md-0 flex-wrap">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`btn border-0 fw-bold font-sans text-uppercase letter-spacing-1 transition-all px-0 pb-1 me-3 ${activeFilter === cat ? 'text-dark border-bottom border-dark border-2' : 'text-muted'}`}
                style={{ backgroundColor: 'transparent', fontSize: '0.8rem' }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <Row className="g-4">
          {filteredItems.map((item, index) => {
            let colProps = { md: 4 };
            let height = '400px';
            
            if (item.size === 'large') {
              colProps = { md: 8 };
              height = '600px';
            } else if (item.size === 'medium') {
              colProps = { md: 6 };
              height = '500px';
            } else {
              colProps = { md: 4 };
              height = '400px';
            }

            return (
              <Col {...colProps} key={item.id} className="reveal-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="position-relative overflow-hidden group-hover-zoom w-100 shadow-sm" style={{ height, borderRadius: '8px' }}>
                  <img src={item.image} alt={item.title} className="img-cover transition-all" style={{ transitionDuration: '0.8s' }} />
                  
                  <div 
                    className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-end p-4 p-md-5 transition-all"
                    style={{ background: 'linear-gradient(to top, rgba(26,3,3,0.9) 0%, rgba(26,3,3,0) 70%)', opacity: 0 }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                  >
                    <div style={{ transform: 'translateY(20px)', transition: '0.4s' }} className="hover-translate-up">
                      <span className="badge bg-white text-dark px-3 py-2 mb-3 text-uppercase letter-spacing-1 font-sans">{item.category}</span>
                      <h4 className="text-white font-sans fw-bold display-6 mb-3">{item.title}</h4>
                      <Link to="/portfolio" className="text-white text-decoration-none fw-bold font-sans text-uppercase letter-spacing-1 d-inline-flex align-items-center gap-2 hover-arrow">
                        View Project <FiArrowRight />
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  );
};

export default Portfolio;
