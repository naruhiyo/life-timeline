# FROM cypress/included:cypress-13.7.0-node-20.11.0-chrome-121.0.6167.184-1-ff-123.0-edge-121.0.2277.128-1 as builder
FROM cypress/included:cypress-13.6.3-node-20.10.0-chrome-121.0.6167.85-1-ff-118.0.2-edge-118.0.2088.46-1 as builder

WORKDIR /app

# enable japanese font
RUN apt update && \
    apt install -y wget unzip && \
    wget -O NotSansJP.zip https://fonts.google.com/download?family=Noto+Sans+JP && \
    mkdir -p /usr/share/fonts/truetype/NotSansJP && \
    unzip NotSansJP.zip -d ./NotSansJP


# production
FROM cypress/factory:3.5.1

ARG CHROME_VERSION='121.0.6167.184-1'
WORKDIR /home/node/app

COPY --chown=node:node ./cypress ./cypress.config.ts  ./package.json ./pnpm-lock.yaml ./tsconfig.json /home/node/app/
COPY --from=builder --chown=node:node /app/NotSansJP /usr/share/fonts/truetype/NotSansJP
COPY --from=builder --chown=node:node /root/.cache/Cypress /home/node/.cache
RUN npm i -g pnpm &&\
    pnpm install --dev --frozen-lockfile &&\
    pnpm add cypress 
USER node
ENV CYPRESS_CACHE_FOLDER=/home/node/.cache
CMD ["pnpm", "exec", "cypress", "run", "cypress/e2e/page.cy.ts"]

