FROM nginx:1.12-alpine

ADD hydro-serving-ui/ /var/www/html/
ADD nginx/bin/ /usr/sbin/
RUN configure-nginx.sh

ADD nginx/config /etc/nginx/sites-templates

ENV MANAGER_HOST=localhost
ENV SONAR_HOST=localhost

EXPOSE 80
WORKDIR /etc/nginx

ENTRYPOINT ["entrypoint.sh"]
CMD ["nginx"]
