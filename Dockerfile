FROM node:20

WORKDIR /wea-app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]

