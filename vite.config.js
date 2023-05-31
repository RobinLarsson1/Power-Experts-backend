import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": "http://localhost:9111/"
        }
    }
})
// Noob take på hur proxy fungerar, server och proxy måste anges som en outlet för backend datan.