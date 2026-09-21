import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaCheckCircle, FaLeaf, FaCogs, FaGlobeAsia } from 'react-icons/fa';
import p4 from '../assets/images/P4.jpg';
import p5 from '../assets/images/P5.jpg';
import p6 from '../assets/images/P6.jpg';
import p7 from '../assets/images/P7.jpg';
import p8 from '../assets/images/P8.jpg';
import p10 from '../assets/images/P10.jpg';
import p12 from '../assets/images/P12.jpg';
import p17 from '../assets/images/P17.webp';
import p18 from '../assets/images/P18.webp';

const capabilities = [
  { icon: FaCogs, title: 'Advanced Manufacturing', desc: 'State-of-the-art production lines with precision automation for consistent, high-volume output.' },
  { icon: FaLeaf, title: 'Sustainable Sourcing', desc: 'Committed to responsible raw material sourcing, reducing environmental impact across every process.' },
  { icon: FaCheckCircle, title: 'Quality Control', desc: 'Multi-stage inspection protocols ensuring every unit meets international export standards.' },
  { icon: FaGlobeAsia, title: 'Global Reach', desc: 'Serving brands across multiple continents with reliable on-time delivery and logistics.' },
];

const qualities = [
  'Material to final product traceability',
  'ISO-compliant production workflows',
  'Zero-defect consistency targets',
  'Certified eco-friendly dyeing processes',
  'Rigorous tension and durability testing',
  'Real-time production monitoring',
];

const About = () => {
  return (
    <main style={{ paddingTop: '80px', backgroundColor: '#FAF9F6' }}>
      <section style={{ backgroundColor: '#FAF9F6', minHeight: '60vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', padding: '6rem 0' }}>
        <div className="container position-relative z-2">
          <div className="row">
            <div className="col-lg-8 reveal-up">
              <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                About Z7 Factory
              </span>
              <h1 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1' }}>
                CRAFTING TEXTILES
              </h1>
              <h1 className="editorial-italic mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
                With Purpose
              </h1>
              <p className="font-sans" style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '600px' }}>
                We are a vertically integrated textile and garment manufacturing facility dedicated to precision craftsmanship, innovative production, and sustainable practices.
              </p>
            </div>
            
            <div className="col-lg-4 position-relative d-none d-lg-block reveal-clip delay-200 group-hover-zoom">
              <div className="position-absolute top-50 start-50 translate-middle shadow-sm" style={{ width: '300px', height: '400px', borderRadius: '8px', overflow: 'hidden', zIndex: 1, transform: 'translate(-50%, -50%) rotate(5deg)' }}>
                 <img src={p17} alt="Textile detail" className="img-cover transition-all" style={{ transitionDuration: '1s' }} />
              </div>
              <div className="position-absolute top-50 start-50 translate-middle shadow-sm" style={{ width: '300px', height: '400px', borderRadius: '8px', overflow: 'hidden', zIndex: 0, transform: 'translate(-70%, -40%) rotate(-5deg)' }}>
                 <img src={p18} alt="Factory detail" className="img-cover transition-all" style={{ transitionDuration: '1s' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6 reveal-clip">
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ gridRow: '1 / 4', overflow: 'hidden', borderRadius: '8px' }} className="shadow-sm group-hover-zoom">
                    <img src={p12} alt="Manufacturing" className="img-cover transition-all" style={{ transitionDuration: '1s' }} />
                  </div>
                  <div style={{ overflow: 'hidden', borderRadius: '8px' }} className="shadow-sm group-hover-zoom">
                    <img src={p5} alt="Fabric detail" className="img-cover transition-all" style={{ transitionDuration: '1s', height: '190px' }} />
                  </div>
                  <div style={{ overflow: 'hidden', borderRadius: '8px' }} className="shadow-sm group-hover-zoom">
                    <img src={p10} alt="Production line" className="img-cover transition-all" style={{ transitionDuration: '1s', height: '190px' }} />
                  </div>
                  <div style={{ overflow: 'hidden', borderRadius: '8px' }} className="shadow-sm group-hover-zoom">
                    <img src={p6} alt="Quality check" className="img-cover transition-all" style={{ transitionDuration: '1s', height: '190px' }} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 ps-lg-5 reveal-up delay-100">
              <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                Our Story
              </span>
              <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: '1' }}>
                BUILT ON A FOUNDATION OF
              </h2>
              <h2 className="editorial-italic mb-4" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
                Craftsmanship
              </h2>
              <p className="font-sans" style={{ color: '#555', lineHeight: '1.9', marginBottom: '1.2rem', fontSize: '1rem' }}>
                Z7 Factory was established with a singular vision: to elevate textile and garment manufacturing through the seamless combination of skilled craftsmanship and modern technology. Our facility is designed for high-volume, precision production across a full spectrum of apparel categories.
              </p>
              <p className="font-sans" style={{ color: '#555', lineHeight: '1.9', marginBottom: '2rem', fontSize: '1rem' }}>
                From raw fabric production and garment construction to leather accessories and formal wear, every product leaving our factory reflects our commitment to quality, detail, and performance at scale.
              </p>
              <Link to="/contact" className="d-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 border-bottom border-dark pb-1 hover-arrow" style={{ fontSize: '0.8rem' }}>
                Work With Us <FiArrowRight className="ms-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 0', backgroundColor: '#FAF9F6' }}>
        <div className="container">
          <div className="row mb-5 text-center reveal-up">
            <div className="col-lg-8 mx-auto">
              <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                Core Capabilities
              </span>
              <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: '1' }}>
                WHAT DRIVES OUR
              </h2>
              <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
                Excellence
              </h2>
            </div>
          </div>
          <div className="row gy-4">
            {capabilities.map(({ icon: Icon, title, desc }, i) => (
              <div className="col-lg-3 col-md-6 reveal-up" key={i} style={{ animationDelay: `${i * 100}ms` }}>
                <div
                  className="about-cap-card shadow-sm hover-scale transition-all"
                  style={{
                    backgroundColor: '#fff',
                    padding: '2.5rem 2rem',
                    height: '100%',
                    borderTop: '4px solid var(--color-primary)',
                    borderRadius: '8px'
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: 'rgba(211, 47, 47, 0.1)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.2rem',
                    }}
                  >
                    <Icon size={22} color="var(--color-primary)" />
                  </div>
                  <h4 className="font-sans fw-bold text-dark mb-3" style={{ fontSize: '1.1rem' }}>
                    {title}
                  </h4>
                  <p className="font-sans" style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="row align-items-center gy-5">
            <div className="col-lg-6 pe-lg-5 reveal-up">
              <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                Manufacturing Excellence
              </span>
              <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: '1' }}>
                PRECISION FROM THREAD
              </h2>
              <h2 className="editorial-italic mb-4" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
                To Finished Product
              </h2>
              <p className="font-sans" style={{ color: '#555', lineHeight: '1.9', marginBottom: '2rem', fontSize: '1rem' }}>
                Our integrated facility manages every phase of production in-house — from fabric weaving and dyeing to cutting, sewing, finishing, and quality inspection. This end-to-end control means faster lead times and uncompromising consistency.
              </p>
              <ul className="list-unstyled mb-0">
                {qualities.map((q, i) => (
                  <li key={i} className="d-flex align-items-center gap-3 mb-3 font-sans fw-bold" style={{ color: '#333', fontSize: '0.9rem' }}>
                    <FaCheckCircle size={16} color="var(--color-primary)" style={{ flexShrink: 0 }} />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6 reveal-clip delay-200">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ overflow: 'hidden', borderRadius: '8px', gridRow: '1 / 3' }} className="shadow-sm group-hover-zoom">
                  <img src={p7} alt="Manufacturing Process" className="img-cover transition-all" style={{ transitionDuration: '1s' }} />
                </div>
                <div style={{ overflow: 'hidden', borderRadius: '8px' }} className="shadow-sm group-hover-zoom">
                  <img src={p8} alt="Quality Testing" className="img-cover transition-all" style={{ transitionDuration: '1s', height: '250px' }} />
                </div>
                <div style={{ overflow: 'hidden', borderRadius: '8px' }} className="shadow-sm group-hover-zoom">
                  <img src={p4} alt="Factory Floor" className="img-cover transition-all" style={{ transitionDuration: '1s', height: '250px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#2B0A0F', padding: '7rem 0', textAlign: 'center' }}>
        <div className="container reveal-up">
          <h2 className="mb-0 font-sans text-white" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1' }}>
            READY TO START PRODUCTION?
          </h2>
          <h2 className="editorial-italic mb-4" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
            Let's Talk.
          </h2>
          <p className="font-sans mx-auto" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', marginBottom: '2.5rem', maxWidth: '600px', lineHeight: '1.6' }}>
            Connect with our team to discuss your manufacturing requirements and discover what we can build together.
          </p>
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <Link to="/contact" className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3 transition-all hover-scale" style={{ backgroundColor: 'var(--color-primary)', borderRadius: '4px', fontSize: '0.9rem' }}>
              Get In Touch <FiArrowRight className="ms-2" />
            </Link>
            <Link to="/services" className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3 transition-all hover-scale" style={{ backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '4px', fontSize: '0.9rem' }}>
              View Services <FiArrowRight className="ms-2" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
