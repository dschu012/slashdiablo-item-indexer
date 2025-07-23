FROM node:14-alpine

WORKDIR /usr/src/app

# Use python3 instead of python
RUN apk update && \
    apk upgrade && \
    apk add --no-cache --virtual .build-deps \
        python3 \
        make \
        g++ \
        git

COPY package*.json ./

RUN npm install --unsafe-perm && \
    apk del .build-deps

COPY . .

RUN npm prune --production

CMD ["node", "./bin/www"]
