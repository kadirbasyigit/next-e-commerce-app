FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.local .env.local

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
