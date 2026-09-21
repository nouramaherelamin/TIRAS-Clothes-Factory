import React from 'react';
import { Link } from 'react-router-dom';
import p4Detail from '../../assets/images/P4.webp';
import labelOne from '../../assets/images/L1.png';
import labelTwo from '../../assets/images/L2.png';
import labelThree from '../../assets/images/L3.png';

const principles = [
  [labelOne, 'Material direction', 'Start each collection with the right weight, hand-feel, and finish.'],
  [labelTwo, 'Technical making', 'Production choices are considered alongside silhouette and use.'],
  [labelThree, 'Final inspection', 'Details are checked before a collection moves forward.'],
];

const MaterialStudio = () => (
  <section className="section-padding" style={{ backgroundColor: '#f2ece8' }}>
    <div className="container">
      <div className="row align-items-center g-5">
        <div className="col-lg-5">
          <span className="z7-eyebrow">The Z7 approach</span>
          <h2 className="display-4 mb-4">Built around <em>material.</em></h2>
          <p className="text-muted mb-4" style={{ lineHeight: 1.8 }}>We balance factory discipline with a fashion-led point of view, so each collection can be developed with clarity from first sample to final finish.</p>
          <Link to="/services" className="btn-editorial text-decoration-none">Explore services</Link>
        </div>
        <div className="col-lg-4">
          <div className="group-hover-zoom overflow-hidden border border-dark" style={{ height: '440px' }}>
            <img src={p4Detail} alt="Z7 material and garment detail" className="img-cover" />
          </div>
        </div>
        <div className="col-lg-3">
          <div className="d-flex flex-column gap-4">
            {principles.map(([icon, title, text]) => (
              <div key={title} className="d-flex gap-3 align-items-start">
                <img src={icon} alt="" width="48" height="48" />
                <div><h3 className="h6 mb-1">{title}</h3><p className="small text-muted mb-0" style={{ lineHeight: 1.6 }}>{text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default MaterialStudio;
