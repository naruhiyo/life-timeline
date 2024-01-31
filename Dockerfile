FROM node:20.10-alpine

WORKDIR /app/
COPY ./package.json ./package-lock.json ./pnpm-lock.yaml ./.npmrc ./
RUN yarn global add pnpm
RUN pnpm install
