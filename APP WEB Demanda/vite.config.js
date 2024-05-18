import Inspect from 'vite-plugin-inspect'
import { resolve } from 'path'

export default {
  plugins: [Inspect()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        consultaproceso: resolve(__dirname, 'consultaProceso.html'),
        escolaridades: resolve(__dirname, 'escolaridad.html'),
        etnia: resolve(__dirname, 'etnia.html'),
        juzgado: resolve(__dirname, 'juzgado.html'),
        ocupacion : resolve(__dirname, 'ocupacion.html'),
        proceso: resolve(__dirname, 'proceso.html'),
        recuperacion: resolve(__dirname, 'recuperacion.html'),
        seguimiento: resolve(__dirname, 'seguimiento.html'),
      }
    }
  }
}
