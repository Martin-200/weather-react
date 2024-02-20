// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
    base: isProduction ? '/weather-react/' : '/',
    plugins: [
        svgr({
            include: "**/*.svg?react",
        }),
        react(),
    ],
    build: {
        assetsDir: 'assets',
        outDir: 'dist',
    }
})
