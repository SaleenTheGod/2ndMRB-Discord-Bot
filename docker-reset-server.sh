docker rm 2ndmrbbot --force
docker build -t 2ndmrbbot .
docker run -d --name 2ndmrbbot -v /var/log/2ndmrb-discord-bot/:/usr/src/app/2ndmrb-bot-logs/ --restart unless-stopped 2ndmrbbot