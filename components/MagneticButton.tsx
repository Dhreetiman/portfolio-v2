'use client';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { AnchorHTMLAttributes, ReactNode, useRef } from 'react';

gsap.registerPlugin(useGSAP);

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
    children: ReactNode;
    /** Max pixel offset toward the cursor. */
    strength?: number;
    /** Radius (px) within which the magnet kicks in. */
    radius?: number;
}

const MagneticButton = ({
    children,
    className,
    strength = 12,
    radius = 90,
    ...rest
}: Props) => {
    const anchorRef = useRef<HTMLAnchorElement>(null);

    useGSAP(
        (_, contextSafe) => {
            const el = anchorRef.current;
            if (!el) return;
            if (window.innerWidth < 768) return;

            const handleMove = contextSafe?.((e: MouseEvent) => {
                const rect = el.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = e.clientX - cx;
                const dy = e.clientY - cy;
                const dist = Math.hypot(dx, dy);

                if (dist < radius) {
                    const factor = 1 - dist / radius;
                    gsap.to(el, {
                        x: (dx / radius) * strength * factor,
                        y: (dy / radius) * strength * factor,
                        duration: 0.4,
                        ease: 'power3.out',
                    });
                } else {
                    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
                }
            }) as (e: MouseEvent) => void;

            const handleLeave = () => {
                gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.5)',
                });
            };

            window.addEventListener('mousemove', handleMove);
            el.addEventListener('mouseleave', handleLeave);

            return () => {
                window.removeEventListener('mousemove', handleMove);
                el.removeEventListener('mouseleave', handleLeave);
            };
        },
        { scope: anchorRef },
    );

    return (
        <a
            ref={anchorRef}
            className={cn(
                'group relative inline-flex items-center gap-2 px-6 h-12 font-mono text-sm tracking-wider border border-primary bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors',
                className,
            )}
            {...rest}
        >
            {children}
            <span className="inline-block w-2 h-4 bg-current opacity-0 group-hover:opacity-100 animate-blink" />
        </a>
    );
};

export default MagneticButton;
