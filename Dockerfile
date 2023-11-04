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
RUN sed -i 's|index  index.html index.htm;|index  index.html index.htm;\n        try_files \$uri \$uri/ /index.html;\n        error_page 500 502 503 504  /50x.html;|g' /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
