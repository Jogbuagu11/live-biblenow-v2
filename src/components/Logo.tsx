
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  // Return an empty div - no text displayed
  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {/* Text removed */}
    </div>
  );
};

export default Logo;
