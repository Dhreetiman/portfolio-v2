import { GENERAL_INFO } from '@/lib/data';
import React from 'react';

const StickyEmail = () => {
    return (
        <div className="max-xl:hidden fixed bottom-32 left-0 block">
            <a
                href={`mailto:${GENERAL_INFO.email}`}
                className="group px-3 font-mono text-xs text-muted-foreground tracking-[1px] transition-colors hover:text-primary"
                style={{
                    textOrientation: 'mixed',
                    writingMode: 'vertical-rl',
                }}
            >
                <span className="text-primary">&gt;</span> {GENERAL_INFO.email}
            </a>
        </div>
    );
};

export default StickyEmail;
