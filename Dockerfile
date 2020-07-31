FROM node:12-alpine

WORKDIR /testtask

COPY configs ./configs
COPY package*.json ./
COPY dist ./dist

RUN npm install --only=prod

EXPOSE 3000

CMD [ "node", "dist/main.js" ]