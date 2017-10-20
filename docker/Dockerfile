FROM ubuntu

RUN apt-get update && apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:nginx/stable
RUN apt-get update
RUN apt-get install -y nginx

ADD hydro-serving-ui/ /var/www/html/
ADD nginx/bin/ /usr/sbin/
RUN configure-nginx.sh

ADD nginx/config /etc/nginx/sites-templates
EXPOSE 80
WORKDIR /etc/nginx

ENTRYPOINT ["entrypoint.sh"]
CMD ["nginx"]
