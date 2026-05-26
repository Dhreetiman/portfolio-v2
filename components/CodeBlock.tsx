import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
    lang?: string;
    filename?: string;
    children: ReactNode;
    className?: string;
}

const CodeBlock = ({ lang, filename, children, className }: Props) => {
    return (
        <div
            className={cn(
                'relative border border-border/60 rounded bg-background-light/30 font-mono text-sm overflow-hidden',
                className,
            )}
        >
            {(lang || filename) && (
                <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-border/60 text-xs">
                    {filename && (
                        <span className="text-muted-foreground truncate">
                            {filename}
                        </span>
                    )}
                    {lang && (
                        <span className="text-code-key uppercase tracking-wider">
                            {lang}
                        </span>
                    )}
                </div>
            )}

            <pre className="px-4 py-4 md:px-6 md:py-5 overflow-x-auto leading-relaxed">
                {children}
            </pre>
        </div>
    );
};

export default CodeBlock;
