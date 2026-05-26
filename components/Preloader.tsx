'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const BOOT_LINES = [
    '$ booting portfolio...',
    '> resolving modules........[OK]',
    '> loading assets...........[OK]',
    '> compiling routes.........[OK]',
    '> ready in 387ms',
    '',
    '  > welcome, dhreetiman.',
];

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: { ease: 'power1.inOut' },
            });

            tl.to('.boot-line', {
                opacity: 1,
                duration: 0.05,
                stagger: 0.18,
            });

            tl.to('.preloader-item', {
                delay: 0.6,
                y: '100%',
                duration: 0.5,
                stagger: 0.08,
            })
                .to('.boot-line', { autoAlpha: 0 }, '<0.4')
                .to(
                    preloaderRef.current,
                    { autoAlpha: 0, pointerEvents: 'none' },
                    '<1',
                );
        },
        { scope: preloaderRef },
    );

    return (
        <div className="fixed inset-0 z-[6] flex" ref={preloaderRef}>
            {[...Array(10)].map((_, i) => (
                <div
                    key={i}
                    className="preloader-item h-full w-[10%] bg-black"
                />
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
                <pre className="font-mono text-xs md:text-base text-foreground/90 leading-relaxed">
                    {BOOT_LINES.map((line, i) => (
                        <div
                            key={i}
                            className="boot-line opacity-0"
                        >
                            {line || ' '}
                        </div>
                    ))}
                </pre>
            </div>
        </div>
    );
};

export default Preloader;
