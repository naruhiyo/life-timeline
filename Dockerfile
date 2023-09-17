FROM node:18.16-alpine

WORKDIR /app/

COPY ./package.json ./
RUN npm install
