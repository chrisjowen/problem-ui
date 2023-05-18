FROM node:14-alpine
ARG build_command=build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run $build_command

EXPOSE 8080
CMD [ "node", "server.js" ]