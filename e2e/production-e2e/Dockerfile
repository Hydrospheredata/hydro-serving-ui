# syntax=docker/dockerfile:1

FROM nikolaik/python-nodejs:python3.7-nodejs12-slim as base

# 1. Install WebKit dependencies
RUN apt-get update && apt-get install -y libwoff1 \
                       libopus0 \
                       libwebp6 \
                       libwebpdemux2 \
                       libenchant1c2a \
                       libgudev-1.0-0 \
                       libsecret-1-0 \
                       libhyphen0 \
                       libgdk-pixbuf2.0-0 \
                       libegl1 \
                       libnotify4 \
                       libxslt1.1 \
                       libevent-2.1-6 \
                       libgles2 \
                       libvpx5 

# 2. Install Chromium dependencies
RUN apt-get install -y libnss3 \
                       libxss1 \
                       libasound2

# 3. Install Firefox dependencies
RUN apt-get install -y libdbus-glib-1-2

# 4. Add user so we don't need --no-sandbox in Chromium
# RUN groupadd -r pwuser && useradd -r -g pwuser -G audio,video pwuser \
#     && mkdir -p /home/pwuser/Downloads \
#     && chown -R pwuser:pwuser /home/pwuser

# 5. (Optional) Install XVFB if there's a need to run browsers in headful mode
RUN apt-get install -y xvfb

# Remove package manager cache
RUN rm -rf /var/lib/apt/lists/*

# Create non-root node user
RUN groupadd --gid 1000 node \
  && useradd --uid 1000 --gid node --shell /bin/bash --create-home node

FROM base as build
USER node
WORKDIR /home/node/app
COPY --chown=node:node package.json /home/node/app
RUN npm install

# Run everything after as non-privileged user.
FROM base as runtime
WORKDIR /usr/src/app
RUN pip install hs==3.0.0a18
USER node
COPY --chown=node:node --from=build /home/node/app/node_modules node_modules
COPY --chown=node:node . .

ENTRYPOINT [ "bash", "test.sh" ]
