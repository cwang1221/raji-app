FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY public public/
COPY craco.config.js ./
COPY src src/
ENV REACT_APP_SERVICE_URL http://39.103.224.134:8080
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]