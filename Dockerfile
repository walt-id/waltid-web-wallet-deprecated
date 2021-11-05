FROM node:14 as buildstage
COPY . /
RUN yarn install && yarn generate
FROM nginx:1.15.10-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx --from=buildstage /dist/ /usr/share/nginx/html/
RUN find /usr/share/nginx/html -type d -exec chmod 755 {} +
