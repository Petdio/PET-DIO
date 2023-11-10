FROM node:20.8.1 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . ./
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start"]