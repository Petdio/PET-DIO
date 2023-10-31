# build stage
FROM node:20.8.1 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install
COPY . ./
RUN pnpm run build

# run stage
# nginx의 안정 버전의 Alpine Linux 기반 이미지를 사용합니다.
FROM nginx:stable-alpine
# 이 폴더는 일반적으로 React 빌드 결과물을 포함합니다.
COPY --from=build /app/.next /usr/share/nginx/html
# 기존의 nginx 설정 파일을 삭제합니다.
RUN rm /etc/nginx/conf.d/default.conf
# 호스트의 'front.conf' 파일을 nginx 설정으로 복사합니다.
# 이 파일은 nginx가 어떻게 트래픽을 라우팅할지 정의합니다.
COPY ./nginx.conf /etc/nginx/conf.d
# 컨테이너가 3000 포트에서 수신하도록 설정합니다.
EXPOSE 3000
# nginx를 실행시킵니다. 'daemon off;'은 백그라운드에서 실행되지 않도록 합니다.
CMD ["nginx", "-g", "daemon off;"]