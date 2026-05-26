import { GENERAL_INFO } from '@/lib/data';
import Prompt from './Prompt';

const Footer = () => {
    return (
        <footer className="pb-10 pt-20" id="contact">
            <div className="container">
                <div className="text-center mb-10">
                    <Prompt path="~/contact" command="echo $EMAIL" showCaret className="text-base" />
                </div>

                <p className="text-center text-lg text-muted-foreground mb-5">
                    Have a project in mind?
                </p>
                <div className="text-center">
                    <a
                        href={`mailto:${GENERAL_INFO.email}`}
                        className="text-3xl sm:text-4xl font-anton inline-block mt-2 mb-10 hover:underline hover:text-primary transition-colors"
                    >
                        {GENERAL_INFO.email}
                    </a>
                </div>

                <p className="text-center font-mono text-xs text-muted-foreground">
                    <a
                        href="https://github.com/Dhreetiman/portfolio-v2"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover:text-primary transition-colors"
                    >
                        {'// designed and built by Dhreetiman Prasad'}
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
