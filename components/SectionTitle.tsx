import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Prompt from './Prompt';

interface Props {
    icon?: ReactNode;
    className?: string;
    classNames?: {
        container?: string;
        title?: string;
        icon?: string;
    };
    title: string;
    /** Optional path prefix for the prompt. Defaults to `~`. */
    path?: string;
    /** Optional command override. Defaults to deriving from `title`. */
    command?: string;
}

const slugCmd = (s: string) =>
    s
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-');

const SectionTitle = ({
    title,
    path = '~',
    command,
    className,
    classNames,
}: Props) => {
    const cmd = command ?? `cat ${slugCmd(title)}.md`;

    return (
        <div
            className={cn(
                'flex items-center gap-3 mb-10',
                className,
                classNames?.container,
            )}
        >
            <Prompt
                path={path}
                command={cmd}
                showCaret
                className={cn('text-base md:text-lg', classNames?.title)}
            />
        </div>
    );
};

export default SectionTitle;
