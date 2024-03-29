import React from 'react';

const Footer = () => {
  return (
    <div className="flex items-center flex-none justify-center w-full h-16 md:h-24 bg-beige bg-texture bg-blend-multiply text-sm sm:text-md text-brown">
      <div className="flex items-center w-full h-full justify-center gap-20 mx-auto max-w-7xl px-4">
        {' '}
        &copy; {new Date().getFullYear()} Lee Woo Jin. All Rights Reserved.
      </div>{' '}
    </div>
  );
};

export default Footer;
