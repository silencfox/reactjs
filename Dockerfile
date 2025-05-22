FROM node:22 AS build

WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

FROM node:22

RUN npm install -g serve
WORKDIR /app
COPY --from=build /app/build .
EXPOSE 8001
CMD ["serve", "-s", ".", "-l", "8001"]