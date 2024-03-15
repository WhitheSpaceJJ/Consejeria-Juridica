FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3028

CMD ["npm", "run", "dev"]

