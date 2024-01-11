FROM node:18.19-alpine

WORKDIR /app/
COPY ./package.json ./package-lock.json ./pnpm-lock.yaml ./.npmrc ./
RUN yarn global add pnpm
RUN pnpm install
