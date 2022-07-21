FROM node:16-buster-slim AS n


WORKDIR /app

COPY server.js /app
COPY package.json /app

RUN npm install

CMD ["node", "server.js"]
