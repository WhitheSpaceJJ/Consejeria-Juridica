# Usa una imagen oficial de Nginx como base
FROM nginx:latest

# Copia el archivo de configuración personalizado de Nginx al contenedor
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos estáticos de la APP WEB Asesoria al directorio html del primer servidor
COPY ./dist /usr/share/nginx/html_Asesoria


# Expone los puertos definidos en tu configuración
EXPOSE 3030

# Inicia Nginx cuando se lance el contenedor
CMD ["nginx", "-g", "daemon off;"]