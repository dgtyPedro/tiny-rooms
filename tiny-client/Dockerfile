FROM node:20 AS builder
WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:stable-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
