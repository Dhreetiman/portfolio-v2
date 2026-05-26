import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';

export default {
    darkMode: ['class'],
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: {
                    DEFAULT: 'hsl(var(--background))',
                    light: 'hsl(var(--background-light))',
                },
                foreground: 'hsl(var(--foreground))',
                code: {
                    key: 'hsl(var(--code-key))',
                    string: 'hsl(var(--code-string))',
                    number: 'hsl(var(--code-number))',
                    comment: 'hsl(var(--code-comment))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            fontFamily: {
                anton: ['var(--font-anton)'],
                'roboto-flex': ['var(--font-roboto-flex)'],
                mono: ['var(--font-mono)'],
            },
            padding: {
                section: '250px',
            },
            container: {
                center: true,
                padding: '1rem',
                screens: {
                    xl: '1148px',
                    '2xl': '1148px',
                },
            },
            transitionDuration: {
                '7000': '7s',
            },
            screens: {
                xs: '420px',
            },
            keyframes: {
                scan: {
                    '0%': { transform: 'translateY(-100%)', opacity: '0' },
                    '10%': { opacity: '0.4' },
                    '90%': { opacity: '0.4' },
                    '100%': {
                        transform: 'translateY(100vh)',
                        opacity: '0',
                    },
                },
                blink: {
                    '0%, 49%': { opacity: '1' },
                    '50%, 100%': { opacity: '0' },
                },
                'pulse-dot': {
                    '0%, 100%': { opacity: '0.15', transform: 'scale(1)' },
                    '50%': { opacity: '0.6', transform: 'scale(1.6)' },
                },
            },
            animation: {
                scan: 'scan 25s linear infinite',
                blink: 'blink 1.05s steps(1) infinite',
                'pulse-dot': 'pulse-dot 4s ease-in-out infinite',
            },
        },
    },
    plugins: [tailwindAnimate],
} satisfies Config;
