'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
    useGSAP(() => {
        const tl = gsap.timeline();

        tl.to('.page-transition--inner', {
            yPercent: 0,
            duration: 0.2,
        })
            .to('.page-transition--inner', {
                yPercent: -100,
                duration: 0.2,
            })
            .to('.page-transition', {
                yPercent: -100,
            });
    });

    return (
        <div>
            <div className="page-transition w-screen h-screen fixed top-0 left-0 bg-background z-[5] flex items-center justify-center">
                <div className="page-transition--inner w-screen h-screen fixed top-0 left-0 bg-primary/10 z-[5] translate-y-full" />
                <pre className="font-mono text-xs md:text-sm text-primary relative z-[6]">
{`$ navigating...
[████████░░] 80%`}
                </pre>
            </div>

            {children}
        </div>
    );
}
