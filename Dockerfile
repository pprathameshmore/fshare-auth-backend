FROM node:12

WORKDIR /ust/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

CMD ["npm", "start"]