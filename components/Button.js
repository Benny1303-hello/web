import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const variants = {
  primary:
    'bg-gradient-to-r from-brand-500 to-cyan-400 text-navy-950 shadow-glow hover:shadow-none',
  outline:
    'border border-white/30 text-white hover:bg-white/10',
  dark:
    'bg-navy-900 text-white hover:bg-navy-800',
  amber:
    'bg-gradient-to-r from-amber-500 to-amber-400 text-navy-950 shadow-[0_14px_30px_rgba(245,165,36,0.35)] hover:shadow-none',
};

export default function Button({
  href,
  children,
  variant = 'primary',
  withArrow = true,
  className = '',
  ...props
}) {
  const classes = `group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95 ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {withArrow && (
        <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
