'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const DOT_COUNT = 14;

const GridBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const dotsRef = useRef<HTMLSpanElement[]>([]);

    useGSAP(
        () => {
            const dots = dotsRef.current.filter(Boolean);
            if (!dots.length) return;

            dots.forEach((dot) => {
                gsap.set(dot, {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                });
            });

            const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
            dots.forEach((dot, i) => {
                tl.to(
                    dot,
                    {
                        opacity: 0.7,
                        scale: 1.8,
                        duration: 0.8,
                        yoyo: true,
                        repeat: 1,
                    },
                    i * 1.4,
                );
            });
        },
        { scope: containerRef },
    );

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 pointer-events-none overflow-hidden grid-bg"
        >
            {[...Array(DOT_COUNT)].map((_, i) => (
                <span
                    key={i}
                    ref={(el) => {
                        if (el) dotsRef.current[i] = el;
                    }}
                    className="absolute size-1.5 rounded-full bg-secondary opacity-10"
                />
            ))}
            <span
                aria-hidden
                className="absolute inset-x-0 h-[2px] bg-primary/40 blur-[2px] animate-scan"
            />
        </div>
    );
};

export default GridBackground;
