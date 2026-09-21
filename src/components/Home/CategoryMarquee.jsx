import React from 'react';
import { FiStar } from 'react-icons/fi';

const CategoryMarquee = () => {
  const categories = ["PREMIUM HEMP", "SILK CHARMEUSE", "ORGANIC COTTON", "BRAZILIAN LINEN", "MERINO WOOL", "BELGIAN LINEN"];

  return (
    <div className="overflow-hidden" style={{ backgroundColor: 'var(--color-primary)', padding: '1rem 0' }}>
      <div className="d-flex align-items-center" style={{ width: '200%', animation: 'scroll 20s linear infinite' }}>
        {[1, 2, 3, 4].map(group => (
          <div key={group} className="d-flex align-items-center flex-nowrap w-100 justify-content-around">
            {categories.map((cat, idx) => (
              <React.Fragment key={`cat-${group}-${idx}`}>
                <div className="d-flex align-items-center flex-nowrap mx-4">
                  <span className="font-sans fw-bold text-white text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                    {cat}
                  </span>
                </div>
                <FiStar size={10} className="text-white opacity-50 mx-2" style={{ fill: 'currentColor' }} />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default CategoryMarquee;
