import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: process.env.GITHUB_PAGES ? "sample" : "./",
    plugins: [react(), splitVendorChunkPlugin()],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: 'assets/[name]-[hash].js',
                chunkFileNames: 'assets/[name].js',
            },
        },
        sourcemap: false,
    },
})
