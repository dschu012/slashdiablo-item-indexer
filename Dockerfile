FROM node:12-alpine

WORKDIR /usr/src/app

RUN apk update && \
    apk upgrade && \ 
    apk add --no-cache --virtual install \
        python \
        make \
        g++ \
        git

COPY package*.json ./

RUN npm install --unsafe-perm && \ 
    apk del install

COPY . .

RUN npm prune --production

CMD ["node", "./bin/www"]