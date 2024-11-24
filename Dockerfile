# Step 1: Build React App
FROM node:18-alpine as buid
WORKDIR /app
COPY package.json .
RUN npm install
COPY  . .
RUN npm run build 

#  Step 2: Server with Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=buid /app/dist .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]