FROM cypress/included:cypress-13.0.0-node-18.15.0-chrome-106.0.5249.61-1-ff-99.0.1-edge-114.0.1823.51-1

WORKDIR /app

# enable japanese font
RUN apt update && \
    apt install -y wget unzip && \
    wget -O NotSansJP.zip https://fonts.google.com/download?family=Noto+Sans+JP && \
    mkdir -p /usr/share/fonts/truetype/NotSansJP && \
    unzip NotSansJP.zip -d /usr/share/fonts/truetype/
