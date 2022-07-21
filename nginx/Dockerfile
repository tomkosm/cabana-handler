FROM nginx:1.21

COPY config.js.template /etc/nginx/templates/config.js.template
COPY nginx.conf /etc/nginx/conf.d/default.conf

ENV NGINX_ENVSUBST_OUTPUT_DIR /usr/share/nginx/html

