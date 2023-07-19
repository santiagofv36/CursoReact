FROM node:17.7.1-alpine3.15 AS build

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run"]