import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'Qrcodegendrator02', // Important: Add your repo name here
  plugins: [react()],
})
