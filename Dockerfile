FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY public public/
COPY src src/
ENV MASTER_KEY xxx
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]