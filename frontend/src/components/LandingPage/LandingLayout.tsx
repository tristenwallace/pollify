import React from 'react';
import Header from './Header';
import Footer from '../Footer';
import Canvas from '../Wave/Canvas';

interface LayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Canvas />
      <Footer />
    </div>
  );
};

export default LandingLayout;
