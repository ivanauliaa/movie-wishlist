FROM node:lts-alpine3.14

WORKDIR /app

COPY ./ ./

RUN npm install

CMD ["npm", "run", "start"]