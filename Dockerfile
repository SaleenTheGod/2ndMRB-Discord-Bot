FROM node:12.16-stretch
WORKDIR /usr/src/app
COPY package*.json ./
COPY config-2ndmrb.json ./
RUN npm install discord.js@12.2.0
COPY 2ndmrb.js ./
CMD [ "node", "2ndmrb.js" ]