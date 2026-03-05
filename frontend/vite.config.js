import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    const backendPort = env.VITE_BACKEND_PORT || '5001';

    return {
        plugins: [react(), tailwindcss()],
        define: {
            __DEFINES__: '{}',
        },
        server: {
            port: 5173,
            proxy: {
                '/api': {
                    target: `http://localhost:${backendPort}`,
                    changeOrigin: true,
                },
            },
        },
    };
});
