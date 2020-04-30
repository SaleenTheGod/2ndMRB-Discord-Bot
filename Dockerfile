FROM node:12.16-stretch
WORKDIR /usr/src/app
RUN mkdir -p /usr/src/app/2ndmrb-bot-logs/
COPY package*.json ./
COPY config-2ndmrb.json ./
RUN npm install discord.js@12.2.0
COPY 2ndmrb.js ./
CMD [ "node", "2ndmrb.js" ]