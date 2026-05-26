'use client';
import CodeBlock from '@/components/CodeBlock';
import MagneticButton from '@/components/MagneticButton';
import Prompt from '@/components/Prompt';
import Terminal from '@/components/Terminal';
import TypeOn from '@/components/TypeOn';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const STATS: { key: string; value: number; suffix?: string }[] = [
    { key: 'years', value: 3, suffix: '+' },
    { key: 'projects', value: 15, suffix: '+' },
    { key: 'hours', value: 6, suffix: 'K+' },
];

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            if (!statsRef.current) return;
            const targets =
                statsRef.current.querySelectorAll<HTMLSpanElement>(
                    '[data-counter]',
                );

            targets.forEach((el) => {
                const final = Number(el.dataset.target ?? '0');
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: final,
                    duration: 1.4,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 90%',
                        once: true,
                    },
                    onUpdate: () => {
                        el.textContent = Math.round(obj.val).toString();
                    },
                });
            });
        },
        { scope: statsRef },
    );

    return (
        <section className="relative" id="banner">
            <div
                className="container min-h-[100svh] py-24 md:py-32 flex items-center"
                ref={containerRef}
            >
                <Terminal
                    tab="dhreetiman ~ portfolio — zsh"
                    statusLeft="UTF-8"
                    statusRight="● connected"
                    className="w-full slide-up-and-fade"
                    classNames={{ body: 'p-6 md:p-12' }}
                >
                    <div className="grid md:grid-cols-12 gap-10 items-center">
                        <div className="md:col-span-7 space-y-6 font-mono text-sm">
                            <div>
                                <Prompt path="~" command="whoami" />
                                <p className="mt-2 text-foreground text-base">
                                    Dhreetiman Prasad
                                </p>
                            </div>

                            <div>
                                <Prompt path="~" command="cat role.txt" />
                                <h1 className="mt-3 banner-title leading-[.95] text-5xl sm:text-6xl md:text-[80px] font-anton">
                                    <span className="text-primary">
                                        BACKEND / AI
                                    </span>
                                    <br />
                                    <span className="ml-4">ENGINEER</span>
                                </h1>
                            </div>

                            <CodeBlock lang="ts" filename="bio.ts">
                                <code className="text-sm leading-relaxed">
                                    <span className="text-code-comment">
                                        {'// 3+ years building production backend & AI systems'}
                                    </span>
                                    {'\n'}
                                    <span className="text-secondary">
                                        const
                                    </span>{' '}
                                    <span className="text-foreground">
                                        dhreetiman
                                    </span>{' '}
                                    <span className="text-muted-foreground">
                                        =
                                    </span>{' '}
                                    {'{\n'}
                                    {'  '}
                                    <span className="text-code-key">
                                        domain
                                    </span>
                                    <span className="text-muted-foreground">
                                        :
                                    </span>{' '}
                                    [
                                    <span className="text-code-string">
                                        &quot;Node.js&quot;
                                    </span>
                                    ,{' '}
                                    <span className="text-code-string">
                                        &quot;Python/FastAPI&quot;
                                    </span>
                                    ],{'\n'}
                                    {'  '}
                                    <span className="text-code-key">focus</span>
                                    <span className="text-muted-foreground">
                                        :
                                    </span>{' '}
                                    <span className="text-code-string">
                                        &quot;RAG, microservices, LLM features&quot;
                                    </span>
                                    ,{'\n'}
                                    {'  '}
                                    <span className="text-code-key">years</span>
                                    <span className="text-muted-foreground">
                                        :
                                    </span>{' '}
                                    <span className="text-code-number">3</span>,
                                    {'\n'}
                                    {'  '}
                                    <span className="text-code-key">
                                        impact
                                    </span>
                                    <span className="text-muted-foreground">
                                        :
                                    </span>{' '}
                                    <span className="text-code-string">
                                        &quot;API latency cut by up to 89%&quot;
                                    </span>
                                    ,{'\n'}
                                    {'}'}
                                </code>
                            </CodeBlock>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                                <MagneticButton
                                    href={`mailto:${GENERAL_INFO.email}`}
                                >
                                    $ ./send_email.sh
                                </MagneticButton>

                                <div className="flex items-center gap-2 text-xs">
                                    <span className="relative inline-flex items-center justify-center size-3">
                                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-60" />
                                        <span className="relative size-2 rounded-full bg-primary" />
                                    </span>
                                    <span className="text-muted-foreground">
                                        status:{' '}
                                        <span className="text-primary">
                                            available_for_hire
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="md:col-span-5"
                            ref={statsRef}
                        >
                            <CodeBlock lang="json" filename="stats.json">
                                <code className="text-sm leading-loose">
                                    {'{\n'}
                                    {STATS.map((s, i) => (
                                        <React.Fragment key={s.key}>
                                            {'  '}
                                            <span className="text-code-key">
                                                &quot;{s.key}&quot;
                                            </span>
                                            <span className="text-muted-foreground">
                                                :
                                            </span>{' '}
                                            <span className="text-code-number text-3xl font-anton">
                                                <span
                                                    data-counter
                                                    data-target={s.value}
                                                >
                                                    0
                                                </span>
                                                {s.suffix}
                                            </span>
                                            {i < STATS.length - 1 ? ',' : ''}
                                            {'\n'}
                                        </React.Fragment>
                                    ))}
                                    {'}'}
                                </code>
                            </CodeBlock>

                            <div className="mt-4 font-mono text-xs text-muted-foreground space-y-1">
                                <p>
                                    <span className="text-code-comment">{'// '}</span>
                                    <TypeOn delay={400} speed={45}>
                                        scroll to read more
                                    </TypeOn>
                                </p>
                            </div>
                        </div>
                    </div>
                </Terminal>
            </div>
        </section>
    );
};

export default Banner;
