FROM node:lts

RUN mkdir -p /app

WORKDIR /app

ADD package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "server.js" ]
