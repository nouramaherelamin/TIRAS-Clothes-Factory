import React from 'react';

const Marquee = () => {
  const categories = [
    { text:"SUSTAINABLE", outlined: false },
    { text:"ENGINEERING", outlined: true },
    { text:"PRECISION", outlined: false },
    { text:"MANUFACTURING", outlined: true },
    { text:"PREMIUM", outlined: false },
    { text:"GARMENTS", outlined: true },
    { text:"INNOVATION", outlined: false }
  ];

  return (
    <div className="marquee-container border border-dark">
      <div className="marquee-content">
        {/* Repeat three times for seamless loop */}
        {[1, 2, 3].map(group => (
          <React.Fragment key={group}>
            {categories.map((cat, idx) => (
              <span 
                key={`cat-${group}-${idx}`} 
                className={`marquee-item ${cat.outlined ? 'marquee-item-outlined' : ''}`}
              >
                {cat.text} <span style={{ marginLeft: '4rem', fontSize: '1rem', color: 'var(--color-bg)' }}>✦</span>
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
