FROM node:20.10-alpine

WORKDIR /home/node
COPY --chown=node:node . /home/node/
RUN yarn global add pnpm &&\
  pnpm install --frozen-lockfile

USER node
EXPOSE 3000
CMD ["pnpm", "dev"]
