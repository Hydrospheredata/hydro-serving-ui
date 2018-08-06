FROM nginx:1.15-alpine

ADD nginx/config/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY hydro-serving-ui /usr/share/nginx/html

ENV MANAGER_HOST=localhost
ENV SONAR_HOST=localhost
ENV ELASTIC_HOST=localhost
ENV INFLUX_HOST=localhost

LABEL DEPLOYMENT_TYPE=APP
LABEL SERVICE_ID=-22
LABEL SERVICE_NAME=manager-ui
LABEL HS_SERVICE_MARKER=HS_SERVICE_MARKER
LABEL RUNTIME_ID=-22

EXPOSE 9091

CMD envsubst '${MANAGER_HOST} ${SONAR_HOST} ${ELASTIC_HOST} ${INFLUX_HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
 && cat /etc/nginx/conf.d/default.conf \
 && exec nginx -g 'daemon off;'
