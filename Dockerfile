FROM node:20-alpine as builder
WORKDIR /app
COPY package*.json .
RUN yarn install

COPY . .
RUN yarn build

FROM node:20-alpine
COPY --from=builder /app/.next/.* /app
WORKDIR /app
EXPOSE 3000
CMD yarn start