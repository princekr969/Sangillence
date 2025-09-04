import React from 'react';
import Header from './Header';
import Quiz from './Quiz';

function MainContainer() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header activeTab="Quiz" />
      <Quiz />
    </div>
  );
}

export default MainContainer;