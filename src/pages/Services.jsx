import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { getServices } from '../data/dataStore';
import { getIcon } from '../data/iconMap';
import p4 from '../assets/images/P4.jpg';
import p9 from '../assets/images/P9.jpg';
import p11 from '../assets/images/P11.jpg';
import p12 from '../assets/images/P12.jpg';
import p13 from '../assets/images/P14.webp';
import p20 from '../assets/images/P20.webp';

const serviceImages = [p4, p9, p11, p12, p13, p20];

const Services = () => {
  const services = getServices();
  const [activeService, setActiveService] = useState(services[0]?.id);

  return (
    <main style={{ paddingTop: '80px', backgroundColor: '#FAF9F6' }}>
      <section style={{ backgroundColor: '#FAF9F6', padding: '6rem 0 5rem', position: 'relative', overflow: 'hidden' }}>
        <div className="container position-relative z-2">
          <div className="row">
            <div className="col-lg-8 reveal-up">
              <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                <span className="me-2" style={{ width: '12px', height: '12px', border: '1px solid var(--color-primary)', borderRadius: '50%', display: 'inline-block' }}></span>
                What We Offer
              </span>
              <h1 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1' }}>
                END-TO-END
              </h1>
              <h1 className="editorial-italic mb-4" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
                Manufacturing
              </h1>
              <p className="font-sans" style={{ color: '#555', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '540px' }}>
                Comprehensive textile and garment services tailored to meet the specific demands of modern international brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '7rem 0', backgroundColor: '#FFFFFF' }}>
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-4">
              <div style={{ position: 'sticky', top: '120px' }} className="reveal-up">
                <p className="font-sans fw-bold" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
                  Our Services
                </p>
                {services.map((svc, i) => {
                  const Icon = getIcon(svc.iconKey);
                  const isActive = activeService === svc.id;
                  return (
                    <button
                      key={svc.id}
                      onClick={() => setActiveService(svc.id)}
                      className="d-flex align-items-center transition-all w-100 text-start border-0 bg-transparent"
                      style={{
                        padding: '1.2rem 1.5rem',
                        borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                        backgroundColor: isActive ? 'rgba(211, 47, 47, 0.05)' : 'transparent',
                        color: isActive ? 'var(--color-primary)' : '#444',
                        cursor: 'pointer',
                        marginBottom: '0.5rem',
                        fontFamily: 'var(--font-sans)',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '1rem',
                      }}
                    >
                      <Icon size={20} style={{ opacity: isActive ? 1 : 0.5, flexShrink: 0, marginRight: '1rem' }} />
                      {svc.title}
                      {isActive && <FiArrowRight size={18} style={{ marginLeft: 'auto' }} />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="col-lg-8 ps-lg-5">
              {services.map((svc, i) => {
                if (svc.id !== activeService) return null;
                const Icon = getIcon(svc.iconKey);
                const img = serviceImages[i % serviceImages.length];
                return (
                  <div key={svc.id} className="reveal-up" style={{ animation: 'revealUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}>
                    <div className="shadow-sm group-hover-zoom" style={{ overflow: 'hidden', borderRadius: '8px', marginBottom: '2.5rem', height: '420px', position: 'relative' }}>
                      <img src={img} alt={svc.title} className="img-cover transition-all" style={{ transitionDuration: '1s' }} />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem', background: 'linear-gradient(to top, rgba(26,3,3,0.8) 0%, transparent 100%)' }}>
                        <div style={{ width: '48px', height: '48px', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                          <Icon size={22} color="#fff" />
                        </div>
                      </div>
                    </div>
                    <span className="d-inline-flex align-items-center mb-3" style={{ color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Service 0{i + 1}
                    </span>
                    <h2 className="mb-4 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1' }}>
                      {svc.title}
                    </h2>
                    <p className="font-sans" style={{ color: '#555', lineHeight: '1.9', fontSize: '1.05rem', marginBottom: '2rem' }}>
                      {svc.description}
                    </p>
                    <p className="font-sans" style={{ color: '#666', lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '1rem' }}>
                      Our team works closely with each client to develop tailored solutions that align with brand standards, timelines, and quality targets. Leveraging modern machinery and skilled artisans, we deliver outcomes that exceed expectations across every production run.
                    </p>
                    <Link to="/contact" className="d-inline-flex align-items-center text-dark text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 border-bottom border-dark pb-1 hover-arrow" style={{ fontSize: '0.85rem' }}>
                      Inquire About This Service <FiArrowRight className="ms-2" />
                    </Link>
                  </div>
                );
              })}
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
                All Services
              </span>
              <h2 className="mb-0 font-sans text-dark" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: '1' }}>
                COMPLETE PRODUCTION
              </h2>
              <h2 className="editorial-italic mb-0" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: '1', color: 'var(--color-primary)' }}>
                Capabilities
              </h2>
            </div>
          </div>
          <div className="row gy-4">
            {services.map((svc, i) => {
              const Icon = getIcon(svc.iconKey);
              return (
                <div className="col-lg-4 col-md-6 reveal-up" key={svc.id} style={{ animationDelay: `${i * 100}ms` }}>
                  <div
                    className="service-card shadow-sm hover-scale transition-all"
                    style={{
                      backgroundColor: '#fff',
                      padding: '2.5rem 2rem',
                      height: '100%',
                      cursor: 'pointer',
                      borderRadius: '8px',
                      borderTop: '4px solid var(--color-primary)'
                    }}
                    onClick={() => setActiveService(svc.id)}
                  >
                    <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(211, 47, 47, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', borderRadius: '50%' }} className="service-card-icon transition-all">
                      <Icon size={24} color="var(--color-primary)" />
                    </div>
                    <h4 className="font-sans fw-bold text-dark mb-3" style={{ fontSize: '1.15rem' }}>
                      {svc.title}
                    </h4>
                    <p className="font-sans" style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.7', margin: '0 0 1.5rem' }}>
                      {svc.description}
                    </p>
                    <span className="font-sans fw-bold text-uppercase d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', letterSpacing: '0.08em', color: 'var(--color-primary)' }}>
                      Learn More <FiArrowRight size={14} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: '#2B0A0F', padding: '6rem 0', textAlign: 'center' }}>
        <div className="container reveal-up">
          <h2 className="mb-0 font-sans text-white" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: '1' }}>
            NEED A CUSTOM PRODUCTION SOLUTION?
          </h2>
          <p className="font-sans mt-4" style={{ color: 'rgba(255,255,255,0.75)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Our team is ready to develop a tailored manufacturing plan for your brand.
          </p>
          <Link
            to="/contact"
            className="d-inline-flex align-items-center text-white text-decoration-none font-sans fw-bold text-uppercase letter-spacing-1 px-5 py-3 transition-all hover-scale"
            style={{ backgroundColor: 'var(--color-primary)', borderRadius: '4px', fontSize: '0.9rem' }}
          >
            Request a Quote <FiArrowRight className="ms-2" size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Services;
