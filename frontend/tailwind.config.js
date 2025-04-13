/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'var(--primary-color)',
                    hover: 'var(--primary-color-hover)',
                },
                background: {
                    primary: 'var(--background-primary)',
                    secondary: 'var(--background-secondary)',
                },
                border: 'var(--border-color)',
                text: {
                    primary: 'var(--text-primary)',
                    secondary: 'var(--text-secondary)',
                },
                input: {
                    background: 'var(--input-background)',
                },
                shadowbox: 'var(--card-shadow)',
                status: {
                    pending: 'var(--status-pending)',
                    progress: 'var(--status-progress)',
                    completed: 'var(--status-completed)',
                },
            },
        },
    },
    plugins: [],
};
