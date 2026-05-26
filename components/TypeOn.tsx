'use client';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

interface Props {
    children: string;
    className?: string;
    /** Average ms per character. */
    speed?: number;
    /** Delay before typing starts, ms. */
    delay?: number;
    /** Show a blinking caret at the end while typing. */
    caret?: boolean;
}

const TypeOn = ({
    children,
    className,
    speed = 35,
    delay = 0,
    caret = true,
}: Props) => {
    const containerRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const target = containerRef.current?.querySelector(
                '[data-type-target]',
            ) as HTMLElement | null;
            const caretEl = containerRef.current?.querySelector(
                '[data-type-caret]',
            ) as HTMLElement | null;
            if (!target) return;

            target.textContent = '';

            const io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;
                        io.disconnect();

                        let i = 0;
                        const tick = () => {
                            if (i <= children.length) {
                                target.textContent = children.slice(0, i);
                                i += 1;
                                setTimeout(tick, speed);
                            } else if (caretEl) {
                                caretEl.classList.add('opacity-0');
                            }
                        };
                        setTimeout(tick, delay);
                    });
                },
                { threshold: 0.4 },
            );
            io.observe(containerRef.current!);
            return () => io.disconnect();
        },
        { dependencies: [children, speed, delay, caret] },
    );

    return (
        <span ref={containerRef} className={cn('inline-flex items-baseline', className)}>
            <span data-type-target>{children}</span>
            {caret && (
                <span
                    data-type-caret
                    className="inline-block w-2 h-[1em] bg-primary ml-1 translate-y-[2px] animate-blink"
                />
            )}
        </span>
    );
};

export default TypeOn;
