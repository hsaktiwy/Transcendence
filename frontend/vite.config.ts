import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Set to true to listen on all addresses
    port: 5173,  // Set the port you want to use (optional)
  }
})
