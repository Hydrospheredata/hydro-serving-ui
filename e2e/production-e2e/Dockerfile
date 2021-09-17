# syntax=docker/dockerfile:1
FROM nikolaik/python-nodejs:python3.7-nodejs12-slim as base
LABEL maintainer="support@hydrosphere.io"

                      # 1. Install WebKit dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
                      libwoff1 \
                      libopus0 \
                      libwebp6 \
                      libwebpdemux2 \
                      libenchant-2-2 \
                      libgudev-1.0-0 \
                      libsecret-1-0 \
                      libhyphen0 \
                      libgdk-pixbuf2.0-0 \
                      libegl1 \
                      libnotify4 \
                      libxslt1.1 \
                      libevent-2.1-7 \
                      libgles2 \
                      libvpx6 \
                      # 2. Install Chromium dependencies
                      libnss3 \ 
                      libxss1 \
                      libasound2 \
                      # 3. Install Firefox dependencies
                      libdbus-glib-1-2 \
                      # 4. (Optional) Install XVFB if there's a need to run browsers in headful mode
                      xvfb \
                      # 5. Remove package manager cache
                      && rm -rf /var/lib/apt/lists/*

# 6. Add user so we don't need --no-sandbox in Chromium
# RUN groupadd -r pwuser && useradd -r -g pwuser -G audio,video pwuser \
#     && mkdir -p /home/pwuser/Downloads \
#     && chown -R pwuser:pwuser /home/pwuser


FROM base as build
COPY package.json .
RUN npm install


# Run everything after as non-privileged user.
FROM base as runtime

RUN pip install hs==3.0.0
# Create non-root user
RUN groupadd --gid 1000 hydro \
  && useradd --uid 1000 --gid hydro --shell /bin/bash --create-home hydro
WORKDIR /hydro
USER hydro
COPY --chown=hydro:hydro --from=build node_modules node_modules
COPY --chown=hydro:hydro . .

ENTRYPOINT [ "bash", "test.sh" ]
