'use client';
import CodeBlock from '@/components/CodeBlock';
import SectionTitle from '@/components/SectionTitle';
import { MY_STACK } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import React, { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Skills = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const slideUpEl =
                containerRef.current?.querySelectorAll('.slide-up');
            if (!slideUpEl?.length) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 80%',
                    scrub: 0.5,
                },
            });

            tl.from('.slide-up', {
                opacity: 0,
                y: 30,
                ease: 'none',
                stagger: 0.06,
            });
        },
        { scope: containerRef },
    );

    return (
        <section className="py-section" id="my-stack" ref={containerRef}>
            <div className="container">
                <SectionTitle
                    title="my stack"
                    path="~/skills"
                    command="cat stack.yaml"
                    className="slide-up"
                />

                <CodeBlock lang="yaml" filename="stack.yaml" className="slide-up">
                    <code className="text-sm md:text-base leading-loose">
                        {Object.entries(MY_STACK).map(([key, value], catIdx) => (
                            <React.Fragment key={key}>
                                <div className="slide-up">
                                    <span className="text-code-key">{key}</span>
                                    <span className="text-muted-foreground">
                                        :
                                    </span>
                                </div>
                                {value.map((item) => (
                                    <div
                                        key={`${key}-${item.name}`}
                                        className="slide-up flex items-center gap-3 pl-4 group hover:text-primary transition-colors"
                                    >
                                        <span className="text-muted-foreground">
                                            -
                                        </span>
                                        <Image
                                            src={item.icon}
                                            alt={item.name}
                                            width={18}
                                            height={18}
                                            className="opacity-70 group-hover:opacity-100 transition-opacity"
                                        />
                                        <span className="text-code-string">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                                {catIdx < Object.keys(MY_STACK).length - 1 && (
                                    <div>&nbsp;</div>
                                )}
                            </React.Fragment>
                        ))}
                    </code>
                </CodeBlock>
            </div>
        </section>
    );
};

export default Skills;
