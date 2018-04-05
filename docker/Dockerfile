FROM nginx:1.12-alpine

ADD hydro-serving-ui/ /var/www/html/
ADD nginx/bin/ /usr/sbin/
RUN configure-nginx.sh

ADD nginx/config /etc/nginx/sites-templates

ENV MANAGER_HOST=localhost
ENV SONAR_HOST=localhost

LABEL DEPLOYMENT_TYPE=APP
LABEL SERVICE_ID=-22
LABEL SERVICE_NAME=manager-ui
LABEL HS_SERVICE_MARKER=HS_SERVICE_MARKER

EXPOSE 9091
WORKDIR /etc/nginx

ENTRYPOINT ["entrypoint.sh"]
CMD ["nginx"]
