import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import glob from 'glob';

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Mapear cada archivo HTML en la carpeta 'APP Web Asesoria' como un punto de entrada
        ...getHtmlEntries('APP Web Asesoria'),
      },
    },
  },
});

function getHtmlEntries(folder) {
  const entries = {};
  const htmlFiles = glob.sync(`${folder}/**/*.html`);
  htmlFiles.forEach((file) => {
    const name = path.basename(file, '.html');
    entries[name] = path.resolve(__dirname, file);
  });
  return entries;
}