FROM node:18.16-alpine

WORKDIR /app/
COPY ./package.json ./package-lock.json ./pnpm-lock.yaml ./.npmrc ./
RUN yarn global add pnpm
RUN pnpm install
