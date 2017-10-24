#!/bin/sh

set -eu

conf_file='/etc/nginx/nginx.conf'

# Stay alive to allow Docker to manage it
echo "daemon off;" >> "${conf_file}"

