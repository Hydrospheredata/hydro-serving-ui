#!/bin/sh

set -eu

sed -i "s/MANAGER_HOST/$MANAGER_HOST/g" /etc/nginx/sites-templates/manager.conf.tmpl
sed -i "s/SONAR_HOST/$SONAR_HOST/g" /etc/nginx/sites-templates/manager.conf.tmpl

rm /etc/nginx/conf.d/default.conf
cp /etc/nginx/sites-templates/manager.conf.tmpl /etc/nginx/conf.d/manager.conf
exec $@
