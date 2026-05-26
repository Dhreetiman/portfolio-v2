'use client';
import parse from 'html-react-parser';
import CodeBlock from '@/components/CodeBlock';
import Terminal from '@/components/Terminal';
import TransitionLink from '@/components/TransitionLink';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { useRef } from 'react';

interface Props {
    project: IProject;
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ProjectDetails = ({ project }: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (!containerRef.current) return;

            gsap.set('.fade-in-later', { autoAlpha: 0, y: 30 });
            const tl = gsap.timeline({ delay: 0.5 });

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
            gsap.utils
                .toArray<HTMLDivElement>('#images > div')
                .forEach((imageDiv, i) => {
                    gsap.to(imageDiv, {
                        backgroundPosition: 'center 0%',
                        ease: 'none',
                        scrollTrigger: {
                            trigger: imageDiv,
                            start: () => (i ? 'top bottom' : 'top 50%'),
                            end: 'bottom top',
                            scrub: true,
                        },
                    });
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
                    className="mb-10 inline-flex gap-2 items-center group h-12 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <ArrowLeft
                        size={16}
                        className="group-hover:-translate-x-1 transition-all duration-300"
                    />
                    cd ..
                </TransitionLink>

                <Terminal
                    tab={`~/projects/${project.slug}`}
                    statusLeft="md"
                    statusRight={`~/projects/${project.slug}`}
                    className="mb-12"
                >
                    <div className="font-mono">
                        <div className="flex items-start justify-between gap-4 mb-8 fade-in-later">
                            <h1 className="text-3xl md:text-[56px] leading-none font-anton">
                                <span className="text-muted-foreground font-mono text-base mr-3 align-top">
                                    #
                                </span>
                                {project.title}
                            </h1>

                            <div className="flex gap-3 shrink-0">
                                {project.sourceCode && (
                                    <a
                                        href={project.sourceCode}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                        aria-label="Source code"
                                    >
                                        <Github size={26} />
                                    </a>
                                )}
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noreferrer noopener"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                        aria-label="Live URL"
                                    >
                                        <ExternalLink size={26} />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="fade-in-later mb-8">
                            <CodeBlock lang="yaml" filename="frontmatter.yaml">
                                <code className="text-sm leading-relaxed">
                                    <span className="text-muted-foreground">
                                        ---
                                    </span>
                                    {'\n'}
                                    <span className="text-code-key">year</span>
                                    <span className="text-muted-foreground">
                                        :
                                    </span>{' '}
                                    <span className="text-code-number">
                                        {project.year}
                                    </span>
                                    {'\n'}
                                    <span className="text-code-key">stack</span>
                                    <span className="text-muted-foreground">
                                        :
                                    </span>{' '}
                                    <span className="text-code-string">
                                        {project.techStack.join(', ')}
                                    </span>
                                    {'\n'}
                                    <span className="text-muted-foreground">
                                        ---
                                    </span>
                                </code>
                            </CodeBlock>
                        </div>

                        <div className="fade-in-later mb-8">
                            <p className="text-muted-foreground font-mono text-sm mb-3">
                                <span className="text-code-key">##</span>{' '}
                                Description
                            </p>
                            <div className="text-base md:text-lg leading-relaxed prose-xl markdown-text font-[var(--font-roboto-flex)]">
                                {parse(project.description)}
                            </div>
                        </div>

                        {project.role && (
                            <div className="fade-in-later">
                                <p className="text-muted-foreground font-mono text-sm mb-3">
                                    <span className="text-code-key">##</span>{' '}
                                    My Role
                                </p>
                                <div className="text-base md:text-lg leading-relaxed font-[var(--font-roboto-flex)]">
                                    {parse(project.role)}
                                </div>
                            </div>
                        )}
                    </div>
                </Terminal>

                <div
                    className="fade-in-later relative flex flex-col gap-3 max-w-[860px] mx-auto"
                    id="images"
                >
                    {project.images.map((image, idx) => (
                        <div
                            key={image}
                            className="terminal-frame relative w-full overflow-hidden"
                        >
                            <div className="terminal-tabbar">
                                <span className="terminal-tabbar-dot bg-destructive/70" />
                                <span className="terminal-tabbar-dot bg-yellow-500/70" />
                                <span className="terminal-tabbar-dot bg-primary/70" />
                                <span className="ml-2 truncate">
                                    screenshot_
                                    {(idx + 1).toString().padStart(2, '0')}.png
                                </span>
                            </div>
                            <div
                                className="group relative w-full aspect-[750/400] bg-background-light"
                                style={{
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center 50%',
                                    backgroundRepeat: 'no-repeat',
                                }}
                            >
                                <a
                                    href={image}
                                    target="_blank"
                                    className="absolute top-4 right-4 bg-background/70 text-foreground size-10 inline-flex justify-center items-center transition-all opacity-0 hover:bg-primary hover:text-primary-foreground group-hover:opacity-100"
                                >
                                    <ExternalLink size={18} />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails;
