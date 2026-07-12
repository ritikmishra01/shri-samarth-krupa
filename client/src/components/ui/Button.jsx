import { forwardRef } from 'react'
import { motion } from 'framer-motion'

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

const variantClasses = {
  primary: 'bg-gradient-to-r from-primary-500 to-primary-700 text-white hover:shadow-glow hover:-translate-y-0.5',
  secondary: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700',
  outline: 'border-2 border-primary-500 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20',
  ghost: 'text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  white: 'bg-white text-primary-700 hover:bg-primary-50',
}

const Button = forwardRef(function Button(
  {
    children,
    variant  = 'primary',
    size     = 'md',
    loading  = false,
    disabled = false,
    icon,
    iconRight,
    className = '',
    onClick,
    type = 'button',
    id,
    ...props
  },
  ref
) {
  const base = `
    inline-flex items-center justify-center gap-2
    rounded-full font-semibold
    transition-all duration-300
    focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2
    disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none
  `

  const isDisabled = disabled || loading

  return (
    <motion.button
      ref={ref}
      type={type}
      id={id}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={isDisabled ? {} : { scale: 1.02 }}
      whileTap={isDisabled  ? {} : { scale: 0.97 }}
      className={`${base} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon}
      <span>{children}</span>
      {!loading && iconRight}
    </motion.button>
  )
})

export default Button
