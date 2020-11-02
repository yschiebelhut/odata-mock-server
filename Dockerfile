FROM node:lts-alpine

RUN apk upgrade --update-cache --available && \
    apk add python && \
    apk add make && \
    apk add g++ && \
    rm -rf /var/cache/apk/*

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "mockserver.js" ]
