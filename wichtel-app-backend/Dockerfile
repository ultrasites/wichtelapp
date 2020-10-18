FROM node:14.14.0-alpine AS builder
WORKDIR /app
COPY ./src ./src
COPY ./.env ./
COPY ./package.json ./
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
RUN npm install
RUN npm run build


FROM node:14.14.0-alpine
WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]
