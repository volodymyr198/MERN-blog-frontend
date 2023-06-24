import React from 'react'

export const Button = ({ onClick, className, children, disabled }) => {
    return (
        <button
            onClick={onClick}
            className={`flex justify-center items-center ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};