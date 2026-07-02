import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const logoSize = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16'
  }[size];

  return (
    <img
      id="bayaro-logo"
      src="/assets/bayaro-logo-transparent.png"
      alt="Bayaro Logo"
      className={logoSize}
    />
  );
}
