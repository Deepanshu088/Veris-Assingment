FROM node:20-alpine as builder

WORKDIR /home/workdir/app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
COPY . .
RUN npm run build


FROM node:20-alpine
WORKDIR /home/workdir/app

COPY package*.json ./

RUN npm install

COPY --from=builder /home/workdir/app/dist ./dist

EXPOSE 5000

# CMD [ "npm", "run", "dev" ]
CMD [ "node", "./dist/app.js" ]
