import PropTypes from 'prop-types';

const Button = ({ 
    children, 
    onClick, 
    variant = 'primary', 
    color = 'blue', 
    className = '', 
    disabled = false,
    type = 'button',
    isLoading, // Destructure isLoading so it doesn't go to DOM
    ...props 
}) => {
    const baseClasses = 'rounded-lg font-medium transition-colors flex items-center justify-center';
    
    const variantClasses = {
        primary: `bg-${color}-600 hover:bg-${color}-700 text-white`,
        outline: `border border-${color}-300 hover:bg-${color}-50 text-${color}-700`,
        icon: `p-2 hover:bg-${color}-50 text-${color}-600 rounded-full`,
        text: `text-${color}-600 hover:text-${color}-800`
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${baseClasses} ${variantClasses[variant]} ${className} ${disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            {...props}
        >
            {isLoading ? (
                <span className="loader mr-2"></span>
            ) : null}
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'outline', 'icon', 'text']),
    color: PropTypes.oneOf(['blue', 'red', 'green', 'gray']),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    isLoading: PropTypes.bool,
};

export default Button;