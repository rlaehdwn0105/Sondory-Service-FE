FROM node:20-alpine as builder
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build

# 2단계: Nginx로 서빙
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

