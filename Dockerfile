FROM node:latest
LABEL author = "James Ambrose"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install discord.js@12.2.0
COPY 2ndmrb.js ./
CMD [ "node", "2ndmrb.js" ]