'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const SYMBOLS = ['{', '}', '<', '>', '$', '_', '/', '=', '*', ';', '|', '&', '[', ']', '~'];
const SYMBOL_COUNT = 18;

const GridBackground = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const symbolsRef = useRef<HTMLSpanElement[]>([]);
    const orbsRef = useRef<HTMLDivElement[]>([]);

    useGSAP(
        () => {
            const orbs = orbsRef.current.filter(Boolean);
            orbs.forEach((orb, i) => {
                const dx = (i % 2 === 0 ? 1 : -1) * (40 + Math.random() * 40);
                const dy = (i % 3 === 0 ? -1 : 1) * (30 + Math.random() * 50);
                gsap.to(orb, {
                    x: dx,
                    y: dy,
                    duration: 18 + i * 4,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut',
                });
            });

            const symbols = symbolsRef.current.filter(Boolean);
            symbols.forEach((sym) => {
                const reset = () => {
                    gsap.set(sym, {
                        left: `${Math.random() * 100}%`,
                        top: '105%',
                        opacity: 0,
                        rotation: (Math.random() - 0.5) * 30,
                        scale: 0.7 + Math.random() * 0.7,
                    });
                };
                reset();

                const animate = () => {
                    const duration = 18 + Math.random() * 18;
                    const xDrift = (Math.random() - 0.5) * 120;
                    gsap.to(sym, {
                        top: '-10%',
                        x: xDrift,
                        opacity: 0.18 + Math.random() * 0.15,
                        duration,
                        ease: 'none',
                        onComplete: () => {
                            reset();
                            animate();
                        },
                    });
                    gsap.to(sym, {
                        opacity: 0,
                        duration: 4,
                        delay: duration - 4,
                        ease: 'none',
                    });
                };

                gsap.delayedCall(Math.random() * 12, animate);
            });
        },
        { scope: containerRef },
    );

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 -z-10 pointer-events-none overflow-hidden grid-bg"
        >
            <div
                ref={(el) => {
                    if (el) orbsRef.current[0] = el;
                }}
                className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full bg-primary/15 blur-3xl"
            />
            <div
                ref={(el) => {
                    if (el) orbsRef.current[1] = el;
                }}
                className="absolute -bottom-40 -right-32 w-[44rem] h-[44rem] rounded-full bg-secondary/15 blur-3xl"
            />
            <div
                ref={(el) => {
                    if (el) orbsRef.current[2] = el;
                }}
                className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] rounded-full bg-[hsl(var(--accent-warm)/0.10)] blur-3xl"
            />

            {[...Array(SYMBOL_COUNT)].map((_, i) => (
                <span
                    key={i}
                    ref={(el) => {
                        if (el) symbolsRef.current[i] = el;
                    }}
                    className="absolute font-mono text-lg md:text-2xl text-primary/30 select-none"
                >
                    {SYMBOLS[i % SYMBOLS.length]}
                </span>
            ))}

            <span
                aria-hidden
                className="absolute inset-x-0 h-[2px] bg-primary/30 blur-[2px] animate-scan"
            />
        </div>
    );
};

export default GridBackground;
