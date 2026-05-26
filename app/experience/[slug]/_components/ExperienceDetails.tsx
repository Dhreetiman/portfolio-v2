'use client';
import CodeBlock from '@/components/CodeBlock';
import Terminal from '@/components/Terminal';
import TransitionLink from '@/components/TransitionLink';
import { GENERAL_INFO, MY_EXPERIENCE } from '@/lib/data';
import { IExperience } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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
            gsap.set('.fade-in-later', { autoAlpha: 0, y: 30 });
            const tl = gsap.timeline({ delay: 0.5 });
            tl.to('.fade-in-later', { autoAlpha: 1, y: 0, stagger: 0.1 });
        },
        { scope: containerRef },
    );

    const currentIdx = MY_EXPERIENCE.findIndex(
        (e) => e.slug === experience.slug,
    );
    const prevExp = currentIdx > 0 ? MY_EXPERIENCE[currentIdx - 1] : null;
    const nextExp =
        currentIdx >= 0 && currentIdx < MY_EXPERIENCE.length - 1
            ? MY_EXPERIENCE[currentIdx + 1]
            : null;

    return (
        <section className="pt-5 pb-14">
            <div className="container" ref={containerRef}>
                <TransitionLink
                    back
                    href="/"
                    className="mb-10 inline-flex gap-2 items-center group h-12 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft
                        size={16}
                        className="group-hover:-translate-x-1 transition-all duration-300"
                    />
                    cd ..
                </TransitionLink>

                <Terminal
                    tab={`~/experience/${experience.slug}`}
                    statusLeft="git log -p"
                    statusRight={`~/experience/${experience.slug}`}
                    className="mb-12"
                >
                    <div className="font-mono">
                        <div className="fade-in-later mb-8">
                            <CodeBlock lang="git" filename="commit.log">
                                <code className="text-sm leading-relaxed">
                                    <span className="text-code-string">
                                        commit
                                    </span>{' '}
                                    <span className="text-code-number">
                                        ({experience.slug})
                                    </span>
                                    {'\n'}
                                    <span className="text-muted-foreground">
                                        Author:
                                    </span>{' '}
                                    Dhreetiman Prasad &lt;{GENERAL_INFO.email}&gt;
                                    {'\n'}
                                    <span className="text-muted-foreground">
                                        Date:&nbsp;&nbsp;
                                    </span>
                                    {experience.duration}
                                    {'\n'}
                                    <span className="text-muted-foreground">
                                        Location:
                                    </span>{' '}
                                    {experience.location}
                                    {'\n'}
                                    <span className="text-muted-foreground">
                                        Stack:&nbsp;&nbsp;&nbsp;
                                    </span>{' '}
                                    <span className="text-code-string">
                                        {experience.techStack.join(', ')}
                                    </span>
                                </code>
                            </CodeBlock>
                        </div>

                        <h1 className="fade-in-later text-3xl md:text-[56px] leading-tight font-anton mb-8">
                            <span className="text-muted-foreground font-mono text-base mr-3 align-top">
                                #
                            </span>
                            {experience.title}{' '}
                            <span className="text-muted-foreground">@</span>{' '}
                            <span className="text-primary">
                                {experience.company}
                            </span>
                        </h1>

                        <div className="fade-in-later mb-8">
                            <p className="text-muted-foreground font-mono text-sm mb-3">
                                <span className="text-code-key">##</span> Summary
                            </p>
                            <p className="text-base md:text-lg font-[var(--font-roboto-flex)]">
                                {experience.summary}
                            </p>
                        </div>

                        <div className="fade-in-later mb-8">
                            <p className="text-muted-foreground font-mono text-sm mb-3">
                                <span className="text-code-key">##</span> About
                                the role
                            </p>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-[var(--font-roboto-flex)]">
                                {experience.description}
                            </p>
                        </div>
                    </div>
                </Terminal>

                <div className="max-w-[860px] mx-auto">
                    <p className="text-muted-foreground font-mono text-sm mb-8">
                        <span className="text-code-key">##</span> Highlights
                    </p>

                    <div className="flex flex-col gap-10">
                        {experience.highlights.map((highlight, idx) => (
                            <div
                                key={highlight.title}
                                className="border-l-2 border-border/40 hover:border-primary pl-6 transition-colors"
                            >
                                <p className="font-mono text-sm mb-2">
                                    <span className="text-code-string">
                                        commit
                                    </span>{' '}
                                    <span className="text-code-number">
                                        {(idx + 1).toString().padStart(2, '0')}
                                    </span>{' '}
                                    <span className="text-muted-foreground">
                                        — {experience.title} @{' '}
                                        {experience.company}
                                    </span>
                                </p>
                                <h3 className="text-xl md:text-3xl font-anton leading-tight mb-3">
                                    {highlight.title}
                                </h3>
                                <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-[var(--font-roboto-flex)]">
                                    {highlight.body}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 flex flex-wrap items-center justify-between gap-4 font-mono text-sm border-t border-border/40 pt-6">
                        {prevExp ? (
                            <TransitionLink
                                href={`/experience/${prevExp.slug}`}
                                className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ArrowLeft
                                    size={14}
                                    className="group-hover:-translate-x-1 transition-all"
                                />
                                cd ../{prevExp.slug}
                            </TransitionLink>
                        ) : (
                            <span />
                        )}

                        {nextExp ? (
                            <TransitionLink
                                href={`/experience/${nextExp.slug}`}
                                className="group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                            >
                                cd ../{nextExp.slug}
                                <ArrowRight
                                    size={14}
                                    className="group-hover:translate-x-1 transition-all"
                                />
                            </TransitionLink>
                        ) : (
                            <span />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExperienceDetails;
