FROM node:20-alpine

# update packages
# RUN apk update

# create root application folder
WORKDIR /home/workdir/app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm install -g ts-node
RUN npm install -g nodemon

# copy source code to /app/src folder
COPY . .

# check files list
RUN ls -a

# RUN npm run dev

EXPOSE 5000

# CMD [ "node", "./dist/main.js" ]
CMD [ "npm", "run", "dev" ]
