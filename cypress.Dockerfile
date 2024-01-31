FROM cypress/included:cypress-13.6.3-node-20.10.0-chrome-121.0.6167.85-1-ff-118.0.2-edge-118.0.2088.46-1

WORKDIR /app

# enable japanese font
RUN apt update && \
    apt install -y wget unzip && \
    wget -O NotSansJP.zip https://fonts.google.com/download?family=Noto+Sans+JP && \
    mkdir -p /usr/share/fonts/truetype/NotSansJP && \
    unzip NotSansJP.zip -d /usr/share/fonts/truetype/
