FROM node:16-bullseye-slim

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-locl.json*", "./"]

RUN npm install --production

COPY . .

CMD ["node", "server1.js"]
