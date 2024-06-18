const controlEstado = require('./estado_procesalDAO');

controlEstado.obtenerEstadoProcesalPorProcesoJudicial(1, false, 1).then((result) => {
    console.log(result);
    }
).catch((error) => {
        console.log(error);
    }
);
