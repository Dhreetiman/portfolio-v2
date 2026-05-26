'use client';
import CodeBlock from '@/components/CodeBlock';
import Prompt from '@/components/Prompt';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const AboutMe = () => {
    const container = React.useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-in',
                    trigger: container.current,
                    start: 'top 70%',
                    end: 'bottom bottom',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up-and-fade', {
                y: 150,
                opacity: 0,
                stagger: 0.05,
            });
        },
        { scope: container },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    id: 'about-me-out',
                    trigger: container.current,
                    start: 'bottom 50%',
                    end: 'bottom 10%',
                    scrub: 0.5,
                },
            });

            tl.to('.slide-up-and-fade', {
                y: -150,
                opacity: 0,
                stagger: 0.02,
            });
        },
        { scope: container },
    );

    return (
        <section className="py-section" id="about-me">
            <div className="container" ref={container}>
                <div className="slide-up-and-fade mb-10">
                    <Prompt path="~/about" command="cat about.md" showCaret />
                </div>

                <CodeBlock lang="md" filename="philosophy.md" className="mb-16 slide-up-and-fade">
                    <code className="text-base md:text-xl leading-relaxed text-code-comment">
                        <span className="text-secondary">/**</span>
                        {'\n'}
                        <span className="text-secondary"> *</span>{' '}
                        <span className="text-foreground/90">
                            I believe great backend systems are invisible —
                        </span>
                        {'\n'}
                        <span className="text-secondary"> *</span>{' '}
                        <span className="text-foreground/90">
                            fast, reliable, and quietly doing exactly what
                        </span>
                        {'\n'}
                        <span className="text-secondary"> *</span>{' '}
                        <span className="text-foreground/90">
                            users need without getting in their way.
                        </span>
                        {'\n'}
                        <span className="text-secondary"> */</span>
                    </code>
                </CodeBlock>

                <div className="grid md:grid-cols-12 gap-y-6 md:gap-x-10">
                    <div className="md:col-span-5">
                        <p className="text-5xl md:text-6xl font-anton slide-up-and-fade leading-none">
                            <span className="text-muted-foreground font-mono text-2xl md:text-3xl align-top mr-2">
                                ##
                            </span>
                            Hi, I&apos;m Dhreetiman.
                        </p>
                    </div>
                    <div className="md:col-span-7">
                        <div className="text-lg text-muted-foreground max-w-[520px] space-y-4">
                            <p className="slide-up-and-fade">
                                I&apos;m a backend and AI engineer who owns
                                production systems end to end — from architecture
                                and performance work, through LLM-powered features,
                                to being the technical voice in client
                                conversations.
                            </p>
                            <p className="slide-up-and-fade">
                                I design for scale and reliability, then sweat the
                                hot paths until they fly. Recent wins: 89% API
                                latency cuts on the analytics layer; a multi-agent
                                RAG pipeline shipped to production; an OCPP / WebSocket
                                EV-charger control plane.
                            </p>
                            <p className="slide-up-and-fade font-mono text-sm text-code-key">
                                tags: #backend #ai #microservices #rag #postgres
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
