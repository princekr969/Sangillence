import React, { useEffect } from 'react';
import { CareersHeader, CareersHero, CareersRequirements, CareersRoles, CareersExpectations, CareersApply, CareersSocialGood } from '../components';

function CareersPage() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-900 cursor-default">
      <CareersHeader />
      <CareersHero />
      <CareersSocialGood />
      <CareersRequirements />
      <CareersRoles />
      <CareersExpectations />
      <CareersApply />
    </div>
  );
}

export default CareersPage;
