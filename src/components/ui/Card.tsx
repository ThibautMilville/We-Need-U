import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  variant?: 'default' | 'elevated' | 'bordered';
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  className,
  children
}) => {
  const baseClasses = 'bg-white rounded-lg overflow-hidden';
  
  const variantClasses = {
    default: 'shadow-sm',
    elevated: 'shadow-lg',
    bordered: 'border border-gray-200'
  };

  return (
    <div className={clsx(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  className?: string;
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ className, children }) => (
  <div className={clsx('px-6 py-4 border-b border-gray-200', className)}>
    {children}
  </div>
);

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ className, children }) => (
  <div className={clsx('px-6 py-4', className)}>
    {children}
  </div>
);

interface CardFooterProps {
  className?: string;
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ className, children }) => (
  <div className={clsx('px-6 py-4 border-t border-gray-200 bg-gray-50', className)}>
    {children}
  </div>
);

export default Card;