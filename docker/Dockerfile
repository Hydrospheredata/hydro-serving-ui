FROM nginx:1.15-alpine

ADD nginx/config/default.conf.template /etc/nginx/conf.d/default.conf.template
COPY hydro-serving-ui /usr/share/nginx/html

ENV MANAGER_HOST=localhost
ENV GATEWAY_HOST=localhost
ENV SONAR_HOST=localhost
ENV ELASTIC_HOST=localhost
ENV INFLUX_HOST=localhost
ENV REQSTORE_HOST=localhost

EXPOSE 80

CMD envsubst '${MANAGER_HOST} ${GATEWAY_HOST} ${SONAR_HOST} ${ELASTIC_HOST} ${INFLUX_HOST} ${REQSTORE_HOST}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf \
 && cat /etc/nginx/conf.d/default.conf \
 && exec nginx -g 'daemon off;'
