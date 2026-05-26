'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import ScrambleText from './ScrambleText';
import Prompt from './Prompt';

const MENU_LINKS = [
    { name: 'home', url: '/' },
    { name: 'about-me', url: '/#about-me' },
    { name: 'experience', url: '/#my-experience' },
    { name: 'projects', url: '/#selected-projects' },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <>
            <div className="sticky top-0 z-[4]">
                <button
                    aria-label="Toggle menu"
                    className={cn(
                        'group absolute top-5 right-5 md:right-10 z-[2] inline-flex items-center justify-center w-12 h-12 font-mono text-primary border border-primary/60 bg-background/70 backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground',
                    )}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="text-base leading-none">
                        {isMenuOpen ? '[x]' : '[☰]'}
                    </span>
                </button>
            </div>

            <div
                className={cn(
                    'overlay fixed inset-0 z-[2] bg-black/70 transition-all duration-150',
                    {
                        'opacity-0 invisible pointer-events-none': !isMenuOpen,
                    },
                )}
                onClick={() => setIsMenuOpen(false)}
            />

            <div
                className={cn(
                    'fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)] transform translate-x-full transition-transform duration-700 z-[3] overflow-hidden gap-y-14',
                    'flex flex-col lg:justify-center py-10 font-mono',
                    { 'translate-x-0': isMenuOpen },
                )}
            >
                <div
                    className={cn(
                        'fixed inset-0 scale-150 translate-x-1/2 rounded-[50%] bg-background-light duration-700 delay-150 z-[-1]',
                        {
                            'translate-x-0': isMenuOpen,
                        },
                    )}
                />

                <div className="grow flex md:items-center w-full max-w-[300px] mx-8 sm:mx-auto">
                    <div className="flex gap-10 lg:justify-between max-lg:flex-col w-full">
                        <div className="max-lg:order-2">
                            <p className="text-muted-foreground text-xs mb-5 md:mb-8">
                                <Prompt path="~/social" command="ls" />
                            </p>
                            <ul className="space-y-3">
                                {SOCIAL_LINKS.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group inline-flex items-baseline gap-2 text-lg hover:text-primary transition-colors"
                                        >
                                            <span className="text-primary">&gt;</span>
                                            <ScrambleText triggerOn="parent-hover" duration={0.35}>
                                                {`open(${link.name})`}
                                            </ScrambleText>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <p className="text-muted-foreground text-xs mb-5 md:mb-8">
                                <Prompt path="~" command="cd" />
                            </p>
                            <ul className="space-y-3">
                                {MENU_LINKS.map((link) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => {
                                                router.push(link.url);
                                                setIsMenuOpen(false);
                                            }}
                                            className="group text-xl inline-flex items-baseline gap-3 hover:text-primary transition-colors"
                                        >
                                            <span className="text-primary">&gt;</span>
                                            <ScrambleText triggerOn="parent-hover" duration={0.35}>
                                                {link.name}
                                            </ScrambleText>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-[300px] mx-8 sm:mx-auto">
                    <p className="text-muted-foreground text-xs mb-4">
                        <Prompt path="~/contact" command="echo $EMAIL" />
                    </p>
                    <a
                        href={`mailto:${GENERAL_INFO.email}`}
                        className="hover:text-primary transition-colors"
                    >
                        {GENERAL_INFO.email}
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
