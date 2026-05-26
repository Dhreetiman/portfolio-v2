import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Props {
    tab?: string;
    statusLeft?: ReactNode;
    statusRight?: ReactNode;
    children: ReactNode;
    className?: string;
    classNames?: {
        body?: string;
        tabbar?: string;
        statusbar?: string;
    };
}

const Terminal = ({
    tab = 'dhreetiman ~ portfolio',
    statusLeft,
    statusRight,
    children,
    className,
    classNames,
}: Props) => {
    return (
        <div className={cn('terminal-frame relative overflow-hidden', className)}>
            <div
                className={cn(
                    'terminal-tabbar select-none',
                    classNames?.tabbar,
                )}
            >
                <span className="terminal-tabbar-dot bg-destructive/70" />
                <span className="terminal-tabbar-dot bg-yellow-500/70" />
                <span className="terminal-tabbar-dot bg-primary/70" />
                <span className="ml-3 truncate">{tab}</span>
            </div>

            <div className={cn('p-6 md:p-10', classNames?.body)}>{children}</div>

            {(statusLeft || statusRight) && (
                <div
                    className={cn(
                        'flex items-center justify-between gap-3 px-4 py-2 border-t border-border/60 font-mono text-[11px] text-muted-foreground',
                        classNames?.statusbar,
                    )}
                >
                    <span className="truncate">{statusLeft}</span>
                    <span className="truncate">{statusRight}</span>
                </div>
            )}
        </div>
    );
};

export default Terminal;
