FROM node:24 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2단계: 배포용 이미지 (Nginx)
FROM nginx:alpine

# build된 정적 파일을 nginx로 복사
COPY --from=build /app/build /usr/share/nginx/html

# React는 기본적으로 3000포트에서 개발, Nginx는 80포트로 서비스
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]