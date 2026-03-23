import { defineConfig } from 'vite';

// https://vitejs.dev/config
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: [
            {
                find: '@',
                replacement: resolve(__dirname, './src')
            }
        ],
    },
});
