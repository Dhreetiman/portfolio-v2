'use client';
import SectionTitle from '@/components/SectionTitle';
import { PROJECTS } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef, useState, MouseEvent } from 'react';
import Project from './Project';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const ProjectList = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const projectListRef = useRef<HTMLDivElement>(null);
    const imageContainer = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [selectedProject, setSelectedProject] = useState<string | null>(
        PROJECTS[0].slug,
    );

    useGSAP(
        (context, contextSafe) => {
            if (window.innerWidth < 768) {
                setSelectedProject(null);
                return;
            }

            const handleMouseMove = contextSafe?.((e: MouseEvent) => {
                if (!containerRef.current) return;
                if (!imageContainer.current) return;

                if (window.innerWidth < 768) {
                    setSelectedProject(null);
                    return;
                }

                const containerRect =
                    containerRef.current?.getBoundingClientRect();
                const imageRect =
                    imageContainer.current.getBoundingClientRect();
                const offsetTop = e.clientY - containerRect.y;

                if (
                    containerRect.y > e.clientY ||
                    containerRect.bottom < e.clientY ||
                    containerRect.x > e.clientX ||
                    containerRect.right < e.clientX
                ) {
                    return gsap.to(imageContainer.current, {
                        duration: 0.3,
                        opacity: 0,
                    });
                }

                gsap.to(imageContainer.current, {
                    y: offsetTop - imageRect.height / 2,
                    duration: 1,
                    opacity: 1,
                });
            }) as any;

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
            };
        },
        { scope: containerRef, dependencies: [containerRef.current] },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'top 80%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from(containerRef.current, {
                y: 150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    const handleMouseEnter = (slug: string) => {
        if (window.innerWidth < 768) {
            setSelectedProject(null);
            return;
        }
        setSelectedProject(slug);
    };

    return (
        <section className="py-section" id="selected-projects">
            <div className="container">
                <SectionTitle
                    title="selected projects"
                    path="~/projects"
                    command="ls -la repos/"
                />

                <div className="group/projects relative" ref={containerRef}>
                    {selectedProject !== null && (
                        <div
                            className="max-md:hidden absolute right-0 top-0 z-[1] pointer-events-none w-[220px] xl:w-[340px] opacity-0"
                            ref={imageContainer}
                        >
                            <div className="terminal-frame">
                                <div className="terminal-tabbar">
                                    <span className="terminal-tabbar-dot bg-destructive/70" />
                                    <span className="terminal-tabbar-dot bg-yellow-500/70" />
                                    <span className="terminal-tabbar-dot bg-primary/70" />
                                    <span className="ml-2 truncate">
                                        preview/{selectedProject}.png
                                    </span>
                                </div>
                                <div className="aspect-[3/4] relative overflow-hidden">
                                    {PROJECTS.map((project) => (
                                        <Image
                                            src={project.thumbnail}
                                            alt="Project"
                                            width="400"
                                            height="500"
                                            className={cn(
                                                'absolute inset-0 transition-all duration-500 w-full h-full object-cover',
                                                {
                                                    'opacity-0':
                                                        project.slug !==
                                                        selectedProject,
                                                },
                                            )}
                                            ref={imageRef}
                                            key={project.slug}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div
                        className="flex flex-col font-mono"
                        ref={projectListRef}
                    >
                        {PROJECTS.map((project, index) => (
                            <Project
                                index={index}
                                project={project}
                                selectedProject={selectedProject}
                                onMouseEnter={handleMouseEnter}
                                key={project.slug}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectList;
