'use client';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const SCRAMBLE_CHARS =
    '!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

interface Props {
    children: string;
    className?: string;
    /** Trigger on hover (parent group-hover via `triggerOn="parent-hover"`) or on view enter (default). */
    triggerOn?: 'mount' | 'parent-hover' | 'view';
    /** Total scramble duration in seconds. */
    duration?: number;
}

const scramble = (
    el: HTMLElement,
    target: string,
    duration: number,
) => {
    const total = target.length;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const settled = Math.floor(progress * total);

        let out = '';
        for (let i = 0; i < total; i++) {
            if (i < settled) {
                out += target[i];
            } else if (target[i] === ' ') {
                out += ' ';
            } else {
                out +=
                    SCRAMBLE_CHARS[
                        Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                    ];
            }
        }
        el.textContent = out;

        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
    };

    requestAnimationFrame(tick);
};

const ScrambleText = ({
    children,
    className,
    triggerOn = 'view',
    duration = 0.45,
}: Props) => {
    const spanRef = useRef<HTMLSpanElement>(null);

    useGSAP(
        () => {
            const el = spanRef.current;
            if (!el) return;
            el.textContent = children;

            if (triggerOn === 'mount') {
                scramble(el, children, duration);
                return;
            }

            if (triggerOn === 'view') {
                const io = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                scramble(el, children, duration);
                                io.disconnect();
                            }
                        });
                    },
                    { threshold: 0.4 },
                );
                io.observe(el);
                return () => io.disconnect();
            }

            if (triggerOn === 'parent-hover') {
                const parent = el.closest('.group') ?? el.parentElement;
                if (!parent) return;
                const handleEnter = () => scramble(el, children, duration);
                parent.addEventListener('mouseenter', handleEnter);
                return () => parent.removeEventListener('mouseenter', handleEnter);
            }
        },
        { dependencies: [children, triggerOn, duration] },
    );

    return (
        <span ref={spanRef} className={cn(className)}>
            {children}
        </span>
    );
};

export default ScrambleText;
