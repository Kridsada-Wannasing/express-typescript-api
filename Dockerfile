FROM node:lts-alpine3.12 AS development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json ./

RUN yarn install

COPY . .

EXPOSE 3000
CMD [ "yarn", "serve" ]