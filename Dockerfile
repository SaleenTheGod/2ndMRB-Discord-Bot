FROM node:10.20.1-jessie
LABEL author = "James Ambrose"
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install discord.js
RUN npm install giphy-api
COPY 2ndmrb.js ./
CMD [ "node", "2ndmrb.js" ]