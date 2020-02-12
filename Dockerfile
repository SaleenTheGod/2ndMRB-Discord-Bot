FROM node:latest
LABEL author = "James Ambrose"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install discord.js
COPY 2ndmrb.js ./
CMD [ "node", "2ndmrb.js" ]