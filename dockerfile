FROM node:16.19.0 as build

ENV PUBLIC_PROBLEM_API_PATH=$PUBLIC_PROBLEM_API_PATH
ENV PUBLIC_PROBLEM_SOCKET_PATH=$PUBLIC_PROBLEM_SOCKET_PATH
ENV PUBLIC_IMG_CDN_BASE=$PUBLIC_IMG_CDN_BASE

# install dependencies
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Copy all local files into the image.
COPY . .

RUN npm run build


EXPOSE 3000
CMD ["node", "build/index.js"]

