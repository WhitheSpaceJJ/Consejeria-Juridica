// Generar la configuración de Vite
const viteConfig = {
  server: {
    host: true, // Asigna automáticamente un host disponible
    port: 3030, // Puerto en el que se ejecutará el servidor de desarrollo
    open: true, // Abre automáticamente el navegador al iniciar el servidor
  },
  build: {
    outDir: 'dist', // Directorio de salida para los archivos de construcción
    sourcemap: true, // Genera mapas de origen para ayudar en la depuración
    minify: 'terser', // Minificar el código utilizando Terser (o 'esbuild' para una minificación más rápida)
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'], // Especifica el objetivo de compatibilidad del navegador
    modulePreload: {
      polyfill: true, // Inyecta automáticamente un polyfill de precarga del módulo
      resolveDependencies: (filename, deps, { importer }) => {
        // Función opcional para controlar la lista de dependencias y sus rutas de precarga
        // Aquí puedes personalizar la lista de dependencias si es necesario
        return deps;
      },
    },
    // Otras opciones de construcción...
  },
  // Otras opciones de configuración...
};

// Exportar la configuración de Vite
module.exports = viteConfig;