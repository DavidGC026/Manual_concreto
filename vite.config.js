import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    allowedHosts: [
      'grabador.imcyc.com',
    ],
  },
  plugins: [react()],
  build: {
    assetsInlineLimit: 4096, // 4KB límite para inline assets
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (/\.(png|jpe?g|svg|gif|webp)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.css$/.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  resolve: {
    alias: {
      '@img': '/src/Imagenes' // Alias para importar imágenes
    }
  },
  publicDir: 'public', // Asegurar que apunta a tu directorio público
  base: './' // Configuración importante para rutas relativas
});