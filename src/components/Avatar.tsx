
import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({ 
  src = '/placeholder.svg', 
  alt = 'User avatar',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`rounded-full overflow-hidden ${sizeClasses[size]} ${className}`}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Avatar;
