'use client';
import ScrambleText from '@/components/ScrambleText';
import TransitionLink from '@/components/TransitionLink';
import { cn } from '@/lib/utils';
import { IProject } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

interface Props {
    index: number;
    project: IProject;
    selectedProject: string | null;
    onMouseEnter: (_slug: string) => void;
}

gsap.registerPlugin(useGSAP);

// Strip HTML tags and collapse whitespace to derive a short comment line.
const previewFromHtml = (html: string, max = 120): string => {
    const text = html
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z]+;/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
};

const Project = ({ index, project, selectedProject, onMouseEnter }: Props) => {
    const externalLinkSVGRef = useRef<SVGSVGElement>(null);

    const { context, contextSafe } = useGSAP(() => {}, {
        scope: externalLinkSVGRef,
        revertOnUpdate: true,
    });

    const handleMouseEnter = contextSafe?.(() => {
        onMouseEnter(project.slug);

        const arrowLine = externalLinkSVGRef.current?.querySelector(
            '#arrow-line',
        ) as SVGPathElement;
        const arrowCurb = externalLinkSVGRef.current?.querySelector(
            '#arrow-curb',
        ) as SVGPathElement;
        const box = externalLinkSVGRef.current?.querySelector(
            '#box',
        ) as SVGPathElement;

        gsap.set(box, {
            opacity: 0,
            strokeDasharray: box?.getTotalLength(),
            strokeDashoffset: box?.getTotalLength(),
        });
        gsap.set(arrowLine, {
            opacity: 0,
            strokeDasharray: arrowLine?.getTotalLength(),
            strokeDashoffset: arrowLine?.getTotalLength(),
        });
        gsap.set(arrowCurb, {
            opacity: 0,
            strokeDasharray: arrowCurb?.getTotalLength(),
            strokeDashoffset: arrowCurb?.getTotalLength(),
        });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
        tl.to(externalLinkSVGRef.current, { autoAlpha: 1 })
            .to(box, { opacity: 1, strokeDashoffset: 0 })
            .to(arrowLine, { opacity: 1, strokeDashoffset: 0 }, '<0.2')
            .to(arrowCurb, { opacity: 1, strokeDashoffset: 0 })
            .to(externalLinkSVGRef.current, { autoAlpha: 0 }, '+=1');
    });

    const handleMouseLeave = contextSafe?.(() => {
        context.kill();
    });

    return (
        <TransitionLink
            href={`/projects/${project.slug}`}
            className={cn(
                'project-item group block py-5 md:border-b border-border/40 first:!pt-0 last:pb-0 last:border-none md:group-hover/projects:opacity-30 md:hover:!opacity-100 transition-all',
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
                <span className="text-muted-foreground">
                    _{(index + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-code-comment">drwxr-xr-x</span>
                <span className="text-secondary">{project.year}</span>
                <span className="flex flex-wrap items-center gap-2">
                    <h4 className="inline-flex flex-wrap items-center gap-3 text-3xl xs:text-4xl md:text-5xl font-anton leading-tight transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left">
                        <ScrambleText triggerOn="parent-hover" duration={0.35}>
                            {`${project.slug}/`}
                        </ScrambleText>
                        <span className="text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                ref={externalLinkSVGRef}
                            >
                                <path
                                    id="box"
                                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                                />
                                <path id="arrow-line" d="M10 14 21 3" />
                                <path id="arrow-curb" d="M15 3h6v6" />
                            </svg>
                        </span>
                    </h4>
                </span>
            </div>

            <div className="pl-2 md:pl-24 mt-2 space-y-1 text-sm text-muted-foreground max-w-[680px]">
                <p>
                    <span className="text-code-key">tags:</span>{' '}
                    <span className="text-code-string">
                        {project.techStack.slice(0, 5).join(', ')}
                    </span>
                </p>
                <p className="text-code-comment">
                    # {previewFromHtml(project.description)}
                </p>
            </div>
        </TransitionLink>
    );
};

export default Project;
