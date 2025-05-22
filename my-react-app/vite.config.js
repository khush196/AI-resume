import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    allowedHosts: [
        "01b2-2405-201-5c08-7009-c27-3ace-39fc-f316.ngrok-free.app"
    ]
  }
});
