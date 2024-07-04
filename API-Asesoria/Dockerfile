# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el package.json y el package-lock.json
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de la aplicación al contenedor
COPY . .

# Exponer el puerto en el que corre la aplicación
EXPOSE 3009

# Comando para ejecutar la aplicación
CMD ["node", "app.js"]
