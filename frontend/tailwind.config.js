/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary-color)',
                background: {
                    primary: 'var(--background-primary)',
                    secondary: 'var(--background-secondary)',
                },
                border: 'var(--border)',
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
