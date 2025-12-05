import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',            // Permite conexiones externas
    port: 3000,                 // Puerto 3000
    strictPort: true,           // Usa exactamente el puerto 3000
    cors: true,                 // Permite peticiones desde otros orígenes
    origin: 'http://ec2-174-129-182-100.compute-1.amazonaws.com:3000', // URL pública de tu instancia
  },
})
