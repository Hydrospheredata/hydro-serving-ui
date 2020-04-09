FROM openresty/openresty:latest

RUN  apt update && apt install -y gettext

ENV OSS=true;

ENV MANAGER_HOST=localhost
ENV GATEWAY_HOST=localhost
ENV MONITORING_HOST=localhost
ENV ROOTCAUSE_HOST=localhost
ENV PROMETHEUS_AM_HOST=localhost
ENV VISUALIZATION_HOST=localhost

ENV MANAGER_HTTP_PORT=8080
ENV MANAGER_GRPC_PORT=9090
ENV GATEWAY_HTTP_PORT=8080
ENV GATEWAY_GRPC_PORT=9090
ENV MONITORING_HTTP_PORT=8080
ENV MONITORING_GRPC_PORT=9090
ENV ROOTCAUSE_HTTP_PORT=5005
ENV PROMETHEUS_AM_PORT=9093
ENV VISUALIZATION_HTTP_PORT=8080

EXPOSE 80

COPY nginx/conf.d /etc/nginx/conf.d/
COPY nginx/config/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY hydro-serving-ui /usr/share/nginx/html

CMD envsubst '${GATEWAY_HOST} ${GATEWAY_GRPC_PORT}' < /etc/nginx/conf.d/grpc/include.gateway.template > /etc/nginx/conf.d/grpc/include.gateway \
  && envsubst '${MANAGER_HOST} ${MANAGER_GRPC_PORT}' < /etc/nginx/conf.d/grpc/include.manager.template > /etc/nginx/conf.d/grpc/include.manager \
  && envsubst '${MONITORING_HOST} ${MONITORING_GRPC_PORT}' < /etc/nginx/conf.d/grpc/include.monitoring.template > /etc/nginx/conf.d/grpc/include.monitoring \
#
  && envsubst '${PROMETHEUS_AM_HOST} ${PROMETHEUS_AM_PORT}' < /etc/nginx/conf.d/http/include.alerts.template > /etc/nginx/conf.d/http/include.alerts \
  && envsubst '${GATEWAY_HOST} ${GATEWAY_HTTP_PORT}' < /etc/nginx/conf.d/http/include.gateway.template > /etc/nginx/conf.d/http/include.gateway \
  && envsubst '${MANAGER_HOST} ${MANAGER_HTTP_PORT}' < /etc/nginx/conf.d/http/include.manager.template > /etc/nginx/conf.d/http/include.manager \
  && envsubst '${MONITORING_HOST} ${MONITORING_HTTP_PORT}' < /etc/nginx/conf.d/http/include.monitoring.template > /etc/nginx/conf.d/http/include.monitoring \
  && envsubst '${ROOTCAUSE_HOST} ${ROOTCAUSE_HTTP_PORT}' < /etc/nginx/conf.d/http/include.rootcause.template > /etc/nginx/conf.d/http/include.rootcause \
  && envsubst '${VISUALIZATION_HOST} ${VISUALIZATION_HTTP_PORT}' < /etc/nginx/conf.d/http/include.visualization.template > /etc/nginx/conf.d/http/include.visualization \
#
  && exec /usr/bin/openresty -g 'daemon off;'
