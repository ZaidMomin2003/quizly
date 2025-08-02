import { cn } from '@/lib/utils';

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  [key: string]: any;
}

export function Marquee({
  className,
  reverse,
  pauseOnHover,
  children,
  vertical = false,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn('group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]', {
        'flex-row': !vertical,
        'flex-col': vertical,
      })}
    >
      <div
        className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
          'group-hover:[animation-play-state:paused]': pauseOnHover,
          'animate-marquee-horizontal flex-row': !vertical,
          'animate-marquee-vertical flex-col': vertical,
          'direction-reverse': reverse,
        })}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn('flex shrink-0 justify-around [gap:var(--gap)]', {
          'group-hover:[animation-play-state:paused]': pauseOnHover,
          'animate-marquee-horizontal flex-row': !vertical,
          'animate-marquee-vertical flex-col': vertical,
          'direction-reverse': reverse,
        })}
      >
        {children}
      </div>
    </div>
  );
}
