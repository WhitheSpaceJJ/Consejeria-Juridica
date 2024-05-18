import Inspect from 'vite-plugin-inspect'
import { resolve } from 'path'

export default {
  plugins: [Inspect()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        asesorias: resolve(__dirname, 'asesoria.html'),
        asesoriaspre: resolve(__dirname, 'asesoria-pre.html') ,
        asesoriascontinuar: resolve(__dirname, 'asesorias-continuar.html'),
        asesoriaturnar: resolve(__dirname, 'asesorias-turnar.html'),
        busquedaasesoria: resolve(__dirname, 'busqueda-asesoria.html'),
        busquedaturnar: resolve(__dirname, 'busqueda-turnar.html'),
        catalogos: resolve(__dirname, 'catalogos.html'),
        consulta: resolve(__dirname, 'consulta.html'),
        continuarasesoria: resolve(__dirname, 'continuar-asesoria.html'),
        empleados: resolve(__dirname, 'empleados.html'),
        estadosciviles: resolve(__dirname, 'estadosCiviles.html'),
        generos: resolve(__dirname, 'generos.html'),
        juicios: resolve(__dirname, 'jucios.html'),
        motivos: resolve(__dirname, 'motivos.html'),
        recuperacion: resolve(__dirname, 'recuperacion.html'),
        turnar: resolve(__dirname, 'turnar.html'),
        usuarios: resolve(__dirname, 'usuarios.html'),
      }
    }
  }
}
