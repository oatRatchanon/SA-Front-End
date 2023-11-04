FROM node:alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY public ./public
COPY src ./src
COPY index.html tsconfig.json tsconfig.node.json vite.config.ts ./
ARG VITE_GATEWAY_URL
ARG VITE_DOMAIN
RUN npm run build

FROM nginxinc/nginx-unprivileged:alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
