import React from 'react';

export const Badge = ({ children, className, variant = 'default' }: { children: React.ReactNode, className?: string, variant?: 'default' | 'success' | 'warning' | 'danger' | 'neutral' }) => {
  const variants = {
    default: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800/50',
    success: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/50',
    warning: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/50',
    danger: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200/50 dark:border-red-800/50',
    neutral: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-700/50',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${variants[variant]} ${className || ''}`}>
      {children}
    </span>
  );
};

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger', size?: 'sm' | 'md' | 'lg' | 'icon' }>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      default: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-600 shadow-sm shadow-indigo-600/20 dark:shadow-indigo-900/20",
      primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-600 shadow-sm shadow-indigo-600/20 dark:shadow-indigo-900/20",
      secondary: "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 focus-visible:ring-slate-500",
      outline: "border-2 border-slate-200 dark:border-slate-700 bg-transparent hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus-visible:ring-slate-500",
      ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 focus-visible:ring-slate-500",
      danger: "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 shadow-sm shadow-red-600/20 dark:shadow-red-900/20",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-5 py-2 text-sm",
      lg: "h-12 px-8 text-base",
      icon: "h-11 w-11",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className || ''}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-11 w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-0 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={`text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 dark:text-slate-300 ${className || ''}`}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`flex min-h-[100px] w-full rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-0 focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors disabled:cursor-not-allowed disabled:opacity-50 resize-y ${className || ''}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
