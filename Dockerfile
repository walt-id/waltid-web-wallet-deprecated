FROM node:19 as buildstage
COPY ./package.json /package.json
RUN yarn install
COPY . /
RUN yarn generate
FROM nginx:1.23-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --chown=nginx --from=buildstage /dist/ /usr/share/nginx/html/
RUN find /usr/share/nginx/html -type d -exec chmod 755 {} +
