# syntax=docker/dockerfile:1
FROM node:14.16.1 AS build

WORKDIR /opt/ng

RUN apt-get update && apt-get install -y --no-install-recommends git && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build-prod

ARG GIT_HEAD_COMMIT
ARG GIT_CURRENT_BRANCH
RUN if [ -z "$GIT_HEAD_COMMIT" ] ; then \
    printf '{"name": "ui", "version":"%s", "gitHeadCommit":"%s","gitCurrentBranch":"%s", "nodeVersion":"%s"}\n' "$(cat version)" "$(git rev-parse HEAD)" "$(git rev-parse --abbrev-ref HEAD)" "$(node --version)" >> buildinfo.json ; else \
    printf '{"name": "ui", "version":"%s", "gitHeadCommit":"%s","gitCurrentBranch":"%s", "nodeVersion":"%s"}\n' "$(cat version)" "$GIT_HEAD_COMMIT" "$GIT_CURRENT_BRANCH" "$(node --version)" >> buildinfo.json ; \
    fi

FROM openresty/openresty:1.19.9.1-0-amzn2
LABEL maintainer="support@hydrosphere.io"

RUN yum update -y && yum upgrade -y && yum clean all

RUN useradd -u 42069 --create-home --shell /bin/bash app && \
    chown -R app:app /usr/local/openresty/

USER app

ENV OSS=true;

ENV MANAGER_HOST=localhost
ENV GATEWAY_HOST=localhost
ENV MONITORING_HOST=localhost
ENV ROOTCAUSE_HOST=localhost
ENV PROMETHEUS_AM_HOST=localhost
ENV VISUALIZATION_HOST=localhost
ENV STAT_HOST=localhost
ENV AUTO_OD_HOST=localhost

ENV MANAGER_HTTP_PORT=8080
ENV MANAGER_GRPC_PORT=9090
ENV GATEWAY_HTTP_PORT=8080
ENV GATEWAY_GRPC_PORT=9090
ENV MONITORING_HTTP_PORT=8080
ENV MONITORING_GRPC_PORT=9090
ENV ROOTCAUSE_HTTP_PORT=5005
ENV PROMETHEUS_AM_PORT=9093
ENV VISUALIZATION_HTTP_PORT=5000
ENV VISUALIZATION_GRPC_PORT=5003
ENV STAT_PORT=5000
ENV AUTO_OD_GRPC_PORT=5000

ENV INGRESS_PATH=/

EXPOSE 8080

COPY --chown=app:app docker/nginx/conf.d /etc/nginx/conf.d/
COPY --chown=app:app docker/nginx/config/nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY --chown=app:app --from=build /opt/ng/hydro-serving-ui /usr/share/nginx/html
COPY --chown=app:app --from=build /opt/ng/buildinfo.json /usr/share/nginx/html/assets/buildinfo.json

CMD envsubst '${GATEWAY_HOST} ${GATEWAY_GRPC_PORT}' < /etc/nginx/conf.d/grpc/include.gateway.template > /etc/nginx/conf.d/grpc/include.gateway \
  && envsubst '${MANAGER_HOST} ${MANAGER_GRPC_PORT}' < /etc/nginx/conf.d/grpc/include.manager.template > /etc/nginx/conf.d/grpc/include.manager \
  && envsubst '${MONITORING_HOST} ${MONITORING_GRPC_PORT}' < /etc/nginx/conf.d/grpc/include.monitoring.template > /etc/nginx/conf.d/grpc/include.monitoring \
  && envsubst '${AUTO_OD_HOST} ${AUTO_OD_GRPC_PORT}' < /etc/nginx/conf.d/grpc/include.auto_od.template > /etc/nginx/conf.d/grpc/include.auto_od \
  && envsubst '${VISUALIZATION_HOST} ${VISUALIZATION_GRPC_PORT}' < /etc/nginx/conf.d/grpc/include.visualization.template > /etc/nginx/conf.d/grpc/include.visualization \
#
  && envsubst '${PROMETHEUS_AM_HOST} ${PROMETHEUS_AM_PORT}' < /etc/nginx/conf.d/http/include.alerts.template > /etc/nginx/conf.d/http/include.alerts \
  && envsubst '${GATEWAY_HOST} ${GATEWAY_HTTP_PORT}' < /etc/nginx/conf.d/http/include.gateway.template > /etc/nginx/conf.d/http/include.gateway \
  && envsubst '${MANAGER_HOST} ${MANAGER_HTTP_PORT}' < /etc/nginx/conf.d/http/include.manager.template > /etc/nginx/conf.d/http/include.manager \
  && envsubst '${MONITORING_HOST} ${MONITORING_HTTP_PORT}' < /etc/nginx/conf.d/http/include.monitoring.template > /etc/nginx/conf.d/http/include.monitoring \
  && envsubst '${ROOTCAUSE_HOST} ${ROOTCAUSE_HTTP_PORT}' < /etc/nginx/conf.d/http/include.rootcause.template > /etc/nginx/conf.d/http/include.rootcause \
  && envsubst '${VISUALIZATION_HOST} ${VISUALIZATION_HTTP_PORT}' < /etc/nginx/conf.d/http/include.visualization.template > /etc/nginx/conf.d/http/include.visualization \
  && envsubst '${STAT_HOST} ${STAT_PORT}' < /etc/nginx/conf.d/http/include.stat.template > /etc/nginx/conf.d/http/include.stat \
#
  && envsubst '${INGRESS_PATH}' < /etc/nginx/conf.d/http/include.root.template > /etc/nginx/conf.d/http/include.root \
#
  && exec /usr/local/openresty/bin/openresty -g 'daemon off;'
