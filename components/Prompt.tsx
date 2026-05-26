import { cn } from '@/lib/utils';

interface Props {
    path?: string;
    command?: string;
    className?: string;
    showCaret?: boolean;
}

const Prompt = ({
    path = '~',
    command,
    className,
    showCaret = false,
}: Props) => {
    return (
        <span
            className={cn(
                'font-mono text-sm leading-none inline-flex items-baseline gap-1.5',
                className,
            )}
        >
            <span className="text-code-key">{path}</span>
            <span className="text-primary">$</span>
            {command && (
                <span className="text-foreground">{command}</span>
            )}
            {showCaret && (
                <span className="inline-block w-2 h-3.5 bg-primary translate-y-[1px] animate-blink" />
            )}
        </span>
    );
};

export default Prompt;
