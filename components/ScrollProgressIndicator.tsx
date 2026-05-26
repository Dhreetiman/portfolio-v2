'use client';
import React, { useEffect, useRef } from 'react';

const LINE_COUNT = 10;

const ScrollProgressIndicator = () => {
    const caretRef = useRef<HTMLDivElement>(null);
    const percentRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!caretRef.current) return;
            const { scrollHeight, clientHeight } = document.documentElement;
            const max = scrollHeight - clientHeight;
            const progress = max > 0 ? window.scrollY / max : 0;

            caretRef.current.style.top = `${progress * 100}%`;
            if (percentRef.current) {
                percentRef.current.textContent = `${Math.round(progress * 100)}%`;
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="max-md:hidden fixed top-[50svh] right-[2%] -translate-y-1/2 z-[4] font-mono text-[10px] text-muted-foreground select-none pointer-events-none">
            <div className="relative h-[140px] w-12 flex flex-col items-end gap-[2px] pr-3">
                {[...Array(LINE_COUNT)].map((_, i) => (
                    <span key={i} className="leading-none">
                        {(i + 1).toString().padStart(3, '0')}
                    </span>
                ))}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-border" />
                <div
                    ref={caretRef}
                    className="absolute -right-[2px] w-1.5 h-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]"
                />
            </div>
            <div className="mt-2 text-right pr-3 text-primary">
                <span ref={percentRef}>0%</span>
            </div>
        </div>
    );
};

export default ScrollProgressIndicator;
