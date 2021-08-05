FROM node:lts

RUN mkdir -p /app

WORKDIR /app

ADD package.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "index.js" ]
