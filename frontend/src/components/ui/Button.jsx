import React from 'react';
import { cn } from '../../utils/helpers.js';

function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  className, 
  disabled,
  ...props 
}) {
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700',
    secondary: 'bg-white text-primary-600 border-2 border-primary-600 hover:bg-primary-50',
    danger: 'bg-red-500 text-white hover:bg-red-600',
  };

  return React.createElement(
    'button',
    {
      className: cn(
        'px-4 py-2 rounded-lg transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        className
      ),
      disabled: disabled || isLoading,
      ...props
    },
    isLoading
      ? React.createElement(
          'div',
          { className: 'flex items-center gap-2' },
          React.createElement('div', {
            className: 'w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'
          }),
          'Loading...'
        )
      : children
  );
}

export default Button;
