FROM node:20 AS builder
WORKDIR /app
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env .env
EXPOSE 3000
ENV PORT=3000
CMD ["node", "dist/index.js"]
