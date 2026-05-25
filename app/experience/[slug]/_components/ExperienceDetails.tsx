'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import TransitionLink from '@/components/TransitionLink';
import { IExperience } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft } from 'lucide-react';
import { useRef } from 'react';

interface Props {
    experience: IExperience;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ExperienceDetails = ({ experience }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.set('.fade-in-later', {
                autoAlpha: 0,
                y: 30,
            });
            const tl = gsap.timeline({
                delay: 0.5,
            });

            tl.to('.fade-in-later', {
                autoAlpha: 1,
                y: 0,
                stagger: 0.1,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            if (window.innerWidth < 992) return;

            gsap.to('#info', {
                filter: 'blur(3px)',
                autoAlpha: 0,
                scale: 0.9,
                scrollTrigger: {
                    trigger: '#info',
                    start: 'bottom bottom',
                    end: 'bottom top',
                    pin: true,
                    pinSpacing: false,
                    scrub: 0.5,
                },
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="pt-5 pb-14">
            <div className="container" ref={containerRef}>
                <TransitionLink
                    back
                    href="/"
                    className="mb-16 inline-flex gap-2 items-center group h-12"
                >
                    <ArrowLeft className="group-hover:-translate-x-1 group-hover:text-primary transition-all duration-300" />
                    Back
                </TransitionLink>

                <div
                    className="top-0 min-h-[calc(100svh-100px)] flex"
                    id="info"
                >
                    <div className="relative w-full">
                        <div className="mx-auto mb-10 max-w-[635px]">
                            <p className="fade-in-later opacity-0 text-xl text-muted-foreground mb-3">
                                {experience.company}
                            </p>
                            <h1 className="fade-in-later opacity-0 text-4xl md:text-[60px] leading-none font-anton overflow-hidden">
                                <span className="inline-block">
                                    {experience.title}
                                </span>
                            </h1>
                        </div>

                        <div className="max-w-[635px] space-y-7 pb-20 mx-auto">
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Duration
                                </p>
                                <div className="text-lg">
                                    {experience.duration}
                                </div>
                            </div>
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Location
                                </p>
                                <div className="text-lg">
                                    {experience.location}
                                </div>
                            </div>
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Tech & Tools
                                </p>
                                <div className="text-lg">
                                    {experience.techStack.join(', ')}
                                </div>
                            </div>
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    Summary
                                </p>
                                <div className="text-lg">
                                    {experience.summary}
                                </div>
                            </div>
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-anton mb-3">
                                    About the role
                                </p>
                                <div className="text-lg text-muted-foreground">
                                    {experience.description}
                                </div>
                            </div>
                        </div>

                        <ArrowAnimation />
                    </div>
                </div>

                <div className="fade-in-later relative max-w-[800px] mx-auto">
                    <p className="text-muted-foreground font-anton mb-10 text-center text-2xl">
                        Highlights
                    </p>

                    <div className="flex flex-col gap-12">
                        {experience.highlights.map((highlight, idx) => (
                            <div
                                key={highlight.title}
                                className="flex gap-5 md:gap-8 border-b border-background-light pb-12 last:border-b-0"
                            >
                                <div className="font-anton text-muted-foreground text-xl md:text-2xl shrink-0">
                                    _{(idx + 1).toString().padStart(2, '0')}.
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-anton leading-tight mb-4">
                                        {highlight.title}
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {highlight.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceDetails;
