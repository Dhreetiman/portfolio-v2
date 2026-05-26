'use client';
import ScrambleText from '@/components/ScrambleText';
import TransitionLink from '@/components/TransitionLink';
import { GENERAL_INFO } from '@/lib/data';
import { IExperience } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

interface Props {
    experience: IExperience;
    isLatest?: boolean;
}

gsap.registerPlugin(useGSAP);

const hashSlug = (s: string): string => {
    let h = 5381;
    for (let i = 0; i < s.length; i++) {
        h = (h << 5) + h + s.charCodeAt(i);
    }
    return Math.abs(h).toString(16).slice(0, 7).padEnd(7, '0');
};

const Experience = ({ experience, isLatest = false }: Props) => {
    const externalLinkSVGRef = useRef<SVGSVGElement>(null);

    const { context, contextSafe } = useGSAP(() => {}, {
        scope: externalLinkSVGRef,
        revertOnUpdate: true,
    });

    const handleMouseEnter = contextSafe?.(() => {
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

    const commitHash = hashSlug(experience.slug);

    return (
        <TransitionLink
            href={`/experience/${experience.slug}`}
            className="experience-item group block border-l-2 border-border/40 hover:border-primary pl-6 transition-colors"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="text-sm space-y-1">
                <p>
                    <span className="text-code-string">commit</span>{' '}
                    <span className="text-code-number">{commitHash}</span>
                    {isLatest && (
                        <span className="text-muted-foreground">
                            {' '}
                            (
                            <span className="text-secondary">HEAD -&gt;</span>{' '}
                            <span className="text-code-key">
                                {experience.slug}
                            </span>
                            )
                        </span>
                    )}
                </p>
                <p className="text-muted-foreground">
                    Author: Dhreetiman &lt;{GENERAL_INFO.email}&gt;
                </p>
                <p className="text-muted-foreground">
                    Date:&nbsp;&nbsp; {experience.duration}
                </p>
            </div>

            <h3 className="mt-4 ml-6 flex flex-wrap items-center gap-3 text-2xl xs:text-4xl md:text-5xl font-anton leading-tight transition-all duration-700 bg-gradient-to-r from-primary to-foreground from-[50%] to-[50%] bg-[length:200%] bg-right bg-clip-text text-transparent group-hover:bg-left">
                <ScrambleText triggerOn="parent-hover" duration={0.4}>
                    {`${experience.title} @ ${experience.company}`}
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
            </h3>

            <p className="mt-3 ml-6 text-sm text-muted-foreground max-w-[680px]">
                {experience.summary}
            </p>
        </TransitionLink>
    );
};

export default Experience;
